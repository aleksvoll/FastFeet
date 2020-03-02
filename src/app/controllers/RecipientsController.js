import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      direction: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
      updated_by: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Form validation fails. Please check fields and try again',
      });
    }

    return res.json(await Recipients.create(req.body));
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
      name: Yup.string(),
      direction: Yup.string(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      zip_code: Yup.string(),
      updated_by: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Form validation fails. Please check fields and try again',
      });
    }

    const { id } = req.body;

    const recipient = await Recipients.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found.' });
    }

    const {
      name,
      direction,
      complement,
      state,
      city,
      zip_code,
      updated_by,
    } = await recipient.update(req.body);

    return res.json({
      name,
      direction,
      complement,
      state,
      city,
      zip_code,
      updated_by,
    });
  }
}

export default new RecipientsController();
