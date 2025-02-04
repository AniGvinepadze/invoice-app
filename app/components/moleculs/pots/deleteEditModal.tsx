import {
  FiEdit,
  FiChevronDown,
  FiTrash,
  FiShare,
  FiPlusSquare,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useState } from 'react';
import { IconType } from 'react-icons';
import Image from 'next/image';
import iconElipsed from '@/public/assets/icon-ellipsis.svg';

interface IDelete {
  handleValue: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DeleteEditModal: React.FC<IDelete> = ({ handleValue }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className=' flex items-center justify-center bg-white'>
      <motion.div animate={open ? 'open' : 'closed'} className='relative'>
        <button
          onClick={() => setOpen((pv) => !pv)}
          title='menu'
          className='flex items-center cursor-pointer gap-2 px-3 py-2 rounded-md text-indigo-50   transition-colors'
        >
          <motion.span variants={iconVariants}>
            <Image src={iconElipsed} alt='setting' />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: 'top', translateX: '-50%' }}
          className='flex flex-col gap-2 z-50 rounded-lg bg-white shadow-xl absolute top-[100%]   overflow-hidden'
        >
          <Option
            setOpen={setOpen}
            Icon={FiEdit}
            text='Edit Pot'
            handleValue={handleValue}
          />
          <Option
            setOpen={setOpen}
            Icon={FiTrash}
            text='Delete Pot'
            handleValue={handleValue}
          />
        </motion.ul>
      </motion.div>
    </div>
  );
};

const Option = ({
  text,
  Icon,
  setOpen,
  handleValue,
}: {
  text: string;
  Icon: IconType;
  setOpen: Dispatch<SetStateAction<boolean>>;
  handleValue: Dispatch<SetStateAction<string | undefined>>;
}) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        handleValue(text);
      }}
      className={`flex items-center gap-2 w-full px-[20px] py-[12px] text-sm font-medium whitespace-nowrap rounded-md hover:bg-indigo-100  transition-colors cursor-pointer  ${
        text.startsWith('Delete') ? 'text-[#c94736] ' : 'text-[#201f24]'
      }`}
    >
      <span>{text}</span>
    </motion.li>
  );
};

export default DeleteEditModal;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: 'beforeChildren',
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: 'afterChildren',
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
