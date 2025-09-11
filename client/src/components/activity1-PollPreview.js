'use client';
import Link from 'next/link';

/* #1a TODO: Add title, totalVotes, and ownerId to the props list*/
export default function PollPreview({ link }) {
  return (
    <Link
      href={link}
      className="w-md flex flex-col p-4 border border-white hover:border-neutral-800 rounded-xl rounded gap-2 bg-orange-300 m-1"
    >
      <div className="flex justify-between">
        {/* #1b TODO: In the line below, add an expression containing the title between the h2 tags*/}
        <h2 className="font-semibold"> </h2>
        {/* #1c TODO: On a new line, add a <p> tag containing the totalVotes to the component*/}
      </div>
      {/* #1d TODO: On a new line, add a <p> tag containing the ownerId to the component*/}
    </Link>
  );
}
