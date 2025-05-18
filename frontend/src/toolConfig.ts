// toolConfig.ts
export const toolConfig = {
  dynascripter: { name: "SquabbleScripter", icon: "/assets/icons/dynascripter.svg", version: "0.2.1", color: "rebeccapurple" },
  monstruct:     { name: "Monstruct", icon: "/assets/icons/monstruct.svg", version: "1.4.3", color: "#335599" },
  taleweaver:    { name: "TaleWeaver", icon: "/assets/icons/taleweaver.svg", version: "0.1.9", color: "#552266" },
  questforge:    { name: "QuestForge", icon: "/assets/icons/questforge.svg", version: "0.1.4", color: "#336633" },
  globlot:       { name: "Globlot", icon: "/assets/icons/globlot.svg", version: "0.9.1", color: "#aa3344" },
  battlebrew:    { name: "BattleBrew", icon: "/assets/icons/battlebrew.svg", version: "0.3.7", color: "#663399" },
  statstyler:    { name: "StatStyler", icon: "/assets/icons/statstyler.svg", version: "1.1.2", color: "#003366" },
  shopkeep:      { name: "ShopKeep", icon: "/assets/icons/shopkeep.svg", version: "0.2.0", color: "#996600" },
  happen:        { name: "HapN Scripter", icon: "/assets/icons/happen.svg", version: "0.8.8", color: "#990099" }
} as const;

export type ToolKey = keyof typeof toolConfig;
