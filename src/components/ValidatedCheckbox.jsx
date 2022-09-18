import { CFormCheck } from '@coreui/react';
import React from 'react';
import { Controller } from 'react-hook-form';

/**
 * ValidatedCheck is a wrapper around CFormCheck that adds validation
 *
 * @param {props} props with the following properties:
 * - control: the control object from react-hook-form
 * - name: the name of the input
 * - label: the label of the input
 * - rules: the rules for the input (see https://react-hook-form.com/api/useform/register)
 * @returns the CFormCheck with validation
 */
export default function ValidatedCheckbox({ control, name, label, rules, required }) {
  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => (
        <CFormCheck
          label={label}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          name={name}
          ref={ref}
          invalid={!!error}
          feedbackInvalid={error?.message}
          required={required}
        />
      )}
    />
  );
}
