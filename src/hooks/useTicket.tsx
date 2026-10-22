import { useContext } from 'react';
import { TicketContext } from '../context/TicketContext';

export function useTickets() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTickets debe ser utilizado dentro de un TicketProvider');
  }

  const { tickets, dispatch } = context;

  const totalCount = tickets.length;
  const pendingCount = tickets.filter((t) => t.status === 'pendiente').length;
  const resolvedCount = tickets.filter((t) => t.status === 'resuelta').length;

  return {
    tickets,
    dispatch,
    totalCount,
    pendingCount,
    resolvedCount,
  };
}