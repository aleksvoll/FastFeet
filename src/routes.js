import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import SessionController from './app/controllers/SessionController';
import auth from './app/middlewares/auth';
import RecipientsController from './app/controllers/RecipientsController';
import DeliveryController from './app/controllers/DeliveryController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/login', SessionController.store);
routes.use(auth);
routes.post('/setRecipients', RecipientsController.store);
routes.put('/updateRecipients', RecipientsController.update);

routes.post('/deliveryMan', DeliveryController.store);
routes.get('/deliveryMan', DeliveryController.index);
routes.get('/deliveryMan/:id', DeliveryController.index);
routes.put('/deliveryMan/:id', DeliveryController.update);
routes.delete('/deliveryMan/:id', DeliveryController.delete);

routes.post('/newOrder', OrderController.store);
routes.get('/getOrder', OrderController.index);
routes.get('/getOrder/:id', OrderController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
