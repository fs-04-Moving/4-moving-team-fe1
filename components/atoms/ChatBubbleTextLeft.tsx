import { ReactNode } from 'react';

/**
 * 채팅 UI에서 왼쪽에 위치하는 흰색 배경의 bubble 컴포넌트입니다.
 * @param param0
 * - children: 텍스트 내용(문자열)
 * @returns
 */
function ChatBubbleTextLeft({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center text-Black-400 rounded-3xl rounded-tl-none lg:rounded-tl-none lg:rounded-[30px]  text-sm lg:text-lg max-w-[248px] lg:max-w-[520px] px-5 lg:px-10 py-3 lg:py-5">
      {children}
    </div>
  );
}

export default ChatBubbleTextLeft;
