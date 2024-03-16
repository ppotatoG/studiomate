import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../../state/loadingState';

const Loading = () => {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};

export default Loading;
