import { Router } from 'express';
import client from '../utils/db';

const router = Router();

router.get('/', async (req, res) => {
  const data = await client.query('SELECT NOW() as now');
  return res.json(data);
});

module.exports = router;
