'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [owner, setOwner] = useState('');
  const [options, setOptions] = useState(['']);

  const router = useRouter();

  const handleSubmit = async (e) => {
    await e.preventDefault();

    if (!title || !description || !owner || !options) {
      alert('Some fields missing.');
      return;
    }

    const formattedOptions = options.map((opt) => ({
      option: opt.trim(),
      count: 0,
    }));

    const res = await fetch('http://localhost:3001/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        description: description,
        ownerId: owner,
        options: formattedOptions,
      }),
    });
    alert('Poll created!');
    router.push('/');
  };

  return (
    <div className='flex flex-col items-center mt-20 text-center'>
      <Link className='text-3xl font-bold mb-10' href='/'>
        ACM POLLS
      </Link>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <label>
          Title:
          <input
            className='ml-2 bg-white text-black'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            className='ml-2 bg-white text-black'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Owner:
          <input
            className='ml-2 bg-white text-black'
            type='text'
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>

        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className='flex gap-2 items-center'>
            <input
              className='bg-white text-black flex-1'
              type='text'
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
            {options.length > 1 && (
              <button
                type='button'
                className='text-red-600'
                onClick={() => {
                  const newOptions = options.filter((_, i) => i !== index);
                  setOptions(newOptions);
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type='button'
          className='bg-black text-sm py-1 px-2 rounded'
          onClick={() => setOptions([...options, ''])}
        >
          + Add Option
        </button>

        <button
          type='submit'
          className='bg-blue-600 text-white rounded py-2 px-4'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
