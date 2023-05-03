import React from 'react';
import * as z from 'zod';
import SourceForm from './SourceForm';

type Props = {};

export default (props: Props) => {
  return <SourceForm onSubmit={() => {}} formSchema={z.object({})} />;
};
