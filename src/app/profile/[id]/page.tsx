'use client';
import React from 'react';

export default function ProfileDetails({ params }: any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1> ProfileDetails</h1>
      <h2 className='bg-green-500 p-3 rounded-md'>{params.id}</h2>
    </div>
  );
}
