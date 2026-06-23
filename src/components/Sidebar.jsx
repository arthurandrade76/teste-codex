import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { navigationSections } from '../services/navigationMock.js';
import Icon from './Icon.jsx';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar__top">
        <div className="sidebar__logo">PIBIC</div>
        <nav className="sidebar__nav" aria-label="Navegação principal">
          {navigationSections.map((section) => (
            <div className="sidebar__section" key={section.title}>
              <span className="sidebar__section-title">{section.title}</span>
              <div className="sidebar__items">
                {section.items.map((item) => (
                  <NavLink
                    className={({ isActive }) => `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    end={item.path === '/'}
                    key={item.label}
                    to={item.path}
                  >
                    <Icon name={item.icon} />
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <button className="sidebar__logout" onClick={logout} type="button">
        <Icon name="logout" />
        <span>Sair</span>
      </button>
    </aside>
  );
}
