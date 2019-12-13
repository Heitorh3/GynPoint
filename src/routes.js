import { Router } from 'express';

import SessionController from './app/controller/SessionController';
import StudentController from './app/controller/StudentController';
import PlansController from './app/controller/PlansController';
import RegistrationController from './app/controller/RegistrationController';
import CheckingController from './app/controller/CheckingController';

import authMiddleware from './app/middleware/auth';
import HelpOrderController from './app/controller/HelpOrderController';
import AnswerOrderController from './app/controller/AnswerOrderController';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.get('/plans', PlansController.index);

routes.post('/students/:studentID/checkins', CheckingController.store);
routes.get('/students/:studentID/checkins', CheckingController.index);

routes.post('/students/:studentID/help-orders', HelpOrderController.store);
routes.get('/help-orders', HelpOrderController.index);

routes.use(authMiddleware);

routes.post('/help-orders/:helpOderID/answer', AnswerOrderController.store);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put(
    '/registrations/:registrationId/update',
    RegistrationController.update
);
routes.delete(
    '/registrations/:registrationId/delete',
    RegistrationController.delete
);

routes.post('/plans', PlansController.store);
routes.put('/plans/:planId/update', PlansController.update);
routes.delete('/plans/:planId/delete', PlansController.delete);

routes.post('/students', StudentController.store);
routes.put('/students/:studentId/update', StudentController.update);

export default routes;
