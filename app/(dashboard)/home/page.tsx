'use client';
import HomePage from '@/app/components/organsms/HomePage/HomePage';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [user, setUser] = useState();
  const router = useRouter();

  const getCurrentUser = async (token: string) => {
    try {
      const response = await axios.get(
        'http://localhost:3001/auth/current-user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      router.push('/login');
    }
  };

  useEffect(() => {
    const token = getCookie('accessToken');
    getCurrentUser(token as string);
  }, []);

  if (!user) return null;
  return (
    <div className='max-w-[1440px] w-full'>
      <HomePage />
    </div>
  );
}
