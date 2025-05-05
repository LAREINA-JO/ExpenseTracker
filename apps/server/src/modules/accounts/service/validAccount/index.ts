import db from '@/db';
import { AccountInput, AccountInputError } from '@expense-tracker/schemas';
import Result, { ResultPromiseType } from '@/utils/common/result';
import ServiceError from '@/error/service/ServiceError';
import AccountServiceError from '../error/AccountServiceError';

export const validAccountInputConflict = async (
  { name, cardNumber }: Partial<AccountInput>,
  id?: number,
): ResultPromiseType<{}, ServiceError<AccountInputError>> => {
  const otherAccount = await db.account.findFirst({
    where: {
      id: { not: id },
      OR: [{ name }, { cardNumber }],
    },
  });

  if (!otherAccount) {
    return Result.success({});
  }

  if (otherAccount.name === name) {
    return Result.error(
      new AccountServiceError('ACCOUNT_NAME_ALREADY_EXISTS', {
        name: 'you already have another same account name',
      }),
    );
  }

  if (otherAccount.cardNumber === cardNumber) {
    return Result.error(
      new AccountServiceError('CARD_NUMBER_ALREADY_EXISTS', {
        cardNumber:
          'you already have another account name with same card number',
      }),
    );
  }

  return Result.error(new AccountServiceError('ACCOUNT_ALREADY_EXIST'));
};
