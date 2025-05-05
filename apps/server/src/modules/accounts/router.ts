import { Router } from 'express';
import {
  getAccountsHandler,
  updateAccountHandler,
  addAccountHandler,
  deleteAccountHandler,
} from './handler';
import authRequired from '@/middlewares/authRequired';

const router: Router = Router();
router.use(authRequired);
router.post('/', getAccountsHandler);
router.put('/:id', updateAccountHandler);
router.post('/add', addAccountHandler);
router.delete('/:id', deleteAccountHandler);

export default router;
