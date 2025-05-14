import { createSignal, Match, Show, Switch } from "solid-js";
import ScriptConfigPanel from "../components/FormEditor/ScriptConfigPanel";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import Manual from "../components/Manual";
import { Modal, Button } from "solid-bootstrap";
import "./ScriptEditor.scss";

import { EditorInit } from "./EditorInit";

interface ScriptEditorProps {
  data: EditorInit;
}

export default function ScriptEditor({ data }: ScriptEditorProps) {
  const apiUrl = import.meta.env.VITE_BACKEND_SERVER_URL;
  const [showConfig, setShowConfig] = createSignal(true);
  const [showManualModal, setShowManualModal] = createSignal(false);
  const [showTooltip, setShowTooltip] = createSignal(false);

  const toggleConfigVisible = () => setConfigVisible(!configVisible());

  const returnToSelector = () => window.location.assign("..");
  const [configVisible, setConfigVisible] = createSignal(true);


  return (

    <div class="scripter-layout">
  <div class="top-bar">
    {/* File menus, user icons, etc. */}
    <div class="menu-bar">
          <button onClick={() => setShowConfig(!showConfig())}>☰</button>
          <span>File ▾</span>
          <span>Edit ▾</span>
          <span>View ▾</span>
          <span>⚙ Settings ▾</span>
        </div>
        <div class="active-users">
          <span class="user-badge active">🟢 John</span>
          <span class="user-badge editing">🔴 Maria</span>
        </div>
  </div>

  <div class="editor-body">
    <div class="config-area">
      <ScriptConfigPanel back={returnToSelector} />
    </div>

    <div class="code-area">
      <CodeEditor />
    </div>
  </div>

  <div class="utility-bar">
    <div
          class="tooltip-target"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          ⓘ Manual
          <Show when={showTooltip()}>
            <div class="manual-tooltip">Use `if` to branch based on conditions.</div>
          </Show>
        </div>
        <Button variant="info" onClick={() => setShowManualModal(true)}>🔍 Full Manual</Button>
  </div>



      <Modal show={showManualModal()} onHide={() => setShowManualModal(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Script Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Manual />
        </Modal.Body>
      </Modal>

  
</div>



  );
}
