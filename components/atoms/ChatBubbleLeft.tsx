import { ReactNode } from 'react';
import PageContainer from '../templates/PageContainer';

function ChatBubbleLeft({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <div className="flex items-center text-Black-400 rounded-3xl rounded-tl-none lg:rounded-tl-none lg:rounded-[30px]  text-sm lg:text-lg max-w-[248px] lg:max-w-[520px] px-5 lg:px-10 py-3 lg:py-5">
        {children}
      </div>
    </PageContainer>
  );
}

export default ChatBubbleLeft;
