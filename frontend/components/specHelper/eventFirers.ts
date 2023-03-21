import { fireEvent } from '@testing-library/react';

export const enterTextBox = (screen, testId, value) => {
    fireEvent.change(screen.getByTestId(testId), {
        target: {value},
    });
};
