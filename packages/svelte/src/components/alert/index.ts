import AlertRoot from "./Alert.svelte";
import Indicator from "./compound/Indicator.svelte";
import Content from "./compound/Content.svelte";
import Title from "./compound/Title.svelte";
import Description from "./compound/Description.svelte";
import Actions from "./compound/Actions.svelte";

export type { AlertVariant, AlertStatus } from "../../contexts/internal/index.js";

export const Alert = Object.assign(AlertRoot, {
  Indicator,
  Content,
  Title,
  Description,
  Actions
});

export { AlertRoot };

export default { Alert };
