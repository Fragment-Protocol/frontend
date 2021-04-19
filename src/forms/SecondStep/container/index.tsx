// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';

import { useModalContext } from '../../../contexts/ModalContext';
import { useConnectorContext } from '../../../contexts/Connector';
import { validateForm } from '../../../utils/validate';
import config from '../../../config';
import SecondStep, { ISecondStep } from '../component';

export default () => {
  const modalContext = useModalContext();
  const connectContext = useConnectorContext();
  const FormWithFormik = withFormik<any, ISecondStep>({
    enableReinitialize: true,
    mapPropsToValues: () => ({
      name: '',
      shortName: '',
      amount: '',
      decimals: '',
      isLoading: false,
    }),
    validate: (values) => {
      const errors = validateForm({ values, notRequired: [] });

      return errors;
    },

    handleSubmit: async (values, { setFieldValue }) => {
      setFieldValue('isLoading', true);
      debugger; // eslint-disable-line no-debugger
      try {
        if (connectContext.network !== config.networkBsc) {
          modalContext.handleError('bsc');
        } else {
          await connectContext.metamaskService.createTransaction('BSC', 'deployNewToken', [
            values.name,
            values.shortName,
            values.decimals,
            values.amount,
            connectContext.address,
          ]);

          setFieldValue('isLoading', false);
          modalContext.handleChangeVisible('token', false);
        }
      } catch (err) {
        console.log(err, 'err');
        setFieldValue('isLoading', false);
      }
    },

    displayName: 'ChangePasswordForm',
  })(SecondStep);
  return <FormWithFormik />;
};
