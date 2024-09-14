export default class AppController {
  static async home(req, res) {
    return res.status(200).send('Safe Stash Server running.........');
  }
}
