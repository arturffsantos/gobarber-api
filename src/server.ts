/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';
import uploadConfig from './config/upload';

const app = express();
const PORT = 3333;

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀️ Running server on port ${PORT}`);
});
