import { Router } from 'express';
import { healthCheckHandler } from './handler';

const router: Router = Router();
router.get('/', healthCheckHandler);

export default router;
