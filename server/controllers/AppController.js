import client from '../utils/db';

export default class AppController {
  static async home(req, res) {
    const data = await client.query('SELECT NOW() as now');
    return res.json(data);
  }
}
