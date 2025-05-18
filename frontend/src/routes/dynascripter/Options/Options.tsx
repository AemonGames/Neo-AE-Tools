import { For, JSX, createSignal } from 'solid-js';
import { languages, setLanguage } from '../../../common';
import { ClearData } from '../data';
import Modal from 'bootstrap/js/dist/modal';
import { useToast } from '../../../components/ToastNotification'; // adjust path if needed
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Options(): JSX.Element {
  const [modalMessage, setModalMessage] = createSignal('');
  const [submitFunction, setSubmitFunction] = createSignal<() => void>(() => {});
  const { showToast, ToastComponent } = useToast();

  let modalRef: HTMLDivElement | undefined;

  function DisplayConfirmation(msg: string, func: () => void): void {
    setModalMessage(msg);
    setSubmitFunction(() => func);

    if (modalRef) {
      const modal = new Modal(modalRef);
      modal.show();
    }
  }

  function RunSubmitFunction(): void {
    submitFunction()();
    showToast({ message: 'Action completed successfully!', type: 'success' });
    CancelSubmitFunction();
  }

  function CancelSubmitFunction(): void {
    setSubmitFunction(() => () => {});
  }

  return (
    <div class="container py-4">
      <h1 class="mb-4">Options</h1>

      <div class="row g-4">
        <div class="col-md-4">
          <div class="card p-3">
            <h5 class="card-title">Language</h5>
            <For each={languages}>
              {(value) => (
                <button class="btn btn-outline-primary m-1" onClick={() => setLanguage(value)}>
                  {value}
                </button>
              )}
            </For>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-3">
            <h5 class="card-title">Themes</h5>
            <button class="btn btn-dark m-1" onClick={() => showToast({ message: 'Dark mode coming soon', type: 'info' })}>
              Dark Mode
            </button>
            <button class="btn btn-light m-1" onClick={() => showToast({ message: 'Light mode hurts!', type: 'warning' })}>
              Light Mode
            </button>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card p-3">
            <h5 class="card-title">Data</h5>
            <button
              class="btn btn-danger m-1"
              onClick={() => DisplayConfirmation('Are you sure you want to clear all data?', ClearData)}
            >
              Clear Data?
            </button>
            <button class="btn btn-success m-1" onClick={() => window.print()}>
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        class="modal fade"
        id="confirmationModal"
        tabIndex={-1}
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="confirmationModalLabel">
                Confirmation
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={CancelSubmitFunction}
              ></button>
            </div>
            <div class="modal-body">
              <p>{modalMessage()}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={CancelSubmitFunction}>
                No Way!
              </button>
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={RunSubmitFunction}>
                OK!
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastComponent />
    </div>
  );
}
