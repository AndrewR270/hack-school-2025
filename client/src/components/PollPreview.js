'use client';
import Link from 'next/link';

export default function PollPreview({ title, totalVotes, ownerId, link }) {
  return (
    <Link
      href={link}
      className='w-md flex flex-col p-4 border border-neutral-800 hover:border-white rounded-xl rounded gap-2 bg-neutral-800 m-1'
    >
      <div className='flex justify-between'>
        <h2 className='font-semibold'>{title}</h2>
        <p>{totalVotes} votes</p>
      </div>
      <p className='text-sm text-white-500'>{ownerId}</p>
    </Link>
  );
}
