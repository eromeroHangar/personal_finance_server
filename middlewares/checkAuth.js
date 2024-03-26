import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const checkAuth = async (req, res, next) => {
  let token;
  console.log(req.headers);
};

export default checkAuth;
