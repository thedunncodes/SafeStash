import { validationResult } from 'express-validator';
import pool from '../utils/db';

export default class FormController {
  static async verify(req, res) {
    const { email, mobileNumber } = req.body;
    const errors = validationResult(req).array();
    if (errors.length > 0) {
      // Once Termii api is running implement otp verification
      console.log('Errors: ', errors);
      return res.status(401).json({ message: 'Invalid Phone number' });
    }

    const result = await pool.query("SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'");
    console.log(result.rows);

    return res.status(201).send({ message: `Verification for ${email} with Phone Number ${mobileNumber} successful.` });
  }
}
