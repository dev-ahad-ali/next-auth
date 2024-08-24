'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignUpPage() {
  const router = useRouter();
  const [user, setUsr] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/users/signup`, user);
      console.log('Signup success', response.data);
      router.push('/login');
    } catch (error: any) {
      console.log('signup failed');
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? 'Processing' : 'SignUp'}</h1>
      <hr />
      <label htmlFor='username'>Username</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='text'
        id='username'
        value={user.username}
        onChange={(e) => {
          setUsr({ ...user, username: e.target.value });
        }}
        placeholder='username'
      />
      <label htmlFor='email'>Email</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='email'
        id='email'
        value={user.email}
        onChange={(e) => {
          setUsr({ ...user, email: e.target.value });
        }}
        placeholder='email'
      />
      <label htmlFor='password'>Password</label>
      <input
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='password'
        id='password'
        value={user.password}
        onChange={(e) => {
          setUsr({ ...user, password: e.target.value });
        }}
        placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={onSignUp}
      >
        {buttonDisabled ? 'No SignUp' : 'SignUp'}
      </button>

      <Link href={'/login'}>Visit Login Page</Link>
    </div>
  );
}

export default SignUpPage;
