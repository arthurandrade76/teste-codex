export default function TextAreaField({
  label,
  large = false,
  name,
  onChange,
  placeholder,
  required = false,
  value,
}) {
  const controlledProps = value !== undefined ? { value } : {};

  return (
    <label className="field field--full">
      <span className="field__label">
        {label}
        {required && <span className="field__required">*</span>}
      </span>
      <textarea
        className={`field__control field__control--textarea ${large ? 'field__control--textarea-large' : ''}`}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...controlledProps}
      />
    </label>
  );
}
