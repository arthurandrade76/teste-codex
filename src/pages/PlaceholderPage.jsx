import AppLayout from '../components/AppLayout.jsx';

export default function PlaceholderPage({ title }) {
  return (
    <AppLayout>
      <section className="placeholder-page">
        <h2>{title}</h2>
      </section>
    </AppLayout>
  );
}
