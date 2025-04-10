interface ErrorMessageProps {
  message?: string;
}

/**
 * input의 에러메시지 컴포넌트입니다.
 * - message가 전달되지 않으면 표시되지 않습니다.
 * @param message
 * @returns
 */
function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="flex justify-end">
      <span className="text-Secondary-Red-200">{message}</span>
    </div>
  );
}

export default ErrorMessage;
