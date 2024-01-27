type ValidatePercentageReturn = {
  totalPercentages: number;
  isValid: boolean;
};

export const validatePercentage = (percentages: number[]): ValidatePercentageReturn => {
  const totalPercentages = percentages.reduce((total, value) => total + value, 0);
  const isValid = totalPercentages <= 100 && percentages.every((value) => value > -1);
  return { totalPercentages, isValid };
};
