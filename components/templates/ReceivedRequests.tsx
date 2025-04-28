"use client";
import LeftMenu from "@/app/(providers)/(root)/worker/_components/LeftMenuInWorkerPage";
import TopMenu from "@/app/(providers)/(root)/worker/_components/TopMemuInWorkerPage";
import CustomerCardInEstimate from "../organisms/CustomerCardInEstimate";

function ReceivedRequests() {
  return (
    <main>
      <div className=" flex justify-center">
        <h2 className="font-semibold text-2xl py-8 lg:w-[1400px] md:w-[600px] w-[327px]">
          받은 요청
        </h2>
      </div>
      <div className="flex justify-center gap-28">
        <LeftMenu />
        <section className="w-[327px] md:w-[600px] lg:w-[955px] flex flex-col gap-[32px]">
          <TopMenu />
          <div className="flex flex-col gap-12">
            <CustomerCardInEstimate
              serviceType="smallMove"
              status="assigned"
              customerName="김인서"
              movingDate={new Date("2025-07-01")}
              departure="서울시 중구"
              destination="경기도 수원시"
              isConfirmed={false}
              requestDate={(() => {
                const today = new Date();
                today.setDate(today.getDate() + 1); // 내일 날짜
                return today;
              })()}
              price={210000}
              onSendEstimate={() => console.log("견적 보내기")}
              onReject={() => console.log("반려")}
              onViewDetail={() => console.log("상세보기")}
            />
            <CustomerCardInEstimate
              serviceType="smallMove"
              status="assigned"
              customerName="김인서"
              movingDate={new Date("2024-07-01")}
              departure="서울시 중구"
              destination="경기도 수원시"
              isConfirmed={false}
              requestDate={new Date()}
              price={210000}
              onSendEstimate={() => console.log("견적 보내기")}
              onReject={() => console.log("반려")}
              onViewDetail={() => console.log("상세보기")}
            />
          </div>

          {/* <div ref={ref}></div>  나중에 무한 스크롤 */}
        </section>
      </div>
    </main>
  );
}

export default ReceivedRequests;
