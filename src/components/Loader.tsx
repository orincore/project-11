import React from 'react';

const Loader: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <div className="flex items-center justify-center w-full h-full">
    <svg
      className="animate-spin"
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="opacity-20"
        cx="25"
        cy="25"
        r="20"
        stroke="currentColor"
        strokeWidth="6"
      />
      <path
        className="text-purple-600 dark:text-purple-400"
        d="M45 25c0-11.046-8.954-20-20-20"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  </div>
);

export default Loader; 