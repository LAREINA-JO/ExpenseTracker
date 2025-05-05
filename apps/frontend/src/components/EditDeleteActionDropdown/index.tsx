import { clsx } from 'clsx';
import { Button, Dropdown, IconButton } from 'coderui';
import { twMerge } from 'tailwind-merge';
import { HiDotsHorizontal } from 'react-icons/hi';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';

type EditDeleteActionDropdownProps = JSX.IntrinsicElements['div'] & {
  onEdit: () => void;
  onDelete: () => void;
};

const EditDeleteActionDropdown = ({
  className,
  onEdit,
  onDelete,
}: EditDeleteActionDropdownProps) => {
  return (
    <Dropdown className={twMerge(clsx(className))}>
      <Dropdown.Trigger>
        <IconButton>
          <HiDotsHorizontal />
        </IconButton>
      </Dropdown.Trigger>
      <Dropdown.Menu className="">
        <Dropdown.MenuItem>
          <Button
            headless
            className="flex w-full items-center text-left"
            onClick={onEdit}
          >
            <FaRegEdit />
            <span className="ml-2">Edit</span>
          </Button>
        </Dropdown.MenuItem>
        <Dropdown.MenuItem>
          <Button
            headless
            className="flex w-full items-center text-left"
            onClick={onDelete}
          >
            <AiOutlineDelete />
            <span className="ml-2">Delete</span>
          </Button>
        </Dropdown.MenuItem>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default EditDeleteActionDropdown;
