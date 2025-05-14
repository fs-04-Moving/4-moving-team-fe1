'use client';

import React, { memo, useState, useEffect } from 'react';
import FullStar from '@/components/atoms/IconFullStar';
import EmptyStar from '@/components/atoms/IconEmptyStar';

type Props = {
  disabled?: boolean;
  initialRating: number;
  starSize?: number;
  setRating?: (ratingValue: number) => void;
};

/**
 * ⭐⭐⭐⭐⭐별점 컴포넌트입니다.
 *
 * @description
 * 유저가 별점을 선택하거나 기존 별점을 표시하는 컴포넌트입니다.
 * 선택된 별점에 따라 꽉찬별(FullStar)과 빈별(EmptyStar) 컴포넌트를 보여줍니다.
 * 별 사이즈를 수정할수 있습니다. starSize={20} 이런식으로로 사용하면 됩니다.(픽셀)
 * 별점을 입력하는 용도로도 사용하고(클릭가능) 받은 데이터를 표시하는 용도(클릭불가)로도 사용 가능합니다.
 *
 * @param {object} props - 컴포넌트 props 받습니다.
 * @param {boolean} [props.disabled=false] - true이면 클릭이 비활성화되고, false이면 클릭이 활성화됩니다.
 * @param {number} [props.initialRating] - 초기 별점 값입니다. 이 값이 기준으로 별이 채워집니다.
 * @param {number} [props.starSize=20] - 별의 크기를 설정합니다. 기본값은 20px 입니다.
 *
 * @example
 * // 클릭 가능한 별점 입력 컴포넌트
 * <ButtonStarRating disabled={false} />
 *
 * // 클릭 불가능한 별점 표시 컴포넌트 (초기 별점 3점)
 * <ButtonStarRating disabled={true} initialRating={3} />
 *
 * // 별 크기를 30px로 설정
 * <ButtonStarRating starSize={30} />
 */

const MemoizedFullStar = memo(FullStar);
const MemoizedEmptyStar = memo(EmptyStar);

function ButtonStarRating({ disabled = false, initialRating, starSize = 20, setRating }: Props) {
  const ArrayIndexes = [1, 2, 3, 4, 5];
  // **⭐ 상태 초기값을 initialRating으로 설정 ⭐**
  const [ratingIndex, setRatingIndex] = useState(Math.round(initialRating));
  // const [ratingIndex, setRatingIndex] = useState(5);

  useEffect(() => {
    if (initialRating !== undefined) {
      setRatingIndex(Math.round(initialRating));
    }
  }, [initialRating]);

  const handleStarClick = (arrayindex: number) => {
    if (!disabled) {
      setRatingIndex(arrayindex);
      if (setRating) setRating(arrayindex); // ✅ 클릭한 값 그대로 넘김
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {ArrayIndexes.map((arrayindex, index) => (
        <div
          key={`rating_${index}`}
          className={`size-[${starSize}px] ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
          onClick={() => handleStarClick(arrayindex)}
        >
          {arrayindex <= ratingIndex ? (
            <MemoizedFullStar width={starSize} />
          ) : (
            <MemoizedEmptyStar width={starSize} />
          )}
        </div>
      ))}
    </div>
  );
}

export default ButtonStarRating;
