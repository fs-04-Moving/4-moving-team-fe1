'use client';
import MovingTypeDisplay from '@/components/molecules/MovingTypeDisplay';
import MovingTypeSelector from '@/components/molecules/MovingTypeSelector';
import { ServiceType } from '@/types/move.type';
import { useState } from 'react';

function Page() {
  const [selectedTypes, setSelectedTypes] = useState<ServiceType['type'][]>([]);

  const handleTypeSelect = (types: ServiceType['type'][]) => {
    setSelectedTypes(types);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-8">
        이사 유형 선택 컴포넌트 테스트
      </h1>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          이사 유형 선택 (다중 선택 가능)
        </h2>
        <div className="p-4">
          <MovingTypeSelector
            onTypeSelect={handleTypeSelect}
            selectedTypes={selectedTypes}
          />
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">
          이사 유형 표시: 선택된 이사 유형 Chip으로 표시
        </h2>
        <div className="p-4 ">
          {selectedTypes.length > 0 ? (
            <MovingTypeDisplay types={selectedTypes} />
          ) : (
            <p className="text-gray-400">가능 서비스가 아직 없어요!</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Page;
