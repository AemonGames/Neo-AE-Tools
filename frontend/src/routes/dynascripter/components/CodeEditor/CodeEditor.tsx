import { createSignal, createResource, createEffect, For, Match, Show, Switch } from "solid-js";
import { createStore } from "solid-js/store";
import { Select } from "@thisbeyond/solid-select";
import { DYNA_CMD } from "../../../../lib/types";
import { serverURL } from "../../../../common";
import CommandFlowMap from "./CommandFlowMap/CommandFlowMap";
import './CodeEditor.scss';

type Command = {
  id: string;
  name: string;
  type: "action" | "condition" | "delay";
  nextCommand?: Command | null;
};

type EventEntry = {
  time: string;
  target: string;
  conditionReference: string;
  conditionValue: string;
  commandTree: Command[];
};

enum Tab {
  Setup,
  Event
}

async function loadFromSpreadsheet() {
  const result = await fetch(`${serverURL}/ss/dyna/cmd`).then(res => res.json()) as DYNA_CMD;
  return result;
}

function createCommand(type: Command["type"]): Command {
  return {
    id: crypto.randomUUID(),
    name: type.charAt(0).toUpperCase() + type.slice(1),
    type,
    nextCommand: null
  };
}

function RenderCommandTree(props: { command: Command; depth?: number }) {
  const [collapsed, setCollapsed] = createSignal(false);
  const depth = props.depth ?? 0;

  const addChainedCommand = (type: Command["type"]) => {
    if (!props.command.nextCommand) {
      props.command.nextCommand = createCommand(type);
    }
  };

  return (
    <div class={`command-node type-${props.command.type}`} style={{ "margin-left": `${depth * 1.5}rem` }}>
      <div class="command-header">
        <button class="collapse-btn" onClick={() => setCollapsed(!collapsed())}>
          {collapsed() ? "▶" : "▼"}
        </button>
        <input
          class="command-input"
          value={props.command.name}
          onInput={(e) => (props.command.name = e.currentTarget.value)}
        />
        <span class="command-type">{props.command.type}</span>
      </div>

      <Show when={!collapsed()}>
        <div class="command-actions">
          <button onClick={() => addChainedCommand("action")}>+ Action</button>
          <button onClick={() => addChainedCommand("condition")}>+ Condition</button>
          <button onClick={() => addChainedCommand("delay")}>+ Delay</button>
        </div>

        <Show when={props.command.nextCommand}>
          <RenderCommandTree command={props.command.nextCommand!} depth={depth + 1} />
        </Show>
      </Show>
    </div>
  );
}

export default function CodeEditor() {
  const [dyna_cmd] = createResource<DYNA_CMD>(loadFromSpreadsheet);
  const [selectedTab, setSelectedTab] = createSignal(Tab.Setup);
  const [setupList, setSetupList] = createStore<string[]>([]);
  const [eventList, setEventList] = createStore<EventEntry[]>([]);

  const addSetupBlock = () => setSetupList([...setupList, ""]);
  const deleteSetupBlock = (i: number) => setSetupList(setupList.filter((_, idx) => idx !== i));

  const addEvent = () => {
    setEventList([...eventList, {
      time: "",
      target: "",
      conditionReference: "",
      conditionValue: "",
      commandTree: [createCommand("action")]
    }]);
  };

  return (
    <div class="code-editor">
      <div class="tab-bar">
        <button class={selectedTab() === Tab.Setup ? "active" : ""} onClick={() => setSelectedTab(Tab.Setup)}>Setup</button>
        <button class={selectedTab() === Tab.Event ? "active" : ""} onClick={() => setSelectedTab(Tab.Event)}>Events</button>
      </div>

      <Show when={dyna_cmd()} fallback={<p>Loading scripting options...</p>}>
        <Switch>
          <Match when={selectedTab() === Tab.Setup}>
            <div class="setup-list">
              <For each={setupList}>
                {(value, i) => (
                  <div class="setup-row">
                    <button class="remove" onClick={() => deleteSetupBlock(i())}>−</button>
                    <Select
                      options={dyna_cmd()!.Toggles.filter(v => !setupList.includes(v))}
                      initialValue={value}
                      onChange={e => setSetupList(i(), e)}
                      placeholder="Select a toggle"
                    />
                  </div>
                )}
              </For>
              <button class="click-button" onClick={addSetupBlock} disabled={setupList.length >= dyna_cmd()!.Toggles.length}>+ Add</button>
            </div>
          </Match>

          <Match when={selectedTab() === Tab.Event}>
            <div class="code-body">
              <div class="flow-sidebar">
                <CommandFlowMap events={eventList} />
              </div>
              <div class="flow-editor">
                <For each={eventList}>
                  {(entry, i) => {
                    const [collapsed, setCollapsed] = createSignal(false);
                    return (
                      <div class="event-block">
                        <div class="event-header">
                          <button onClick={() => setCollapsed(!collapsed())}>
                            {collapsed() ? "▶ Event" : "▼ Event"}
                          </button>
                        </div>

                        <Show when={!collapsed()}>
                          <div class="event-fields">
                            <Select options={dyna_cmd()!.Events.TimeOptions} onChange={e => setEventList(i(), { time: e })} initialValue={entry.time} />
                            <Select options={dyna_cmd()!.Events.TargetOptions} onChange={e => setEventList(i(), { target: e })} initialValue={entry.target} />
                            <Select options={dyna_cmd()!.Events.ConditionReference.map(e => e[0])} onChange={e => setEventList(i(), { conditionReference: e })} initialValue={entry.conditionReference} />
                            <Select options={dyna_cmd()!.Events.ConditionValue} onChange={e => setEventList(i(), { conditionValue: e })} initialValue={entry.conditionValue} />
                          </div>

                          <div class="command-tree">
                            <RenderCommandTree command={entry.commandTree[0]} />
                          </div>
                        </Show>
                      </div>
                    );
                  }}
                </For>
                <button class="click-button" onClick={addEvent}>+ Add Event</button>
              </div>
            </div>
          </Match>
        </Switch>
      </Show>
    </div>
  );
}