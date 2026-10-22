import { useReducer, type ReactNode } from 'react';
import { TicketContext } from './TicketContext';
import type { TicketPanelType, TicketAction } from '../types/TicketPanelType';

function ticketReducer(state: TicketPanelType[], action: TicketAction): TicketPanelType[] {
  switch (action.type) {
    case 'ADD_TICKET':
      return [action.payload, ...state];
    case 'RESOLVE_TICKET':
      return state.map((ticket) =>
        ticket.id === action.payload ? { ...ticket, status: 'resuelta' } : ticket
      );
    case 'DELETE_TICKET':
      return state.filter((ticket) => ticket.id !== action.payload);
    default:
      return state;
  }
}

type TicketProviderProps = {
  children: ReactNode;
};

export default function TicketProvider({ children }: TicketProviderProps) {
  const [tickets, dispatch] = useReducer(ticketReducer, []);

  return (
    <TicketContext.Provider value={{ tickets, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}