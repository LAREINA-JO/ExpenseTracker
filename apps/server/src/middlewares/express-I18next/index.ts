import type { RequestHandler } from 'express';
import type { i18n } from 'i18next';
import safeRequestHandler from '../safe-request-handler';

type ExpressI18next = (i18next: i18n, fallbackLng: string) => RequestHandler;

const expressI18next: ExpressI18next = (
  i18next,
  fallbackLng,
  reqHeaderName = 'Accept-Language',
) =>
  safeRequestHandler({}, async (req, res, next) => {
    const acceptLanguage = req.get(reqHeaderName);
    const lng = acceptLanguage?.split(';')[0].split(',')[0] ?? fallbackLng;
    if (i18next.language !== lng) {
      await i18next.changeLanguage(lng);
    }

    await next();
  });
export default expressI18next;
