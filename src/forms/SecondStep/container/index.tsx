// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line no-param-reassign
import React from 'react';
import { withFormik } from 'formik';
import { observer } from 'mobx-react-lite';

import { useConnectorContext } from '../../../contexts/Connector';
import { validateForm } from '../../../utils/validate';
import config from '../../../config';
import { useMst } from '../../../store/store';
import SecondStep, { ISecondStep } from '../component';

export default observer(() => {
  const { modals, user } = useMst();
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
      try {
        if (user.network !== config.networkBsc) {
          modals.handleError('bsc');
          setFieldValue('isLoading', false);
        } else {
          await connectContext.metamaskService.createTransaction('BSC', 'deployNewToken', [
            values.name,
            values.shortName,
            values.decimals,
            values.amount,
            user.address,
          ]);

          setFieldValue('isLoading', false);
          modals.changeVisible('token', false);
        }
      } catch (err) {
        console.log(err, 'err');
        setFieldValue('isLoading', false);
      }
    },

    displayName: 'ChangePasswordForm',
  })(SecondStep);
  return <FormWithFormik />;
});
