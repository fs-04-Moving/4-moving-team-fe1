import ChipEstimateRequestStatus from '@/components/atoms/ChipEstimateRequestStatus';
import ChipEstimateStatus from '@/components/atoms/ChipEstimateStatus';
import ChipMovingType from '@/components/atoms/ChipMovingType';

function page() {
  return (
    <div>
      <p>컴포넌트 테스트페이지입니다.</p>
      <ChipMovingType type={'homeMove'} />
      &nbsp;
      <ChipMovingType type="officeMove" />
      &nbsp;
      <ChipMovingType type="smallMove" />
      &nbsp;
      <ChipEstimateRequestStatus type="active" />
      &nbsp;
      <ChipEstimateRequestStatus type="confirmed" />
      &nbsp;
      <ChipEstimateStatus type="assigned" />
      &nbsp;
      <ChipEstimateStatus type="general" />
      &nbsp;
      <ChipEstimateStatus type="rejected" />
    </div>
  );
}

export default page;
