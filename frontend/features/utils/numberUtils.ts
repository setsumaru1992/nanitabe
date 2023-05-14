export const parseIntOrNull = (numberableValue: any): number | null => {
  const parsedValue = Number(numberableValue);
  return Number.isNaN(parsedValue) ? null : parsedValue;
};
