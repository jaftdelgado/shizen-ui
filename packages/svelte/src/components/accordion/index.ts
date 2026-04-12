import AccordionRoot from "./Accordion.svelte";
import Item from "./compound/Item.svelte";
import Heading from "./compound/Heading.svelte";
import Trigger from "./compound/Trigger.svelte";
import Indicator from "./compound/Indicator.svelte";
import Panel from "./compound/Panel.svelte";
import Body from "./compound/Body.svelte";

export type {
  AccordionType,
  AccordionVariant,
  AccordionContextValue,
  AccordionContextResult,
  AccordionItemContextValue,
  AccordionItemContextResult
} from "../../contexts/internal/index.js";

export {
  setAccordionContext,
  useAccordionContext,
  setAccordionItemContext,
  useAccordionItemContext
} from "../../contexts/internal/index.js";

export const Accordion = Object.assign(AccordionRoot, {
  Item,
  Heading,
  Trigger,
  Indicator,
  Panel,
  Body
});

export { AccordionRoot };

export default {
  Accordion
};
