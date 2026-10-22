import { createContext, useReducer, useContext, type ReactNode, type Dispatch } from 'react';
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

type TicketContextType = {
  tickets: TicketPanelType[];
  dispatch: Dispatch<TicketAction>;
};

export const TicketContext = createContext<TicketContextType | null>(null);

export function useTicketContext() {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext debe utilizarse dentro de un TicketProvider');
  }
  return context;
}

export function TicketProvider({ children }: { children: ReactNode }) {
  const [tickets, dispatch] = useReducer(ticketReducer, []);

  return (
    <TicketContext.Provider value={{ tickets, dispatch }}>
      {children}
    </TicketContext.Provider>
  );
}