'use client';

type ErrorProps = {
  message?: string;
  onRetry?: () => void;
};

/**
 * 에러를 표시하는 UI컴포넌트입니다.
 * @param param0 message: 에러 메시지
 * @param param0 onRetry: 버튼 클릭 시 이동 액션
 * @returns
 */
export default function Error({ message, onRetry }: ErrorProps) {
  console.log(message);
  return (
    <div className="grow flex items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">에러가 발생했습니다 😢</h1>
        <p
          className="text-sm text-GrayScale-500 mb-6"
          style={{ whiteSpace: 'pre-line' }} // 줄바꿈 스타일 추가
        >
          {message || '문제가 발생했습니다. 다시 시도해주세요.'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-Primay-Blue-300 text-white rounded-lg cursor-pointer hover:opacity-70 active:opacity-80"
          >
            다시 시도하기
          </button>
        )}
      </div>
    </div>
  );
}
