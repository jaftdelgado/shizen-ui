import SwitchGroupRoot from "./SwitchGroup.svelte";
import Items from "./compound/Items.svelte";

export type { SwitchGroupOrientation } from "./switch-group.context";

export const SwitchGroup = Object.assign(SwitchGroupRoot, {
  Items
});

export { SwitchGroupRoot };

export default SwitchGroup;
