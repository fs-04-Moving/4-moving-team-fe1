import WorkerDetailClient from './WorkerDetailClient';

type Props = {
  params: {
    id: string;
  };
};

async function DetailPage({ params }: Props) {
  // params 객체를 await
  const resolvedParams = await Promise.resolve(params);
  const workerId = resolvedParams.id;

  // 클라이언트 컴포넌트에 데이터 전달
  return (
    <>
      <WorkerDetailClient workerId={workerId} />
    </>
  );
}

export default DetailPage;
