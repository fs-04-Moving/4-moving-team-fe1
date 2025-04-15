import WorkerCardInSearch from '@/components/organisms/WorkerCardInSearch';
import { Worker } from '@/types/dtos/Worker.dto';

type Props = {
  workers: Worker[];
  isLoading: boolean;
};

function WorkerCardList({ workers, isLoading }: Props) {
  if (isLoading) return ''; // todo: 스켈레톤 구현해보기

  if (!workers.length) return '검색 결과가 없어요'; //<EmptyResult />

  return (
    <div className="flex flex-col gap-12">
      {workers.map((worker) => (
        <WorkerCardInSearch key={worker.workerId} {...worker} />
      ))}
    </div>
  );
}

export default WorkerCardList;
