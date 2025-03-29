import { ReactNode } from 'react';
import PageContainer from '../templates/PageContainer';

function ChatBubbleRight({ children }: { children: ReactNode }) {
  return (
    <PageContainer>
      <div className="flex items-center bg-primay-blue-300 text-white rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px]  text-sm lg:text-lg max-w-[248px] lg:max-w-[520px] px-5 py-3">
        {children}
      </div>
    </PageContainer>
  );
}

export default ChatBubbleRight;
