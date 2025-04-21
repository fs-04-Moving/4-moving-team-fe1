import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import { Worker } from '@/types/dtos/Worker.dto';
import Link from 'next/link';

type Props = {
  workers: Worker[];
  isLoading: boolean;
};

function WorkerCardList({ workers, isLoading }: Props) {
  if (isLoading) return <div>로딩 중...</div>; // todo: 스켈레톤 구현해보기

  if (!workers.length) return '검색 결과가 없어요'; //<EmptyResult />

  return (
    <div className="flex flex-col gap-12">
      {workers.map((worker) =>
        // todo : summary 백엔드 수정수 수정?
        worker ? (
          <Link key={worker.workerId} href={`/worker/${worker.workerId}`}>
            <WorkerCardInSearch key={worker.workerId} {...worker} />
          </Link>
        ) : null
      )}
    </div>
  );
}

export default WorkerCardList;
