import { createSignal, onCleanup, onMount } from "solid-js";
import { Modal, Button } from "solid-bootstrap";
import { createPopper } from "@popperjs/core";

export default function Manual() {
  const [showTooltip, setShowTooltip] = createSignal(false);
  const [showModal, setShowModal] = createSignal(false);
  const [isTouch, setIsTouch] = createSignal(false);

  let reference: HTMLButtonElement | undefined;
  let tooltip: HTMLDivElement | undefined;
  let popperInstance: any;
  let timeout: any;

  onMount(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (reference && tooltip) {
      popperInstance = createPopper(reference, tooltip, {
        placement: "top",
        modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
      });
    }

    document.addEventListener("click", handleGlobalClick);
  });

  onCleanup(() => {
    popperInstance?.destroy();
    document.removeEventListener("click", handleGlobalClick);
    clearTimeout(timeout);
  });

  const handleGlobalClick = (e: MouseEvent) => {
    if (
      tooltip &&
      !tooltip.contains(e.target as Node) &&
      !reference?.contains(e.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  const handleTapOrHover = () => {
    setShowTooltip(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <>
      <Button
        ref={reference}
        variant="outline-info"
        onClick={() => {
          if (isTouch()) handleTapOrHover();
          else setShowModal(true);
        }}
        onMouseEnter={() => !isTouch() && setShowTooltip(true)}
        onMouseLeave={() => !isTouch() && setShowTooltip(false)}
      >
        ⓘ Manual
      </Button>

      <div
        ref={tooltip}
        class={`manual-tooltip ${showTooltip() ? "visible" : ""}`}
        role="tooltip"
      >
        Tap or hover to preview scripting tips. Click to open full guide.
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>

      <Modal show={showModal()} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Script Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src="https://your-manual-url.com"
            title="Script Manual"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
