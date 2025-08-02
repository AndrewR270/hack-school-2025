'use client';
import Link from 'next/link';

export default function PollPreview({ title, totalVotes, ownerId, link }) {
  return (
    <Link
      href={link}
      className="w-md flex flex-col p-4 border border-white hover:border-neutral-800 rounded-xl rounded gap-2 bg-orange-300 m-1"
    >
      <div className="flex justify-between">
        <h2 className="font-semibold">{title}</h2>
        <p>{totalVotes} votes</p>
      </div>
      <p className="text-sm text-white-500">{ownerId}</p>
    </Link>
  );
}
