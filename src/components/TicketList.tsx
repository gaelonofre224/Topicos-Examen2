import { useTicketContext } from '../context/TicketContext';
import TicketItem from './TicketItem';
import EmptyState from './EmptyState';

export default function TicketList() {
  const { tickets } = useTicketContext();

  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading"><span className="step">02</span><div><h2 id="list-title">Solicitudes registradas</h2><p>Consulta su prioridad y actualiza su estado.</p></div></div>
      <div className="ticket-list">
        {tickets.length === 0 ? (
          <EmptyState />
        ) : (
          tickets.map((ticket) => (
            <TicketItem key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </section>
  );
}