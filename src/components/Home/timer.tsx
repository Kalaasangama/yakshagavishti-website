import type { Dispatch } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
  setIsRegistrationActive?: Dispatch<boolean>;
}

const Timer = ({setIsRegistrationActive}: Props) => {
  const expiryTimestamp = new Date("2023-11-25 9:30");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsRegistrationActive && setIsRegistrationActive(false);
    },
  });

  return (
    <div className="flex justify-center space-x-7 md:space-x-9 font-tourney text-2xl sm:text-4xl lg:text-5xl 2xl:text-7xl font-black select-none drop-shadow-[0_0_3px_theme(colors.secondary-100)]">
      <div className="flex space-x-1 md:space-x-2 items-baseline">
        <span className="drop-shadow-[0_0_2px_theme(colors.secondary-100)]">{String (days).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">D</span> 
      </div>
      <div className="flex space-x-1 md:space-x-2 items-baseline">
        <span className="drop-shadow-[0_0_2px_theme(colors.secondary-100)]">{String (hours).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">H</span> 
      </div>
      <div className="flex space-x-1 md:space-x-2 items-baseline">
        <span className="drop-shadow-[0_0_2px_theme(colors.secondary-100)]">{String (minutes).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">M</span> 
      </div>
      <div className="flex space-x-1 md:space-x-2 items-baseline">
        <span className="drop-shadow-[0_0_2px_theme(colors.secondary-100)]">{String (seconds).padStart(2, '0')}</span>
        <span className="text-lg sm:text-xl lg:text-2xl 2xl:text-4xl font-thin">S</span>
      </div>
    </div>
  );
};

export default Timer;
