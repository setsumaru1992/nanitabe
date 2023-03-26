import { fireEvent, screen } from '@testing-library/react';
import useEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

export const user = useEvent.setup();

export const enterTextBox = (screen, testId, value) => {
  fireEvent.change(screen.getByTestId(testId), {
    target: { value },
  });
};

export const userClick = async (screen, elementTestId) => {
  await act(async () => {
    await user.click(screen.getByTestId(elementTestId));
  });
};

export const userChooseSelectBox = async (
  screen,
  selectBoxTestId: string,
  optionTestIds: string[],
) => {
  const options = optionTestIds.map((optionTestId) =>
    screen.getByTestId(optionTestId),
  );
  await user.selectOptions(screen.getByTestId(selectBoxTestId), options);
};
