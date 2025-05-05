import db from '@/db';
import safeRequestHandler from '@/middlewares/safe-request-handler';

export const healthCheckHandler = safeRequestHandler({}, async (req, res) => {
  await db.user.findMany({ take: 1 });
  res.json({ status: 'success' });
});
