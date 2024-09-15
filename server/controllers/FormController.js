import axios from 'axios';
import { validationResult } from 'express-validator';
import { countries } from 'country-data';
import { DidDht } from '@web5/dids';
import dotenv from 'dotenv';
import sha1 from 'sha1';
import jwt from 'jsonwebtoken';
import redisClient from '../utils/redis';
import pool from '../utils/db';

dotenv.config();
export default class FormController {
  static async verify(req, res) {
    const { email, mobileNumber, code } = req.body;
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      console.log('Errors: ', errors);
      return res.status(401).json({ message: 'Invalid Phone number' });
    }

    const emailResult = await pool.query('SELECT email FROM user_profile WHERE email = $1;', [email]);
    const phoneResult = await pool.query('SELECT phone_number FROM user_profile WHERE phone_number = $1;', [mobileNumber]);

    if (emailResult.rows[0]) {
      return res.status(401).json({ emailError: 'Email Already Registered' });
    }
    if (phoneResult.rows[0]) {
      return res.status(401).json({ phoneError: 'Phone number Already Registered' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const emailOtp = Math.floor(100000 + Math.random() * 900000).toString();

    await redisClient.set(`${email}_PhoneOTP`, otp, 5 * 60);
    await redisClient.set(`${email}_EmailOTP`, emailOtp, 5 * 60);

    await redisClient.set('Email', email, 5 * 60);
    await redisClient.set('PhoneNumber', mobileNumber, 5 * 60);
    await redisClient.set('code', code, 5 * 60);

    const mobileNumberData = {
      meta_data: { first_name: 'SafeStash' },
      channel: 'sms',
      sender: 'Sendchamp',
      token_type: 'numeric',
      token_length: 6,
      expiration_time: 5,
      customer_mobile_number: mobileNumber.slice(1),
      token: otp,
    };

    const emailData = {
      meta_data: { first_name: 'SafeStash' },
      channel: 'email',
      sender: 'Sendchamp',
      token_type: 'numeric',
      token_length: 6,
      expiration_time: 5,
      customer_email_address: email,
      token: emailOtp,
    };

    const header = {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: process.env.OTP_API_KEY,
      },
    };

    try {
      axios.post('https://api.sendchamp.com/api/v1/verification/create', mobileNumberData, header)
        .then(((response) => {
          console.log(response.data);
        }))
        .catch((error) => {
          console.error('Phone Number OTP Request Failed', error);
        });

      axios.post('https://api.sendchamp.com/api/v1/verification/create', emailData, header)
        .then(((response) => {
          console.log(response.data);
        }))
        .catch((error) => {
          console.error('Email OTP Request Failed', error);
        });
    } catch (err) {
      console.error('Email OTP Request Failed', err);
    }

    return res.status(201).send({ message: `Verification for ${email} with Phone Number ${mobileNumber} successful.\n` });
  }

  static async submit(req, res) {
    const {
      email, mobileNumber, rMobileOtp, rEmailOtp,
    } = req.body;
    const emailkey = await redisClient.get(`${email}_EmailOTP`);
    const phoneKey = await redisClient.get(`${email}_PhoneOTP`);

    console.log(`1. Email OTP: ${emailkey}\n1. Phone OTP: ${phoneKey}`);

    const userEmail = await redisClient.get('Email');
    const userPhone = await redisClient.get('PhoneNumber');
    const userCode = await redisClient.get('code');

    if (emailkey !== rEmailOtp || phoneKey !== rMobileOtp) {
      console.log(`Email OTP: ${emailkey}\nPhone OTP: ${phoneKey}`);
      const emailErrorBool = (emailkey !== rEmailOtp);
      const phoneErrorBool = (phoneKey !== rMobileOtp);
      return res.status(401).json({
        emailError: emailErrorBool ? 'Invalid EmailOTP' : null,
        phoneError: phoneErrorBool ? 'Invalid MobileOTP' : null,
      });
    }

    const country = countries.all.filter((country) => country.countryCallingCodes[0] === userCode);
    const didDht = await DidDht.create({ options: { publish: true } });
    console.log(didDht.uri);

    if ((userEmail === email) && (userPhone === mobileNumber)) {
      const response = await pool.query(`
          INSERT INTO user_profile (email, phone_number, country_code) VALUES (
            $1,
            $2,
            $3
          )
          RETURNING user_id;
        `, [userEmail, userPhone, userCode]);

      if (response && didDht) {
        const accRes = await pool.query(`
            INSERT INTO accounts (user_id, currency, user_did)
            VALUES ($1, $2, $3)
            RETURNING account_id;
          `, [response.rows[0].user_id, country[0].currencies[0], didDht.uri]);
        console.log(accRes);
      }

      console.log(response);
      console.log('User ID: ', response.rows[0].user_id);
      await redisClient.del(`${email}_EmailOTP`);
      await redisClient.del(`${email}_PhoneOTP`);
      await redisClient.del('Email');
      await redisClient.del('PhoneNumber');
      await redisClient.del('code');
      return res.status(200).json({ status: 'Verified' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async userData(req, res) {
    const {
      email, givenName, lastName, dob, country, occupation, code,
    } = req.body;
    const userInfo = await pool.query('SELECT user_id, email FROM user_profile WHERE email = $1;', [email]);
    if (!userInfo) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const userAcc = await pool.query('SELECT user_did FROM accounts WHERE user_id = $1;', [userInfo.rows[0].user_id]);
    console.log(userInfo.rows);

    if (userInfo.rows[0].email) {
      await pool.query(`
          UPDATE user_profile
          SET given_name = $1, last_name = $2, date_of_birth = $3, country = $4, occupation = $5
          WHERE email = $6
        `, [givenName, lastName, dob, country, occupation, email]);

      console.log(userAcc.rows[0]);

      try {
        const kccResponse = await axios.get(`https://mock-idv.tbddev.org/kcc?name=${givenName}%20${lastName}&country=%2B${code.slice(1)}&did=${userAcc.rows[0].user_did}`);
        console.log(kccResponse.data);
        await pool.query(`
          UPDATE accounts
          SET user_VC = CASE
            WHEN $1 = ANY(user_VC) THEN user_VC
            ELSE array_append(user_VC, $1)
          END
          WHERE user_id = $2;
        `, [kccResponse.data, userInfo.rows[0].user_id]);
      } catch (err) {
        console.error('Failed  to generate Kcc', err);
      }

      return res.status(201).json({ status: 'Data Created' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async tags(req, res) {
    const {
      email, tags,
    } = req.body;
    const result = await pool.query('SELECT email FROM user_profile WHERE email = $1;', [email]);

    console.log(tags);

    if (result.rows[0].email) {
      const result = await pool.query(`
          UPDATE user_profile
          SET tags = ARRAY(SELECT DISTINCT UNNEST(array_cat(tags, $1)))
          WHERE email = $2
        `, [tags, email]);

      console.log(result);
      return res.status(201).json({ status: 'Data Created' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async register(req, res) {
    const {
      email, password,
    } = req.body;
    const result = await pool.query('SELECT email FROM user_profile WHERE email = $1;', [email]);

    console.log(password);

    if (result.rows[0].email) {
      const result = await pool.query(`
          UPDATE user_profile
          SET password = $1
          WHERE email = $2
        `, [sha1(password), email]);

      console.log(result);
      return res.status(201).json({ status: 'Password Saved' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async login(req, res) {
    const {
      email, password,
    } = req.body;
    const result = await pool.query(`
      SELECT user_id, email, password, last_name, given_name, country_code, tags, phone_number 
      FROM user_profile
      WHERE email = $1;
      `, [email]);

    const userData = {};

    console.log(result.rows);

    if (result.rows[0]) {
      Object.entries(result.rows[0]).forEach(([key, value]) => {
        if (key !== 'password') {
          userData[key] = value;
        }
      });

      const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: '30 days' });

      if (result.rows[0].email === email) {
        if (result.rows[0].password === sha1(password)) {
          return res.status(201).json({ status: 'Login Succesful', token, userData });
        }
        return res.status(401).json({ passwordError: 'Invalid Password' });
      }
    }

    return res.status(401).json({ error: 'Email not registered' });
  }
}
