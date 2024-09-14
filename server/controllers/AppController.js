import pool from '../utils/db';

export default class AppController {
  static async home(req, res) {
    const data = await pool.query('SELECT NOW() as now');
    return res.json(data);
  }
}
