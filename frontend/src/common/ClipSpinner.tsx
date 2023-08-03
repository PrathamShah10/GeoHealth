import React, { memo } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
const ClipSpinner = (props: RingSpinnerProps) => {
  const { isLoading, color = '#FFFFFF', size = 30 } = props;
  return (
    <>
      {isLoading && (
        <div className=" flex justify-center mx-1">
          <ClipLoader color={color} loading={isLoading} size={size} />
        </div>
      )}
    </>
  );
};

export default memo(ClipSpinner);
type RingSpinnerProps = {
  isLoading: boolean;
  color?: string;
  size?: number;
};
