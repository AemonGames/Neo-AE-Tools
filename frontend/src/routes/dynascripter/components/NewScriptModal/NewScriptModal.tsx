// NewScriptModal.tsx
import { createSignal, createEffect, JSX } from "solid-js";
import { Modal, Button } from "solid-bootstrap";
import { animate } from "animejs";

// Example template component
import DynaTemplate_Move from "./Templates/DynaTemplate_Move";

type Props = {
  onClose: () => void;
};

export function NewScriptModal(props: Props): JSX.Element {
  const [show, setShow] = createSignal(true);
  const [templateType, setTemplateType] = createSignal("");

  const closeModal = () => {
    setShow(false);
    setTimeout(() => {
      setTemplateType("");
      props.onClose();
    }, 300);
  };

  // Animate template content when templateType changes
  createEffect(() => {
    if (templateType()) {
      requestAnimationFrame(() => {
        animate(".template-fade", {
          opacity: [0, 1],
          translateY: [10, 0],
          duration: 400,
          easing: "easeOutCubic",
        });
      });
    }
  });

  const templates: {
    name: string;
    icon: string;
    component: () => JSX.Element;
  }[] = [
    { name: "Move", icon: "", component: () => <DynaTemplate_Move /> },
    // Add other templates as needed
  ];

  const selectedTemplate = () =>
    templates.find((t) => t.name === templateType());

  return (
    <Modal
      show={show()}
      onHide={closeModal}
      centered
      backdrop="static"
      dialogClassName="custom-template-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{templateType() || "Select a Template"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div class="template-fade">
          {selectedTemplate()?.component() || (
            <div>
              {/* Render template selection buttons */}
              {templates.map((t) => (
                <Button
                  variant="outline-primary"
                  class="m-2"
                  onClick={() => setTemplateType(t.name)}
                >
                  {t.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
