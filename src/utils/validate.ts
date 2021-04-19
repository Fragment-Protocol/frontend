export const validateForm = ({ values, notRequired }: any) => {
  interface IRules {
    [key: string]: (value: any) => void;
  }
  const errCopy: any = {};

  const rules: IRules = {
    name: (value: string): void => {
      if (!value) {
        errCopy.name = 'Enter token name';
      }
    },
    shortName: (value: string): void => {
      if (!value) {
        errCopy.shortName = 'Enter token short name';
      }
    },
    amount: (value: string): void => {
      if (!value) {
        errCopy.amount = 'Enter token amount';
      }
    },
    decimals: (value: string): void => {
      if (!value) {
        errCopy.decimals = 'Enter token decimals';
      }
    },
  };

  Object.keys(values).forEach(
    (key: any) => rules[key] && !notRequired.includes(key) && rules[key](values[key]),
  );

  return errCopy;
};

export const validateField = (key: any, touched: any, errors: any) => {
  if (touched[key]) {
    if (errors[key]) {
      return 'error';
    }
    return 'success';
  }
  return '';
};
