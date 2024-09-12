import axios from 'axios';
import { validationResult } from 'express-validator';
import dotenv from 'dotenv';
import sha1 from 'sha1';
import redisClient from '../utils/redis';
import pool from '../utils/db';

dotenv.config();
export default class FormController {
  static async verify(req, res) {
    const { email, mobileNumber } = req.body;
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

    if (emailkey !== rEmailOtp || phoneKey !== rMobileOtp) {
      console.log(`Email OTP: ${emailkey}\nPhone OTP: ${phoneKey}`);
      const emailErrorBool = (emailkey !== rEmailOtp);
      const phoneErrorBool = (phoneKey !== rMobileOtp);
      return res.status(401).json({
        emailError: emailErrorBool ? 'Invalid EmailOTP' : null,
        phoneError: phoneErrorBool ? 'Invalid MobileOTP' : null,
      });
    }

    if ((userEmail === email) && (userPhone === mobileNumber)) {
      const response = await pool.query(`
          INSERT INTO user_profile (email, phone_number) VALUES (
            $1,
            $2
          );
        `, [userEmail, userPhone]);

      console.log(response);
      await redisClient.del(`${email}_EmailOTP`);
      await redisClient.del(`${email}_PhoneOTP`);
      return res.status(200).json({ status: 'Verified' });
    }

    return res.status(401).json({ error: 'Unauthorized' });
  }

  static async userData(req, res) {
    const {
      email, givenName, lastName, dob, country, occupation,
    } = req.body;
    const result = await pool.query('SELECT email FROM user_profile WHERE email = $1;', [email]);

    console.log(result.rows);

    if (result.rows[0].email) {
      const result = await pool.query(`
          UPDATE user_profile
          SET given_name = $1, last_name = $2, date_of_birth = $3, country = $4, occupation = $5
          WHERE email = $6
        `, [givenName, lastName, dob, country, occupation, email]);

      console.log(result);
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
}
