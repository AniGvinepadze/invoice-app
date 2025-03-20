'use client';
import HomePage from '@/app/components/organsms/HomePage/HomePage';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState();
  const router = useRouter();
  
  const token = getCookie('accessToken');
  const getCurrentUser = async (token: string) => {
    try {
      const response = await axios.get(
        'https://invoiceappback.onrender.com/auth/current-user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("shemovuda")
      setUser(response.data);
    } catch (err) {
      router.push('/login');
    }
  };
  useEffect(() => {
    getCurrentUser(token as string);
  }, []);


  if (!user) return null;
  return (
    <div className='max-w-[1440px] w-full'>
      <HomePage />
    </div>
  );
}
