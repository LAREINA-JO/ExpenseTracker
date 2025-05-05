import path from 'path';
import dotenv from 'dotenv';

const loadEnv = () => {
  // load this first!
  dotenv.config({
    path: path.join(
      __dirname,
      `../../env/.env.${process.env.NODE_ENV ?? 'development'}`,
    ),
  });
};

export default loadEnv;
