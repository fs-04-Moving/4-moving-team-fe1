import ButtonOutlined from '../atoms/ButtonOutlined';
import ButtonSolid from '../atoms/ButtonSolid';
import InputAddress from '../atoms/InputAddress';

/**
 * 견적 요청 생성 시 주소를 입력받는 챗버블 창
 * @returns
 */
function ChatBubbleAddress() {
  return (
    <div className="flex flex-col gap-4 lg:gap-5  items-center rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px] max-w-[327px] lg:max-w-[624px] p-8">
      <InputAddress label="출발지" placeholder="출발지 선택하기" />
      <InputAddress label="도착지" placeholder="도착지 선택하기" />
      <ButtonSolid>견적 확정하기</ButtonSolid>
      <ButtonOutlined>아웃 라인 버튼</ButtonOutlined>
      <ButtonOutlined intent="active">아웃 라인 버튼 active</ButtonOutlined>
      <ButtonOutlined intent="done">아웃 라인 버튼 done</ButtonOutlined>
    </div>
  );
}

export default ChatBubbleAddress;
