import SignUp from '@/app/components/organsms/SignUp/SignUp';
import { Suspense } from 'react';

const SignUpPage = () => {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <div className='w-full '>
        <SignUp />
      </div>
      </Suspense>
    </>
  );
};

export default SignUpPage;
