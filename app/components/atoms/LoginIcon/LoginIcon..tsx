import Image from 'next/image';
import { loginImg } from '../../../index';

export default function LogingIcon() {
  return (
    <div className='max-w-[600px]  overflow-y-hidden w-full hidden lg:inline-block'>
      <Image src={loginImg} alt='LogingImg' width={800} height={960} />
    </div>
  );
}
