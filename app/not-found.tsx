import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold">페이지를 찾을 수 없습니다</h2>
      <p className="text-GrayScale-500 text-xl mt-2">
        주소창의 페이지 주소가 정확한지 다시 확인 부탁드립니다.
      </p>
      <Link href="/" className="mt-10 underline hover:opacity-45">
        홈으로 가기
      </Link>
    </div>
  );
}
