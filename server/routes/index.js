import { Router } from 'express';
import { body } from 'express-validator';
import AppController from '../controllers/AppController';
import FormController from '../controllers/FormController';

const router = Router();

router.get('/', AppController.home);

router.post('/verify', body('mobileNumber').isMobilePhone('any', { strictMode: true }), FormController.verify);

module.exports = router;
