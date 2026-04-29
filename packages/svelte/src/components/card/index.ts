import CardRoot from "./Card.svelte";
import Header from "./compound/Header.svelte";
import Title from "./compound/Title.svelte";
import Description from "./compound/Description.svelte";
import Content from "./compound/Content.svelte";
import Footer from "./compound/Footer.svelte";

export type { CardProps } from "./_internal/card.types.js";

export const Card = Object.assign(CardRoot, {
  Header,
  Title,
  Description,
  Content,
  Footer
});

export { CardRoot };

export default {
  Card
};
