import { Dispatch, SetStateAction } from "react";
import { useTimer } from "react-timer-hook";

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
        <span>{days<10? '0'+days : days}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">D</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{hours<10? '0'+hours : hours}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">H</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{minutes<10? '0'+minutes : minutes}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">M</span> 
      </span>
      <span className="flex space-x-1 md:space-x-2 items-baseline">
        <span>{seconds<10? '0'+seconds : seconds}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">S</span>
      </span>
    </div>
  );
};

export default Timer;
