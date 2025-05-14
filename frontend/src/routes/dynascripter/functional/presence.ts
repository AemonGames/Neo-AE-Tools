import { createStore } from "solid-js/store";

export type User = {
  id: string;
  name: string;
  status: "active" | "editing";
};

const [users, setUsers] = createStore<User[]>([]);

let lastActivity = Date.now();
let idleTimeout: ReturnType<typeof setTimeout> | null = null;
const IDLE_TIME = 60000; // 1 minute


function updateActivity() {
  lastActivity = Date.now();
  if (idleTimeout) clearTimeout(idleTimeout);

  ws.send(JSON.stringify({
    type: "update",
    user: { id: "123", name: "You", status: "editing" }
  }));

  idleTimeout = setTimeout(() => {
    ws.send(JSON.stringify({
      type: "update",
      user: { id: "123", name: "You", status: "active" }
    }));
  }, IDLE_TIME);
}

// Bind activity events
["mousemove", "keydown", "click", "touchstart"].forEach(event =>
  window.addEventListener(event, updateActivity)
);


const ws = new WebSocket(`wss://${location.host}/ws/presence/`);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  switch (data.type) {
    case "join":
      setUsers([...users, data.user]);
      break;

    case "leave":
      setUsers(users.filter((u) => u.id !== data.user.id));
      break;

    case "update":
      const i = users.findIndex((u) => u.id === data.user.id);
      if (i !== -1) {
        setUsers(i, "status", data.user.status);
      }
      break;

    default:
      console.warn("Unknown presence message:", data);
  }
};

ws.onopen = () => {
  ws.send(JSON.stringify({ type: "join", user: { id: "123", name: "You", status: "active" } }));
};

export { users };
