'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [options, setOptions] = useState([]);

  const handleSubmit = async (e) => {
    await e.preventDefault();

    const res = await fetch('https://localhost:3001/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        ownerId: owner,
        options: options,
      }),
    });

    if (!title || !description || !owner || !options) {
      alert('Some fields missing.');
      return;
    }
    alert('Poll created!');
  };

  return (
    <div className='flex flex-col items-center mt-20 text-center'>
      <Link className='text-3xl font-bold' href='/'>
        ACM POLLS
      </Link>
    </div>
  );
}
