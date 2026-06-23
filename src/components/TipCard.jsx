import Icon from './Icon.jsx';

export default function TipCard() {
  return (
    <aside className="tip-card">
      <div className="tip-card__header">
        <span className="tip-card__icon">
          <Icon name="lamp" />
        </span>
        <strong>Dica</strong>
      </div>
      <p>
        Quanto mais contexto você fornecer nas etapas, mais rico e coerente será o caso clínico
        gerado pela IA.
      </p>
    </aside>
  );
}
