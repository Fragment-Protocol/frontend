import React from 'react';
import { Form } from 'antd';
import { FormikProps } from 'formik';

import { Button, Input } from '../../../components';
import { validateField } from '../../../utils/validate';

export interface ISecondStep {
  name: string;
  shortName: string;
  amount: string;
  decimals: string;
}

const SecondStep: React.FC<FormikProps<ISecondStep>> = ({
  touched,
  errors,
  handleChange,
  values,
  handleBlur,
  handleSubmit,
}) => {
  const onSubmit = () => {
    handleSubmit();
  };
  return (
    <Form name="form__step" className="form__step" layout="vertical">
      <Form.Item
        name="name"
        className="form__step-item input__field"
        validateStatus={validateField('name', touched, errors)}
        help={!touched.name ? false : errors.name}
      >
        <Input
          id="name"
          className="form__step-input input text-regular"
          type="text"
          value={values.name}
          placeholder="Token name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        name="shortName"
        className="form__step-item input__field"
        validateStatus={validateField('shortName', touched, errors)}
        help={!touched.shortName ? false : errors.shortName}
      >
        <Input
          id="shortName"
          className="form__step-input-short input text-regular"
          type="text"
          value={values.shortName}
          placeholder="Short name"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        name="amount"
        className="form__step-item input__field"
        validateStatus={validateField('amount', touched, errors)}
        help={!touched.amount ? false : errors.amount}
      >
        <Input
          id="amount"
          className="form__step-input input text-regular"
          type="number"
          value={values.amount}
          placeholder="Amount"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Form.Item
        name="decimals"
        className="form__step-item input__field"
        validateStatus={validateField('decimals', touched, errors)}
        help={!touched.decimals ? false : errors.decimals}
      >
        <Input
          id="decimals"
          className="form__step-input input text-regular"
          type="number"
          value={values.decimals}
          placeholder="Decimals"
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Item>
      <Button
        disabled={!!Object.keys(errors).length}
        colorScheme="white"
        className="form__step-btn"
        onClick={onSubmit}
      >
        CREATE
      </Button>
    </Form>
  );
};

export default SecondStep;
