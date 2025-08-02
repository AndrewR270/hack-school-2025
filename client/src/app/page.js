'use client';
import { useEffect, useState } from 'react';
import PollPreview from '@/components/PollPreview';
import Link from 'next/link';

export default function Home() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function getPolls() {
      const res = await fetch(`http://localhost:3001/api/polls/`);
      const data = await res.json();
      setPolls(data);
    }

    getPolls();
  }, []);

  if (!polls) return <h1 className='text-center'>Loading...</h1>;

  return (
    <div className='flex flex-col items-center mt-20'>
      <h1 className='mb-5 font-bold text-3xl'>ACM POLLS</h1>
      {polls.map((poll) => {
        console.log(poll);
        return (
          <PollPreview
            key={poll._id}
            title={poll.title}
            totalVotes={poll.totalVotes || 0}
            ownerId={poll.ownerId}
            link={'/poll/' + poll._id}
          ></PollPreview>
        );
      })}
      <Link
        className='mt-10 text-center p-4 border border-neutral-800 rounded rounded-xl gap-2 bg-neutral-800 hover:border-white'
        href='/create'
      >
        Create Poll
      </Link>
    </div>
  );
}
