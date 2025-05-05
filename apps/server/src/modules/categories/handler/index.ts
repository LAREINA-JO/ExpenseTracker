import safeRequestHandler from '@/middlewares/safe-request-handler';
import {
  getCategoriesReqBodySchema,
  getCategoriesResBodySchema,
  updateCategoriesReqBodySchema,
  addCategoryReqBodySchema,
  categorySchema,
} from '@expense-tracker/schemas';
import { findCategories } from '../service/findCategories';
import z from 'zod';
import { updateCategoryById } from '../service/updateCategory';
import { addCategory } from '../service/addCategory';
import { deleteCategoryById } from '../service/deleteCategory';

export const getCategoriesHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: getCategoriesReqBodySchema,
      },
      res: {
        body: getCategoriesResBodySchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const query = req.body;
    const categories = await findCategories(user, query);
    res.json(categories);
  },
);

export const updateCategoryHandler = safeRequestHandler(
  {
    schema: {
      req: {
        params: z.object({
          id: z.string().regex(/\d+/),
        }),
        body: updateCategoriesReqBodySchema,
      },
    },
  },
  async (req, res) => {
    const id = +req.params.id;
    const user = req.user!;

    const { data, error, isError } = await updateCategoryById(
      id,
      user,
      req.body,
    );
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const addCategoryHandler = safeRequestHandler(
  {
    schema: {
      req: {
        body: addCategoryReqBodySchema,
      },
      res: {
        body: categorySchema,
      },
    },
  },
  async (req, res) => {
    const user = req.user!;
    const { data, error, isError } = await addCategory(user, req.body);
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);

export const deleteCategoryHandler = safeRequestHandler(
  {
    schema: {
      req: {
        params: z.object({
          id: z.string().regex(/\d+/),
        }),
      },
    },
  },
  async (req, res) => {
    const id = +req.params.id;
    const user = req.user!;

    const { data, error, isError } = await deleteCategoryById(id, user);
    if (isError) {
      throw error;
    }
    res.json(data);
  },
);
