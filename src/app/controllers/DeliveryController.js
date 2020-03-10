import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import File from '../models/File';

class DeliveryController {
  async index(req, res) {
    if (req.params.id) {
      const deliveryMan = await Delivery.findOne({
        where: { id: req.params.id },
        attributes: ['id', 'name', 'email', 'avatar_id', 'status'],
        include: [
          {
            model: File,
            as: 'avatar',
            attributes: ['name', 'path', 'url'],
          },
        ],
      });

      return res.json(deliveryMan);
    }
    const deliveryMen = await Delivery.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id', 'status'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryMen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string().required(),
      updated_by: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Form validation fails. Please check fields and try again',
      });
    }

    const deliveryExists = await Delivery.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.status(400).json({
        error:
          'Delivery Man mail already exists. Please, check information and try another email.',
      });
    }

    return res.json(await Delivery.create(req.body));
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      avatar_id: Yup.string().required(),
      updated_by: Yup.string().required(),
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

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery Man not found.' });
    }

    if (!delivery.status) {
      return res.status(400).json({
        error: 'Delivery Man is already inactive',
      });
    }

    delivery.status = false;

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliveryController();
