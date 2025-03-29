import InputAddress from '../atoms/InputAddress';
import TempConfirmEstimateButton from '../atoms/TempConfirmEstimateButton';

function ChatBubbleAddress() {
  return (
    <div className="flex flex-col gap-4 lg:gap-5  items-center rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px] max-w-[327px] lg:max-w-[624px] p-8">
      <InputAddress label="출발지" placeholder="출발지 선택하기" />
      <InputAddress label="도착지" placeholder="도착지 선택하기" />
      <TempConfirmEstimateButton>견적 확정하기</TempConfirmEstimateButton>
    </div>
  );
}

export default ChatBubbleAddress;
