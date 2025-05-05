import { Router } from 'express';
import {
  getCategoriesHandler,
  updateCategoryHandler,
  addCategoryHandler,
  deleteCategoryHandler,
} from './handler';
import authRequired from '@/middlewares/authRequired';

const router: Router = Router();
router.use(authRequired);
router.post('/', getCategoriesHandler);
router.put('/:id', updateCategoryHandler);
router.post('/add', addCategoryHandler);
router.delete('/:id', deleteCategoryHandler);

export default router;
