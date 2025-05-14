import { For } from "solid-js";

export default function CommandFlowMap(props: { events: any[] }) {
  return (
    <div class="flow-map">
      <h4>🧩 Script Flow</h4>
      <ul>
        <For each={props.events}>
          {(event, i) => (
            <li class="flow-map-entry">
              <span class="event-label">Event {i() + 1}:</span>
              <span class="command-label">
                {event.commandTree?.[0]?.name || "— No command —"}
              </span>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
}
