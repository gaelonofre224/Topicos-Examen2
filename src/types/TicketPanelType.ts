export type PriorityType = 'baja' | 'media' | 'alta';
export type StatusType = 'pendiente' | 'resuelta';

export type TicketPanelType = {
  id: number;
  requester: string;
  description: string;
  priority: PriorityType | string;
  status: StatusType | string;
};

export type TicketAction =
  | { type: 'ADD_TICKET'; payload: TicketPanelType }
  | { type: 'RESOLVE_TICKET'; payload: number }
  | { type: 'DELETE_TICKET'; payload: number };