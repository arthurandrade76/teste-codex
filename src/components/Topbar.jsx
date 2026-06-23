import profileDefault from '../assets/profile-default.png';
import { useAuth } from '../context/AuthContext.jsx';
import Icon from './Icon.jsx';

export default function Topbar({ current = 'Parâmetros' }) {
  const { profile } = useAuth();

  return (
    <header className="topbar">
      <h1 className="topbar__breadcrumb">
        <span>Criar Caso &gt;</span> {current}
      </h1>

      <button className="profile" type="button">
        <img alt="" className="profile__avatar" src={profileDefault} />
        <span className="profile__copy">
          <strong>{profile.name}</strong>
          <small>{profile.course}</small>
        </span>
        <Icon name="chevronDown" size={10} />
      </button>
    </header>
  );
}
