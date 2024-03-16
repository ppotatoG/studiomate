import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

import { loadingState } from '../../state/loadingState';

const Loading = () => {
  const isLoading = useRecoilValue(loadingState);

  if (!isLoading) return null;

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 bg-black bg-opacity-20 flex justify-center items-center z-20">
      <FaSpinner className="animate-spin text-4xl text-blue-500" />
    </div>
  );
};

export default Loading;
