import Image from 'next/image';
import React from 'react';
import filterButton from '@/assets/images/ic-reactive-filter-button.svg';

interface Props {
  onClick: () => void;
}

function ButtonReacitveFilter({ onClick }: Props) {
  return (
    <button type="button" className="lg:hidden cursor-pointer" onClick={onClick}>
      <Image src={filterButton} alt="filter button" width={32} height={32} />
    </button>
  );
}

export default ButtonReacitveFilter;
