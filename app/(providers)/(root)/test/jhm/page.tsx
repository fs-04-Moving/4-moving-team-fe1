'use client';

import ButtonPopFilter from '@/components/atoms/ButtonPopFilter';
import ChatBubbleTextLeft from '@/components/atoms/ChatBubbleTextLeft';
import ChatBubbleTextRight from '@/components/atoms/ChatBubbleTextRight';
import ChatBubbleAddress from '@/components/molecules/ChatBubbleAddress';
import Dropdown from '@/components/molecules/Dropdown';
import PageContainer from '@/components/templates/PageContainer';
import { FilterReceivedEstimateList } from '@/types/dtos/estimate.dto';

function page() {
  const options: FilterReceivedEstimateList[] = ['전체', '확정한 견적서'];
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
        <ButtonPopFilter
          onClick={() => {
            console.log('pop!');
          }}
        />
        <ButtonPopFilter
          isActive={true}
          onClick={() => {
            console.log('pop!');
          }}
        />
        <div className="h-100 w-full mt-10">
          <Dropdown options={options} defaultValue="전체" />
        </div>
      </div>
    </PageContainer>
  );
}

export default page;
