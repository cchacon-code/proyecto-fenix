import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import type { ReactNode } from 'react';

type FeedbackType = 'success' | 'error' | 'warning' | 'info';

interface ToastMessage {
  id: string;
  type: FeedbackType;
  title: string;
  message?: string;
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  tone?: 'default' | 'danger';
}

interface FeedbackContextValue {
  notify: (type: FeedbackType, title: string, message?: string) => void;
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

interface PendingConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

const FeedbackContext = createContext<FeedbackContextValue | null>(null);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(null);

  const notify = useCallback((type: FeedbackType, title: string, message?: string): void => {
    const id = crypto.randomUUID();
    setToasts((current) => [...current, { id, type, title, message }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3500);
  }, []);

  const confirm = useCallback((options: ConfirmOptions): Promise<boolean> =>
    new Promise((resolve) => setPendingConfirm({ ...options, resolve })), []);

  const value = useMemo(() => ({ notify, confirm }), [notify, confirm]);

  function closeConfirm(result: boolean): void {
    pendingConfirm?.resolve(result);
    setPendingConfirm(null);
  }

  return (
    <FeedbackContext.Provider value={value}>
      {children}

      <div className="toast-region" aria-live="polite">
        {toasts.map((toast) => (
          <article key={toast.id} className={`toast toast-${toast.type}`}>
            <div>
              <strong>{toast.title}</strong>
              {toast.message && <p>{toast.message}</p>}
            </div>
            <button
              type="button"
              aria-label="Cerrar notificación"
              onClick={() =>
                setToasts((current) => current.filter((item) => item.id !== toast.id))
              }
            >
              ×
            </button>
          </article>
        ))}
      </div>

      {pendingConfirm && (
        <div className="dialog-backdrop" role="presentation">
          <section className="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
            <h2 id="confirm-title">{pendingConfirm.title}</h2>
            <p>{pendingConfirm.message}</p>
            <div className="confirm-actions">
              <button type="button" className="ui-button ui-button-secondary" onClick={() => closeConfirm(false)}>
                {pendingConfirm.cancelText ?? 'Cancelar'}
              </button>
              <button
                type="button"
                className={pendingConfirm.tone === 'danger' ? 'ui-button ui-button-danger' : 'ui-button ui-button-primary'}
                onClick={() => closeConfirm(true)}
              >
                {pendingConfirm.confirmText ?? 'Confirmar'}
              </button>
            </div>
          </section>
        </div>
      )}
    </FeedbackContext.Provider>
  );
}

export function useFeedback(): FeedbackContextValue {
  const context = useContext(FeedbackContext);
  if (!context) throw new Error('useFeedback debe utilizarse dentro de FeedbackProvider.');
  return context;
}
