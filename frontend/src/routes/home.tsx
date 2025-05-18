import { JSX, For } from "solid-js";
import { PresentationLink } from "../components/PresentationSchemes/PresentationSchemes";
import { toolConfig } from "../toolConfig";
import "./home.scss";

export default function HomePage(): JSX.Element {
  return (
    <div class="homepage container text-center mt-5">
      <div class="tool-grid row justify-content-center text-white">
        <For each={Object.entries(toolConfig)}>
          {([key, config], i) => (
            <div class="col" style={{ '--delay': `${i() * 100}ms` }}>
              <PresentationLink
                href={key}
                img_src={config.icon}
                label={config.name}
                animate
                delay={i() * 100}
              />
            </div>
          )}
        </For>
      </div>
    </div>
  );
}