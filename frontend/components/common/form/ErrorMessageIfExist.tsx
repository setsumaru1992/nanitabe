import React from 'react';

type Props = {
  errorMessage?: string;
};

export default (props: Props) => {
  const { errorMessage } = props;
  if (!errorMessage) return null;

  return <p>{errorMessage.toString()}</p>;
};
