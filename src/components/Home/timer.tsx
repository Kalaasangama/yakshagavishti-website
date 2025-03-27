import { type Dispatch } from "react";
import { useTimer } from "react-timer-hook";

interface Props {
  setIsRegistrationActive: Dispatch<boolean>;
}

const Timer = ({setIsRegistrationActive }: Props) => {
  const expiryTimestamp = new Date("2025-04-12 9:30");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsRegistrationActive && setIsRegistrationActive(false);
    },
  });

  return (
    <div className="flex justify-center space-x-7 md:space-x-9 font-rhomdon text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-black select-none drop-shadow-[0_0_1.5px_theme(colors.secondary-100)]">
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (days).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">Days</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (hours).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">Hours</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (minutes).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">Mins</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (seconds).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">Secs</span>
      </div>
    </div>
  );
};

export default Timer;
