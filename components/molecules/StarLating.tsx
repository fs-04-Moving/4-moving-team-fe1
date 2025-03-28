'use client';

import React, { memo, useState } from 'react';
import FullStar from '@/components/atoms/FullStar';
import EmptyStar from '@/components/atoms/EmptyStar';

const MemoizedFullStar = memo(FullStar);
const MemoizedEmptyStar = memo(EmptyStar);

function StarLating() {
  const ArrayIndexes = [1, 2, 3, 4, 5];
  const [ratingIndex, setRatingIndex] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      {ArrayIndexes.map((arrayindex, index) => (
        <div
          key={`rating_${index}`}
          className="size-[20px] cursor-pointer"
          onClick={() => setRatingIndex(arrayindex)}
        >
          {arrayindex <= ratingIndex ? <MemoizedFullStar width={20} /> : <MemoizedEmptyStar width={20} />}
        </div>
      ))}
    </div>
  );
}

export default StarLating;
