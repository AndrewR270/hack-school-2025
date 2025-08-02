'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PollPage() {
  const [poll, setPoll] = useState(null);

  const { slug } = useParams();

  const [selectedOption, setSelectedOption] = useState('');
  const [voted, setVoted] = useState(false);

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (!selectedOption) {
      alert('Please select an option.');
      return;
    }
    const res = await fetch('http://localhost:3001/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pollId: slug,
        optionId: selectedOption,
      }),
    });
    alert(`Vote cast!`);
    console.log(`Vote cast for ${slug} on option ${selectedOption}`);

    const data = await res.json();
    setVoted(true);
    setPoll(data);
  };

  useEffect(() => {
    async function getPoll() {
      const res = await fetch(`http://localhost:3001/api/polls/id/${slug}`);
      const data = await res.json();
      setPoll(data);
    }
    getPoll();
  }, []);

  if (!poll) return <h1 className='text-center'>Loading...</h1>;

  return (
    <div className='flex flex-col items-center mt-20 text-center'>
      <Link className='text-3xl font-bold' href='/'>
        ACM POLLS
      </Link>
      <h1 className='center font-semi-bold text-2xl mt-5 mb-5'>{poll.title}</h1>
      <p className='text-center'>{poll.totalVotes || 0} total votes</p>
      <p className='text-center text-sm mb-5'>Poll created by {poll.ownerId}</p>
      <p className='text-center text-lg mb-10'>{poll.description}</p>
      <form onSubmit={handleSubmit} className='w-md text-left'>
        {poll.options.map((option) => {
          return (
            <div className='flex flex-row justify-between' key={option._id}>
              <div>
                <input
                  type='radio'
                  id={option._id}
                  name='poll'
                  value={option._id}
                  checked={selectedOption === option._id}
                  onChange={() => setSelectedOption(option._id)}
                />
                <label className='ml-2' htmlFor={option.option}>
                  {option.option}
                </label>
              </div>
              {voted ? (
                <p className='text-right'>{option.count || 0} votes</p>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className='mt-5 mb-5 flex justify-center'>
          <button
            type='submit'
            onSubmit={handleSubmit}
            className='pl-2 pr-2 border border-neutral-800 rounded gap-2 bg-neutral-800 hover:border-white'
          >
            Vote
          </button>
        </div>
      </form>
    </div>
  );
}
