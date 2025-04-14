'use client';

import ButtonClipOutlined from '@/components/atoms/ButtonClipOutlined';
import ButtonLikeOutlined from '@/components/atoms/ButtonLikeOutlined';
import ButtonPopFilter from '@/components/atoms/ButtonPopFilter';
import ButtonShareFacebook from '@/components/atoms/ButtonShareFacebook';
import ButtonShareKakao from '@/components/atoms/ButtonShareKakao';
import ChatBubbleTextLeft from '@/components/atoms/ChatBubbleTextLeft';
import ChatBubbleTextRight from '@/components/atoms/ChatBubbleTextRight';
import DividerHor from '@/components/atoms/DividerHor';
import Label from '@/components/atoms/Label';
import ChatBubbleAddress from '@/components/molecules/ChatBubbleAddress';
import Dropdown from '@/components/molecules/Dropdown';
import PageContainer from '@/components/templates/PageContainer';
import { FilterReceivedEstimateList } from '@/types/dtos/estimate.dto';
import { useRouter } from 'next/navigation';

function Page() {
  const options: FilterReceivedEstimateList[] = ['전체', '확정한 견적서'];

  const router = useRouter();

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
        <ButtonLikeOutlined onClick={() => {}} />
        <ButtonShareKakao
          onClick={() => {
            router.push('/customer');
          }}
        />
        <ButtonShareFacebook onClick={() => {}} />
        <ButtonClipOutlined onClick={() => {}} />
        <Label>페이지 상단 라벨(32사이즈)</Label>
        <Label intent="md">페이지 상단 라벨(24사이즈)</Label>
        <div className="h-5"></div>
        <DividerHor />
        <div className="h-100 w-full mt-10">
          <Dropdown options={options} defaultValue="전체" />
        </div>
      </div>
    </PageContainer>
  );
}

export default Page;
