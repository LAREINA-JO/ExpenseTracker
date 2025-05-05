import { CronJob } from 'cron';
import dayjs from 'dayjs';
import axios, { AxiosError } from 'axios';
import utc from 'dayjs/plugin/utc';
import logger from './utils/logger';
import config from './config';

async function callHealthCheck() {
  try {
    await axios
      .get(`https://${config.SERVER.HOST}/api/v1/health-check`)
      .then((res) => {
        logger.info(
          `calling health check at ${dayjs().local().format()} with res data: ${JSON.stringify(res.data)}`,
        );
      });
  } catch (error) {
    const axiosError = error as AxiosError;
    logger.error(axiosError.response?.data);
  }
}

async function awake() {
  dayjs.extend(utc);
  logger.info(`start running awake script at ${dayjs().local().format()}`);
  const job = new CronJob('* * * * *', callHealthCheck);
  job.start();
}

awake();
