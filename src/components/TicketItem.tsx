import { useTicketContext } from '../context/TicketContext';
import type { TicketPanelType } from '../types/TicketPanelType';

export default function TicketItem({ ticket }: { ticket: TicketPanelType }) {
  const { dispatch } = useTicketContext();

  return (
    <article className="ticket">
      <div className="ticket-top">
        <span className="ticket-id">#{ticket.id}</span>
        <div className="badges">
          <span className={`badge priority-${ticket.priority}`}>
            {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
          </span>
          <span className={`badge status-${ticket.status}`}>
            {ticket.status === 'pendiente' ? 'Pendiente' : 'Resuelta'}
          </span>
        </div>
      </div>
      <h3>{ticket.description}</h3>
      <p className="requester">Solicitante: {ticket.requester}</p>
      <div className="ticket-actions">
        {ticket.status !== 'resuelta' && (
          <button
            className="button secondary"
            type="button"
            onClick={() => dispatch({ type: 'RESOLVE_TICKET', payload: ticket.id })}
          >
            Marcar como resuelta
          </button>
        )}
        <button
          className="button danger"
          type="button"
          onClick={() => dispatch({ type: 'DELETE_TICKET', payload: ticket.id })}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}