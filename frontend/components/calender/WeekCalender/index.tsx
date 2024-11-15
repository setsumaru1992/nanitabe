import React from 'react';
import Calender, { Props } from '../calenderComponents/Calender';

export { useDateFormatStringInUrl } from './useWeekCalenderDate';

export default ({ date }: Props) => <Calender date={date} />;
