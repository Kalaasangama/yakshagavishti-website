import { type Dispatch } from "react";
import { useTimer } from "react-timer-hook";
import { useTranslations } from "use-intl";

interface Props {
  setIsRegistrationActive: Dispatch<boolean>;
}

const Timer = ({setIsRegistrationActive }: Props) => {
  const t = useTranslations("Timer");
  const expiryTimestamp = new Date("2025-04-12 9:30");
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      if (setIsRegistrationActive) {
        setIsRegistrationActive(false);
      }
    },
  });

  return (
    <div className="flex justify-center space-x-7 md:space-x-9 font-rhomdon text-3xl sm:text-4xl lg:text-6xl 2xl:text-7xl font-black select-none drop-shadow-[0_0_1.5px_theme(colors.secondary-100)]">
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (days).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">{t('Days')}</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (hours).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">{t('Hours')}</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (minutes).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">{t('Minutes')}</span> 
      </div>
      <div className="flex flex-col space-x-1 md:space-x-2 items-baseline">
        <span className="">{String (seconds).padStart(2, '0')}</span>
        <span className="text-2xl sm:text-3xl lg:text-4xl 2xl:text-6xl font-thin">{t('Seconds')}</span>
      </div>
    </div>
  );
};

export default Timer;
