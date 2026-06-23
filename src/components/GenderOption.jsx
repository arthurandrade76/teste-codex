import Icon from './Icon.jsx';

export default function GenderOption({ icon, label, selected = false, onSelect }) {
  return (
    <button
      aria-pressed={selected}
      className={`gender-option ${selected ? 'gender-option--selected' : ''}`}
      onClick={onSelect}
      type="button"
    >
      <Icon name={icon} size={20} />
      <span>{label}</span>
    </button>
  );
}
