import { useState, useEffect } from "react";
import bgMainMobile from "../images/bg-main-mobile.png";
import bgMainDesktop from "../images/bg-main-desktop.png";

import DynamicCard from "./DynamicCard";
import StaticCard from "./StaticCard";

const Background = () => {
  const desktopWidth = 1440;
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= desktopWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= desktopWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktopWidth]);

  // const [cardName, setCardName] = [...nameState]
  // const [cardNumber, setCardNumber] = [...numberState]
  // const [expiryMonth, setExpiryMonth] = [...expMMState];
  // const [expiryYear, setExpiryYear] = [...expYYState];
  // const [CVC, setCVC] = [...CVCState];
  
  return (
    <div className="relative grid w-full object-contain sm:place-items-center halfxl:w-[483px]">
      <div className="-z-10 w-full">
        <img
          className="max-h-80 w-full halfxl:h-svh halfxl:max-h-none"
          src={isDesktop ? bgMainDesktop : bgMainMobile}
          alt=""
        />
      </div>
      <DynamicCard />
      
      <StaticCard />
    </div>
  );
};

export default Background;
