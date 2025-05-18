import { createSignal, onCleanup, For, JSX } from 'solid-js';

type ToastType = 'success' | 'danger' | 'info' | 'warning';

interface ToastOptions {
  id?: number;
  message: string;
  type?: ToastType;
  duration?: number; // in ms, 0 = persistent
  icon?: string;     // emoji or Bootstrap icon class
}

let toastIdCounter = 0;

export function useToast() {
  const [toasts, setToasts] = createSignal<ToastOptions[]>([]);

  function showToast(options: ToastOptions) {
    const id = ++toastIdCounter;
    const newToast = { ...options, id };
    setToasts((prev) => [...prev, newToast]);

    if (options.duration !== 0) {
      const timeout = setTimeout(() => dismissToast(id), options.duration || 3000);
      onCleanup(() => clearTimeout(timeout));
    }
  }

  function dismissToast(id: number) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  const ToastComponent = (): JSX.Element => (
    <div
      class="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ 'z-index': 1080 }}
    >
      <For each={toasts()}>
        {(toast) => (
          <div
            class={`toast align-items-center text-white bg-${toast.type ?? 'info'} border-0 show mb-2`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="d-flex">
              <div class="toast-body d-flex align-items-center">
                {toast.icon && <span class="me-2">{toast.icon}</span>}
                {toast.message}
              </div>
              <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                aria-label="Close"
                onClick={() => dismissToast(toast.id!)}
              ></button>
            </div>
          </div>
        )}
      </For>
    </div>
  );

  return { showToast, ToastComponent };
}
