import { randomUUID } from 'node:crypto';
import Account from '../models/Account.js';
import Detail from '../models/Detail.js';

export class DetailController {
  static async createDetail (req, res) {
    const { date, amount, note, description } = req.body;
    const { id } = req.params;

    // Validate if Account exists
    const existAccount = await Account.findOne({ where: { id }, attributes: ['id'] });

    if (!existAccount) {
      const error = new Error('Account doesn\'t exist');
      res.status(409).json({ msg: error.message });
    }

    const detail = {
      id: randomUUID(),
      date,
      amount,
      note,
      description,
      accountId: existAccount.dataValues.id
    };

    try {
      await Detail.create(detail);

      res.json({ msg: 'Detail created successfully' });
    } catch (error) {
      console.error(error);
    }
  }
}
