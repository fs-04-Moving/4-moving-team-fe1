import ChatBubbleTextLeft from '@/components/atoms/ChatBubbleTextLeft';
import ChatBubbleTextRight from '@/components/atoms/ChatBubbleTextRight';
import ChatBubbleAddress from '@/components/molecules/ChatBubbleAddress';
import PageContainer from '@/components/templates/PageContainer';

function page() {
  return (
    <PageContainer>
      <div>
        <ChatBubbleTextRight>
          break-words 를 사용하면 자동으로 줄바꿈이 됩니다.break-words 를
          사용하면 자동으로 줄바꿈이 됩니다.braea-words 를 사용하면 자동으로
          줄바꿈이 됩니다.break-words 를 사용하면 자동으로 줄바꿈이 됩니다.
        </ChatBubbleTextRight>
        <ChatBubbleTextLeft>
          break-words 를 사용하면 자동으로 줄바꿈이 됩니다.break-words 를
          사용하면 자동으로 줄바꿈이 됩니다.braea-words 를 사용하면 자동으로
          줄바꿈이 됩니다.break-words 를 사용하면 자동으로 줄바꿈이 됩니다.
        </ChatBubbleTextLeft>
        <ChatBubbleAddress />
      </div>
    </PageContainer>
  );
}

export default page;
