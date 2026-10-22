import { useActionState, useRef } from 'react';
import { useTicketContext } from '../context/TicketContext';
import type { TicketPanelType } from '../types/TicketPanelType';

type FormState = {
  errors: string[];
  successMessage: string | null;
};

const initialFormState: FormState = {
  errors: [],
  successMessage: null,
};

export default function TicketForm() {
  const { dispatch } = useTicketContext();

  const requesterRef = useRef<HTMLInputElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  async function ticketAction(
    _prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    const requester = (formData.get('requester') as string || '').trim();
    const description = (formData.get('description') as string || '').trim();
    const priority = (formData.get('priority') as string || '').trim();

    const errors: string[] = [];

    // Validaciones de negocio
    if (requester.length < 3) {
      errors.push('El solicitante debe tener al menos 3 caracteres.');
    }
    if (description.length < 10) {
      errors.push('La descripción debe tener al menos 10 caracteres.');
    }
    if (!['baja', 'media', 'alta'].includes(priority)) {
      errors.push('Selecciona una prioridad válida (baja, media o alta).');
    }

    if (errors.length > 0) {
      return { errors, successMessage: null };
    }

    // Espera simulada de ~1 segundo
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generar id único fuera del reducer
    const newTicket: TicketPanelType = {
      id: Date.now(),
      requester,
      description,
      priority,
      status: 'pendiente',
    };

    dispatch({ type: 'ADD_TICKET', payload: newTicket });

    formRef.current?.reset();
    requesterRef.current?.focus();

    return {
      errors: [],
      successMessage: 'Solicitud registrada correctamente',
    };
  }

  const [state, formAction, isPending] = useActionState(ticketAction, initialFormState);

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading"><span className="step">01</span><div><h2 id="form-title">Nueva solicitud</h2><p>Describe brevemente lo que necesitas.</p></div></div>
      <form ref={formRef} action={formAction} className="ticket-form" noValidate>
        <div className="field"><label htmlFor="requester">Solicitante</label><input ref={requesterRef} id="requester" name="requester" placeholder="Ej. Ana López" autoComplete="name" disabled={isPending} /><small>Mínimo 3 caracteres.</small></div>
        <div className="field"><label htmlFor="description">Descripción</label><textarea id="description" name="description" rows={4} placeholder="Ej. No puedo acceder al correo" disabled={isPending} /><small>Mínimo 10 caracteres.</small></div>
        <div className="field"><label htmlFor="priority">Prioridad</label><select id="priority" name="priority" defaultValue="" disabled={isPending}><option value="">Selecciona una prioridad</option><option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option></select></div>
        <div className="feedback" aria-live="polite">
          {state.errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
          {state.successMessage && <p>{state.successMessage}</p>}
        </div>
        <button className="button primary" type="submit" disabled={isPending}>
          {isPending ? 'Registrando...' : 'Registrar solicitud'}
        </button>
      </form>
    </section>
  );
}