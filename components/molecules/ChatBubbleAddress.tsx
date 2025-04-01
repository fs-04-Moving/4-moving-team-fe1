import { FilterReceivedEstimateList } from '@/types/dtos/estimate.dto';
import ButtonOutlined from '../atoms/ButtonOutlined';
import ButtonSolid from '../atoms/ButtonSolid';
import InputAddress from '../atoms/InputAddress';
import Dropdown from './Dropdown';

function ChatBubbleAddress() {
  const options: FilterReceivedEstimateList[] = ['전체', '확정한 견적서'];

  return (
    <div className="flex flex-col gap-4 lg:gap-5  items-center rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px] max-w-[327px] lg:max-w-[624px] p-8">
      <InputAddress label="출발지" placeholder="출발지 선택하기" />
      <InputAddress label="도착지" placeholder="도착지 선택하기" />
      <ButtonSolid>견적 확정하기</ButtonSolid>
      <ButtonOutlined>아웃 라인 버튼</ButtonOutlined>
      <ButtonOutlined intent="active">아웃 라인 버튼 active</ButtonOutlined>
      <ButtonOutlined intent="done">아웃 라인 버튼 done</ButtonOutlined>
      <div className="h-100 w-full">
        <Dropdown options={options} defaultValue="전체" />
      </div>
    </div>
  );
}

export default ChatBubbleAddress;
