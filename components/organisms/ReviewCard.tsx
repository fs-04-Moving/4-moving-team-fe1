import { format } from 'date-fns';
import ButtonStarRating from '../molecules/ButtonStarRating';

type Props = {
  nickname: string;
  createdAt: Date;
  rating: number;
  content: string;
};

function ReviewCard({ nickname, content, rating, createdAt }: Props) {
  const formatted = format(createdAt, 'yyyy-MM-dd');

  return (
    <div className="flex flex-col gap-6 lg:gap-6 max-w-[327px] md:max-w-[600px] lg:max-w-[955px] py-8 border-b-[1px] border-BackGround-100">
      <div className="flex flex-col gap-2">
        <div className="flex gap-3">
          <span>{`${nickname.slice(0, 3)}****`}</span>
          <span className="text-GrayScale-300 font-normal">|</span>
          <span className="text-GrayScale-300 font-normal">{formatted}</span>
        </div>
        <ButtonStarRating initialRating={rating} />
      </div>
      <div>{content}</div>
    </div>
  );
}

export default ReviewCard;
