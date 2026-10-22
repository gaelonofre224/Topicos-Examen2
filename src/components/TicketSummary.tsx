import { useTicketContext } from '../context/TicketContext';

export default function TicketSummary() {
  const { tickets } = useTicketContext();

  const total = tickets.length;
  const pending = tickets.filter((t) => t.status === 'pendiente').length;
  const resolved = tickets.filter((t) => t.status === 'resuelta').length;

  return (
    <section className="summary" aria-label="Resumen de solicitudes">
      <article className="stat"><span>Total de solicitudes</span><strong>{total}</strong></article>
      <article className="stat"><span>Pendientes</span><strong className="text-amber">{pending}</strong></article>
      <article className="stat"><span>Resueltas</span><strong className="text-green">{resolved}</strong></article>
    </section>
  );
}