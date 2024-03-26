import { randomUUID } from 'node:crypto';
import { validateAccount, validatePartialAccount } from '../schemas/account.js';
import Account from '../models/Account.js';
import Detail from '../models/Detail.js';

export class AccountController {
  static async getAllAccounts (req, res) {
    try {
      const accounts = await Account.findAll({
        include: Detail
      });

      res.json(accounts);
    } catch (error) {
      console.error(error);
    }
  }

  static async getAccountsbyId (req, res) {
    const { id } = req.params;

    try {
      const account = await Account.findOne({ where: { id } });

      res.json(account);
    } catch (error) {
      console.error(error);
    }
  }

  static async createAccount (req, res) {
    const { name, initialMoney, currency, description } = req.body;

    // Validate if Account exists
    const existAccount = await Account.findOne({ where: { name } });

    if (existAccount) {
      const error = new Error('Account already exists');
      return res.status(409).json({ msg: error.message });
    }

    // Account Object
    const account = {
      id: randomUUID(),
      name,
      initialMoney,
      currency,
      balance: initialMoney,
      description
    };

    // Validate inputs
    const result = validateAccount(account);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      await Account.create(account);

      res.json({ msg: 'Account created successfully' });
    } catch (error) {
      console.error(error);
    }
  }

  static async editAccount (req, res) {
    const { id } = req.params;
    const { name, initialMoney, currency, description } = req.body;

    // Validate if Account exists
    const account = await Account.findOne({ where: { id } });

    if (!account) {
      const error = new Error('Account not found');
      return res.status(404).json({ msg: error.message });
    }

    // Account Object
    const updatedAccount = {
      name,
      initialMoney,
      currency,
      description
    };

    // Validate inputs
    const result = validatePartialAccount(updatedAccount);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      await Account.update(updatedAccount, { where: { id } });

      res.json({ msg: 'Account updated successfully' });
    } catch (error) {
      console.error(error);
    }
  }

  static async deleteAccount (req, res) {
    const { id } = req.params;

    // Validate if Account exists
    const account = await Account.findOne({ where: { id } });

    if (!account) {
      const error = new Error('Account not found');
      return res.status(404).json({ msg: error.message });
    }

    // Validate if Account has details
    const details = await Detail.findAll({ where: { accountId: id } });

    if (details.length > 0) {
      const error = new Error('Account has details');
      return res.status(409).json({ msg: error.message });
    }

    try {
      await Account.destroy({ where: { id } });

      res.json({ msg: 'Account has been delete it' });
    } catch (error) {
      console.error(error);
    }
  }
}
