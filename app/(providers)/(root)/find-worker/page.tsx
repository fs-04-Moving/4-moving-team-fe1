import profilesApi from '@/api/profiles/profiles.api';
import FindWorkerClient from './FindWorkerClient';

async function FindWorkerPage() {
  const workers = await profilesApi.getWorkerProfiles({ pageSize: 5 });

  return (
    <main className="mx-auto max-w-9/12 px-4">
      <div className="hidden lg:flex justify-center">
        <h2 className="font-semibold text-2xl py-8 w-[1400px]">기사님 찾기</h2>
      </div>
      <FindWorkerClient initialData={workers} />
    </main>
  );
}

export default FindWorkerPage;
