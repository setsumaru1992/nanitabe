import { previousSunday, subDays, addDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { weekCalenderPageUrlOf } from '../../../pages/calender/week/[date]';
import { isISODateFormatString } from '../../../features/utils/dateUtils';

const getWeekStartDateFrom = (date: Date) => {
  const dayOfWeekNum = date.getDay();
  if (dayOfWeekNum === 0) return date;
  return previousSunday(date);
};
export const useFirstDisplayDate = (specifiedDate: Date) => {
  const firstDisplayDate = getWeekStartDateFrom(specifiedDate);

  /*
    NOTE: 日付変更方針: URLを正として、コンポーネントはそれに追随し、更新したい場合はURLを更新する
    - 初めにコンポーネントで閉じるstateで日付を管理していた
      - router.pushで日付更新した後の「戻る」で戻った後の日付反映できなかった。
    - 次にページコンポーネントでもstateを持って、このhooksを使うコンポーネントでもstateを持った
      - 管理の側面でも二重管理になっていた
      - 片方を変えたときに、もう一方が意図せず変わるなどが起きてしまった
    - 最終的に不服だが、コンポーネントに閉じずにページコンポーネントでの値に追随するようにした
   */
  const router = useRouter();

  const updateFirstDateToPreviousWeekFirstDate = () => {
    router.push(weekCalenderPageUrlOf(subDays(firstDisplayDate, 7)));
  };

  const updateFirstDateToNextWeekFirstDate = () => {
    router.push(weekCalenderPageUrlOf(addDays(firstDisplayDate, 7)));
  };

  return {
    firstDisplayDate,
    updateFirstDateToPreviousWeekFirstDate,
    updateFirstDateToNextWeekFirstDate,
  };
};

export const useDateFormatStringInUrl = (
  extractDateStringFromUrl: (url: string) => string | null,
) => {
  const router = useRouter();
  const [dateFormatString, setDateFormatString] = useState(
    router.query.date as string,
  );

  // router.pushによるURL更新や「戻る/次へ」によるURL変更への追随
  useEffect(() => {
    const handleChangedUrl = (changedUrl: string) => {
      const dateStringOfNewUrl = extractDateStringFromUrl(changedUrl);
      if (isISODateFormatString(dateStringOfNewUrl)) {
        setDateFormatString(dateStringOfNewUrl);
      } else {
        setDateFormatString('');
      }
    };

    router.beforePopState(({ as }) => {
      handleChangedUrl(as);
      return true;
    });

    const handleRouteChange = (url) => {
      handleChangedUrl(url);
    };
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return { dateFormatString };
};
