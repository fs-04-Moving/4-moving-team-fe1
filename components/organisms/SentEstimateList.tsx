import Link from 'next/link';
import CustomerCardInEstimate from '@/components/organisms/CustomerCardInEstimate';

function SentEstimateList({ data }: { data: any[] }) {
  const sortedCards = [...data].sort((a, b) => {
    const now = new Date();
    const aDate = new Date(a.movingDate);
    const bDate = new Date(b.movingDate);
    const aIsFuture = aDate > now;
    const bIsFuture = bDate > now;
    if (aIsFuture && !bIsFuture) return -1;
    if (!aIsFuture && bIsFuture) return 1;
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[24px] gap-y-[24px] md:gap-y-[32px] lg:gap-y-[48px] w-full max-w-[1400px] justify-items-center">
      {sortedCards.map((card, index) => (
        <Link key={index} href={`/worker/estimates/${card.id}`}>
          <div className="relative overflow-hidden w-[328px] h-[244px] md:w-[600px] md:h-[206px] lg:w-[688px] lg:h-[272px]">
            <CustomerCardInEstimate
              {...card}
              movingDate={new Date(card.movingDate)}
              requestDate={new Date(card.requestDate)}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SentEstimateList;
