'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const [data, setData] = useState(null);

  const getUserDetails = async () => {
    const res = await axios.post('/api/users/me');
    setData(res.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Log out success');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile</h1>
      <hr />
      <h2>{data === null ? 'Nothing' : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
      <hr />
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={getUserDetails}
      >
        Get User Details
      </button>
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}
