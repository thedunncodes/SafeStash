import { Router } from 'express';
import { body } from 'express-validator';
import AppController from '../controllers/AppController';
import FormController from '../controllers/FormController';

const router = Router();

router.get('/', AppController.home);

router.post('/verify', body('mobileNumber').isMobilePhone('any', { strictMode: true }), FormController.verify);

router.post('/submit', FormController.submit);

router.post('/userProfile', FormController.userData);

router.post('/tags', FormController.tags);

router.post('/register', FormController.register);

router.post('/login', FormController.login);

module.exports = router;
