import WorkerDetailClient from './WorkerDetailClient';

const DetailPage = async ({ params }: { params: { id: string } }) => {
  return <WorkerDetailClient workerId={params.id} />;
};

export default DetailPage;
