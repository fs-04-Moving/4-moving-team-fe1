import ButtonSolid from '../atoms/ButtonSolid';
import InputAddress from '../atoms/InputAddress';

/**
 * 견적 요청 생성 시 주소를 입력받는 챗버블 창
 * @returns
 */
function ChatBubbleAddress({
  isActiveButton = false,
}: {
  isActiveButton?: boolean;
}) {
  return (
    <div className="drop-shadow-Chat flex bg-GrayScale-50 flex-col gap-4 lg:gap-5  items-center rounded-3xl rounded-tr-none lg:rounded-tr-none lg:rounded-[30px] w-[327px] lg:w-[640px] p-6 lg:p-8">
      <InputAddress label="출발지" placeholder="출발지 선택하기" />
      <InputAddress label="도착지" placeholder="도착지 선택하기" />
      {isActiveButton && <ButtonSolid>견적 확정하기</ButtonSolid>}
    </div>
  );
}

export default ChatBubbleAddress;
