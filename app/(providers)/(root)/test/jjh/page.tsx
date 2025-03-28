import ChipMoveType from '@/components/atoms/ChipMoveType';

function page() {
  return (
    <div>
      컴포넌트 테스트페이지입니다.
      <ChipMoveType type="소형이사" />
      <ChipMoveType type="가정이사" />
      <ChipMoveType type="사무실이사" />
      <ChipMoveType type="지정견적요청" />
      <ChipMoveType type="견적대기" />
    </div>
  );
}

export default page;
