import { randomUUID } from 'node:crypto';
import { validateUser } from '../schemas/user.js';
import User from '../models/User.js';
import generateJWT from '../helpers/generateJWT.js';
import generateId from '../helpers/generateId.js';
import hashPasswordFn from '../helpers/hashPassword.js';
import { emaiRegister, emailForgetPassword } from '../helpers/email.js';

export class UserController {
  static async register (req, res) {
    // avoid duplciated users
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ where: { email } });

    if (existUser) {
      const error = new Error('User already register');
      return res.status(404).json({ msg: error.message });
    }

    // Hash password
    const hashPassword = await hashPasswordFn(password);

    // User Object
    const user = {
      id: randomUUID(),
      name,
      email,
      password: hashPassword,
      token: generateId(),
      active: false
    };

    // Validate inputs
    const result = validateUser(user);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      // Create the user into de Database
      await User.create(user);

      // Send Email
      emaiRegister({
        email: user.email,
        name: user.name,
        token: user.token
      });

      res.json({ msg: 'User create successfully, please check you email in order to confirm you account' });
    } catch (error) {
      console.log(error);
    }
  }

  static async auth (req, res) {
    const { email, password } = req.body;

    // Check if user Exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error('User doen\'t exists');
      return res.status(404).json({ msg: error.message });
    }

    // Check if the user it's confirm
    if (!user.active) {
      const error = new Error('Your Account has not been confirm');
      return res.status(403).json({ msg: error.message });
    }

    // Check password
    if (user.PasswordValidate(password)) {
      res.json({
        id: user.id,
        email: user.email,
        tokenPassword: generateJWT(user.id)
      });
    } else {
      const error = new Error('The password is incorrect');
      return res.status(403).json({ msg: error.message });
    }
  }

  static confirm = async (req, res) => {
    const { token } = req.params;

    // search user by Token
    const user = await User.findOne({ where: { token } });

    if (!user) {
      const error = new Error('Token not Valid');
      return res.status(403).json({ msg: error.message });
    }

    try {
      user.active = true;
      user.token = '';
      await user.save();
      res.json({ msg: 'User confirm sucessfully' });
    } catch (error) {
      console.error(error);
    }
  };

  static forgetPassword = async (req, res) => {
    const { email } = req.body;

    // search user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      const error = new Error('User doesn\'t exist');
      return res.status(404).json({ msg: error.message });
    }

    // res.json({ user });
    try {
      user.token = generateId();
      await user.save();

      // Send email
      emailForgetPassword({
        email: user.email,
        name: user.name,
        token: user.token
      });
      res.json({ msg: 'we send you an email with the instruction to reestablish your password' });
    } catch (error) {
      console.error(error);
    }
  };

  static checkToken = async (req, res) => {
    const { token } = res.body;

    // search user by token
    const validToken = await User.findOne({ token });

    if (validToken) {
      res.json({ msg: 'valid Token and User exist in the System' });
    } else {
      const error = new Error('Token not valid');
      return res.status(404).json({ msg: error.message });
    }
  };

  static newPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ token });
    const hashPassword = await hashPasswordFn(password);

    if (user) {
      user.password = hashPassword;
      user.token = '';

      try {
        await user.save();
        res.json({ msg: 'Password update successfully' });
      } catch (error) {
        console.error(error);
      }
    } else {
      const error = new Error('Token not valid');
      return res.status(404).json({ msg: error.message });
    }
  };
}
