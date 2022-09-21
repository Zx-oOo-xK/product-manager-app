import React from 'react';
import { CFormInput } from '@coreui/react';
import { Controller } from 'react-hook-form';

/**
 * ValidatedInput is a wrapper around CFormInput that adds validation
 *
 * @param {props} props with the following properties:
 * - control: the control object from react-hook-form
 * - name: the name of the input
 * - type: the type of the input
 * - label: the label of the input
 * - rules: the rules for the input (see https://react-hook-form.com/api/useform/register)
 * @returns the CFormInput with validation
 */
export default function ValidatedInput({ control, name, type, label, rules, required }) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <CFormInput
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
          type={type}
          invalid={!!error}
          feedbackInvalid={error?.message}
          required={required}
        />
      )}
    />
  );
}
