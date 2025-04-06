'use client';

import React, { memo, useState, useEffect } from 'react';
import FullStar from '@/components/atoms/FullStar';
import EmptyStar from '@/components/atoms/EmptyStar';

/**
 * ⭐⭐⭐⭐⭐별점 컴포넌트입니다.
 *
 * @description
 * 유저가 별점을 선택하거나 기존 별점을 표시하는 컴포넌트입니다.
 * 선택된 별점에 따라 꽉찬별(FullStar)과 빈별(EmptyStar) 컴포넌트를 보여줍니다.
 * 별 사이즈를 수정할수 있습니다. width={} 이렇게 사용하면 됩니다. 
 * 별점을 입력하는 용도로도 사용하고(클릭가능) 받은 데이터를 표시하는 용도(클릭불가)로도 사용 가능합니다. 
 *
 * @param {object} props - 컴포넌트 props 받습니다.
 * @param {boolean} [props.disabled=false] - true이면 클릭이 비활성화되고, false이면 클릭이 활성화됩니다.
 * @param {number} [props.initialRating] - 초기 별점 값입니다. 이 값이 기준으로 별이 채워집니다.
 *
 * @example
 * // 클릭 가능한 별점 입력 컴포넌트
 * <StarLating disabled={false} />
 *
 * // 클릭 불가능한 별점 표시 컴포넌트 (초기 별점 3점)
 * <StarLating disabled={true} initialRating={3} />
 */


const MemoizedFullStar = memo(FullStar);
const MemoizedEmptyStar = memo(EmptyStar);

function StarLating({ disabled = false, initialRating }) {
  const ArrayIndexes = [1, 2, 3, 4, 5];
  const [ratingIndex, setRatingIndex] = useState(5);

  useEffect(() => {
    if (initialRating !== undefined) {
      setRatingIndex(Math.round(initialRating));
    }
  }, [initialRating]); 

  const handleClick = (arrayindex) => {
    if (!disabled) {
      setRatingIndex(arrayindex);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {ArrayIndexes.map((arrayindex, index) => (
        <div
          key={`rating_${index}`}
          className={`size-[20px] ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
          onClick={() => handleClick(arrayindex)}
        >
          {arrayindex <= ratingIndex ? <MemoizedFullStar width={20} /> : <MemoizedEmptyStar width={20} />}
        </div>
      ))}
    </div>
  );
}

export default StarLating;