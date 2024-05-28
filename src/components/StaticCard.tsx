import back from "../images/bg-card-back.png";
import {useCardContext} from "../App";

const StaticCard = () => {
  const cardContext = useCardContext();

  if (!cardContext) {
    throw new Error("CardContext is not provided");
  }

  const {CVC} = cardContext;
  
  return (
    <div className="absolute right-4 top-4 -z-10 w-80 sm:left-1/2 sm:right-auto sm:w-[21rem] halfxl:left-auto halfxl:right-0 halfxl:top-auto halfxl:w-[23rem] halfxl:translate-x-1/2 halfxl:translate-y-[70%]">
      <img src={back} />
      <p className="absolute right-10 top-[4.7rem] text-sm text-white font-bold sm:top-20 halfxl:top-[5.6rem]">{CVC || '000'}</p>
    </div>
  );
};

export default StaticCard;
