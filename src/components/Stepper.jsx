import Icon from './Icon.jsx';

export default function Stepper({ currentStep = 1, steps }) {
  return (
    <ol className="stepper" aria-label="Etapas de criação do caso">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === currentStep;
        const complete = stepNumber < currentStep;

        return (
          <li
            className={`stepper__item ${active ? 'stepper__item--active' : ''} ${
              complete ? 'stepper__item--complete' : ''
            }`}
            key={step}
          >
            <span className="stepper__number">{stepNumber}</span>
            {complete && (
              <span className="stepper__check">
                <Icon name="check" size={20} />
              </span>
            )}
            <span className="stepper__label">{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
