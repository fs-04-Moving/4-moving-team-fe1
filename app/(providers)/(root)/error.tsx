'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="grow flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">에러가 발생했습니다 😢</h1>
        <p className="text-sm text-GrayScale-500 mb-6">{error.message}</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-Primay-Blue-300 text-white rounded-lg cursor-pointer hover:opacity-70 active:opacity-80"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
