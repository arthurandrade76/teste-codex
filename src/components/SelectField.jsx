import { useState } from 'react';
import Icon from './Icon.jsx';

export default function SelectField({ label, name, onChange, options = [], required = false, value }) {
  const selectOptions = options.length > 0 ? options : [value];
  const [internalValue, setInternalValue] = useState(value);
  const selectedValue = value ?? internalValue;

  const handleChange = (event) => {
    setInternalValue(event.target.value);
    onChange?.(event);
  };

  return (
    <label className="field">
      <span className="field__label">
        {label}
        {required && <span className="field__required">*</span>}
      </span>
      <span className="select-field">
        <select
          aria-label={label}
          name={name}
          onChange={handleChange}
          required={required}
          value={selectedValue}
        >
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={24} />
      </span>
    </label>
  );
}
