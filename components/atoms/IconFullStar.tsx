import React from 'react'
import IcFullStar from '@/assets/images/ic-fullStar.svg';
import Image from 'next/image';

function FullStar({ width }: { width: number }) {
  return (
    <div>
      <Image src={IcFullStar} alt="찬별" width={width} />
      </div>
  )
}

export default FullStar