import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.string().required(),
      deliveryman_id: Yup.string().required(),
      product_id: Yup.string().required(),
      updated_by: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Form validation fails. Please check fields and try again',
      });
    }

    const order = Order.create(req.body);

    return res.json(order);
  }
}

export default new OrderController();
