import * as Yup from 'yup';
import Order from '../models/Order';
import Recipients from '../models/Recipients';
import Product from '../models/Product';
import User from '../models/User';
import Delivery from '../models/Delivery';
import File from '../models/File';
import Queue from '../../lib/Queue';
import OrderConfirmationMail from '../jobs/OrderConfirmationMail';

class OrderController {
  async index(req, res) {
    if (req.params.id) {
      const order = await Order.findOne({
        where: { id: req.params.id },
        attributes: [
          'id',
          'canceled_at',
          'start_date',
          'end_date',
          'updated_by',
        ],
        include: [
          {
            model: Recipients,
            as: 'recipient',
            attributes: [
              'name',
              'direction',
              'complement',
              'state',
              'city',
              'zip_code',
            ],
          },
          {
            model: Product,
            as: 'product',
            attributes: ['name', 'description', 'brand'],
            include: [
              {
                model: User,
                as: 'sender',
                attributes: ['name', 'email'],
              },
            ],
          },
          {
            model: Delivery,
            as: 'deliveryMan',
            attributes: ['name', 'email'],
          },
          {
            model: File,
            as: 'signature',
            attributes: ['name', 'path'],
          },
        ],
      });

      return res.json(order);
    }
    const orders = await Order.findAll({
      attributes: ['id', 'canceled_at', 'start_date', 'end_date', 'updated_by'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'name',
            'direction',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'brand'],
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: Delivery,
          as: 'deliveryMan',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path'],
        },
      ],
    });

    return res.json(orders);
  }

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

    const order = await Order.create(req.body);
    const newOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'name',
            'direction',
            'complement',
            'state',
            'city',
            'zip_code',
          ],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['name', 'description', 'brand'],
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['name', 'email'],
            },
          ],
        },
        {
          model: Delivery,
          as: 'deliveryMan',
          attributes: ['name', 'email'],
        },
      ],
    });

    await Queue.add(OrderConfirmationMail.key, { newOrder });

    return res.json(newOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      orderId: Yup.string().required(),
      recipient_id: Yup.string(),
      deliveryman_id: Yup.string(),
      product_id: Yup.string(),
      signature_id: Yup.string(),
      updated_by: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Form validation fails. Please check fields and try again',
      });
    }

    const { id } = req.params ? req.params : req.body;
    const { email } = req.body;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery Man not found.' });
    }

    if (email && email !== delivery.email) {
      const deliveryExists = await Delivery.findOne({ where: { email } });

      if (deliveryExists) {
        return res.status(400).json({ error: 'Email already exists' });
      }
    }

    const { name, avatar_id, updated_by, status } = await delivery.update(
      req.body
    );

    return res.json({
      name,
      email,
      avatar_id,
      updated_by,
      status,
    });
  }
}

export default new OrderController();
