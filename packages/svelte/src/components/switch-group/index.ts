import SwitchGroupRoot from "./SwitchGroup.svelte";
import Items from "./compound/Items.svelte";

export type { SwitchGroupOrientation } from "../../contexts/internal/index.js";

export const SwitchGroup = Object.assign(SwitchGroupRoot, {
  Items
});

export { SwitchGroupRoot };

export default SwitchGroup;
