import { Dispatch, SetStateAction } from "react";
import { useTimer } from "react-timer-hook";
import { string } from "zod";

interface IProps {
  setIsRegistrationActive?: Dispatch<boolean>;
}

const Timer = ({setIsRegistrationActive}: IProps) => {
  const expiryTimestamp = new Date("2023-10-23 9:30");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsRegistrationActive && setIsRegistrationActive(false);
    },
  });

  return (
    <div className="flex justify-center space-x-7 md:space-x-9 font-tourney text-2xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-black select-none">
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{String (days).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">D</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{String (hours).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">H</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{String (minutes).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">M</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{String (seconds).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">S</span>
      </span>
    </div>
  );
};

export default Timer;
