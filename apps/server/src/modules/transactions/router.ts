import { Router } from 'express';
import {
  getTransactionsHandler,
  updateTransactionHandler,
  addTransactionHandler,
  deleteTransactionHandler,
} from './handler';
import authRequired from '@/middlewares/authRequired';

const router: Router = Router();
router.use(authRequired);
router.post('/', getTransactionsHandler);
router.put('/:id', updateTransactionHandler);
router.post('/add', addTransactionHandler);
router.delete('/:id', deleteTransactionHandler);

export default router;
