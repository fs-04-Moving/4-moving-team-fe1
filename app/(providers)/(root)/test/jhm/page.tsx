import ChatBubbleLeft from '@/components/atoms/ChatBubbleLeft';
import ChatBubbleRight from '@/components/atoms/ChatBubbleRight';

function page() {
  return (
    <div>
      <ChatBubbleRight>
        brack-words 를 사용하면 자동으로 줄바꿈이 됩니다.brack-words 를 사용하면
        자동으로 줄바꿈이 됩니다.brack-words 를 사용하면 자동으로 줄바꿈이
        됩니다.brack-words 를 사용하면 자동으로 줄바꿈이 됩니다.
      </ChatBubbleRight>
      <ChatBubbleLeft>
        brack-words 를 사용하면 자동으로 줄바꿈이 됩니다.brack-words 를 사용하면
        자동으로 줄바꿈이 됩니다.brack-words 를 사용하면 자동으로 줄바꿈이
        됩니다.brack-words 를 사용하면 자동으로 줄바꿈이 됩니다.
      </ChatBubbleLeft>
    </div>
  );
}

export default page;
