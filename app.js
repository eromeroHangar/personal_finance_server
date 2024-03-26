import express, { json } from 'express';
import { sequelize } from './database/db.js';
import { usersRouter } from './routes/users.js';
import { accountsRouter } from './routes/accounts.js';
import { detailsRouter } from './routes/details.js';
import { corsMiddleware } from './middlewares/cors.js';
import 'dotenv/config.js';

// Call the server
const app = express();
app.use(json());
app.use(corsMiddleware());
app.disable('x-powered-by');

// Database
sequelize.sync().then(() => { console.log('Connection has been established successfully.'); }).catch(error => { console.error('Unable to connect to the database:', error); });

// Routes
app.use('/api/users', usersRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/details', detailsRouter);

// Assign Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
