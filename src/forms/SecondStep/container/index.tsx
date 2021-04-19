// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';

import { validateForm } from '../../../utils/validate';
import SecondStep, { ISecondStep } from '../component';
import { useModalContext } from '../../../contexts/ModalContext';

export default () => {
  const modalContext = useModalContext();
  const FormWithFormik = withFormik<any, ISecondStep>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      name: '',
      shortName: '',
      amount: '',
      decimals: '',
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: [] });

      return errors;
    },

    handleSubmit: (values) => {
      console.log(values);
      modalContext.handleChangeVisible('end', true);
      modalContext.handleChangeVisible('token', false);
    },

    displayName: 'ChangePasswordForm',
  })(SecondStep);
  return <FormWithFormik />;
};
