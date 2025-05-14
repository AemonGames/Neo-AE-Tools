import { JSX } from "solid-js";
import { PresentationLink } from "../components/PresentationSchemes/PresentationSchemes";
import "./home.scss";

export default function HomePage(): JSX.Element {
  const tools = [
    { href: "dynascripter", label: "SquabbleScripter" },
    { href: "monstruct", label: "Monstruct" },
    { href: "taleweaver", label: "TaleWeaver" },
    { href: "questforge", label: "QuestForge" },
    { href: "globlot", label: "Globlot" },
    { href: "battlebrew", label: "BattleBrew" },
    { href: "statstyler", label: "StatStyler" },
    { href: "shopkeep", label: "ShopKeep" },
    { href: "happen", label: "HapN Scripter" },
  ];

  return (
    <div class="homepage container text-center mt-5">
      <h1 class="mb-5">Welcome to AETools</h1>

      <div class="tool-grid d-flex flex-wrap justify-content-center">
        {tools.map((tool, i) => (
            <PresentationLink
                href={tool.href}
                img_src={`/assets/icons/${tool.href}.svg`}
                label={tool.label}
                animate
                delay={i * 100} // 100ms stagger per item
            />
            ))}

      </div>
    </div>
  );
}
