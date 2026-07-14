import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppLayout({ breadcrumbCurrent = 'Parâmetros', breadcrumbPrefix = 'Criar Caso', children }) {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Topbar current={breadcrumbCurrent} prefix={breadcrumbPrefix} />
        {children}
      </main>
    </div>
  );
}
