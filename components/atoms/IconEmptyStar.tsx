import React from 'react'
import Image from 'next/image';
import IcEmptyStar from '@/assets/images/ic-star-gray.svg';

function EmptyStar({ width }: { width: number }) {
  return (
    <div><Image src={IcEmptyStar} alt='빈별' width={width}/> </div>
  )
}

export default EmptyStar