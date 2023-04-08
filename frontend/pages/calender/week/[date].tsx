import React from 'react';
import { useRouter } from 'next/router';
import WeekCalender from '../../../components/calender/week/WeekCalender';

export async function getServerSideProps(context) {
  return { props: {} };
}

export default (props) => {
  const router = useRouter();
  const { date: dateFormatString } = router.query;
  return <WeekCalender date={new Date(dateFormatString as string)} />;
};
