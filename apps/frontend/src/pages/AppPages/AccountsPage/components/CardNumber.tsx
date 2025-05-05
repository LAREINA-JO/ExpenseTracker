import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IconButton } from 'coderui';
import { IoEye, IoEyeOff } from 'react-icons/io5';

type CardNumberProps = JSX.IntrinsicElements['div'] & {
  originalNumber: string;
};

const CardNumber = ({ className, originalNumber }: CardNumberProps) => {
  const safeCardNumber = originalNumber.replace(/\d(?=\d{4})/g, '•');
  const [showSafeCardNumber, setShowSafeCardNumber] = useState(true);

  const toggleShowSafeCardNumber = () => {
    setShowSafeCardNumber(!showSafeCardNumber);
  };

  return (
    <div className={twMerge(clsx('flex'), className)}>
      <span className="w-48">
        {showSafeCardNumber ? safeCardNumber : originalNumber}
      </span>
      <IconButton className="text-gray-500" onClick={toggleShowSafeCardNumber}>
        {showSafeCardNumber ? <IoEye /> : <IoEyeOff />}
      </IconButton>
    </div>
  );
};

export default CardNumber;
