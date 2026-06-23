export default function FormField({
  autoComplete,
  full = false,
  label,
  minLength,
  min,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  value,
}) {
  const controlledProps = value !== undefined ? { value } : {};

  return (
    <label className={`field ${full ? 'field--full' : ''}`}>
      <span className="field__label">
        {label}
        {required && <span className="field__required">*</span>}
      </span>
      <input
        autoComplete={autoComplete}
        className="field__control"
        min={min}
        minLength={minLength}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        type={type}
        {...controlledProps}
      />
    </label>
  );
}
