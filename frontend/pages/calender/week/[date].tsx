import React from 'react';
import { useRouter } from 'next/router';
import WeekCalender from '../../../components/calender/week/WeekCalender';

export async function getServerSideProps(context) {
  return { props: {} };
}

export default (props) => {
  const router = useRouter();
  const dateFormatString = router.query.date as string;

  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(dateFormatString)) {
    return <WeekCalender />;
  }
  return <WeekCalender date={new Date(dateFormatString)} />;
};
