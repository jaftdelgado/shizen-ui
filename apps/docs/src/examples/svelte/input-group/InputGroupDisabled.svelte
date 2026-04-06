<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { CreditCard } from "@assets/icons";

  const cardNumber = "•••• •••• •••• 4242";
</script>

<div class="flex flex-col w-full max-w-64 gap-1.5">
  <Label for="card-number">Card number</Label>
  <InputGroup disabled={true}>
    <InputGroup.Prefix>
      <Icon icon={CreditCard} class="size-4" />
    </InputGroup.Prefix>

    <InputGroup.Input id="card-number" value={cardNumber} class="font-mono" />
  </InputGroup>
  <Description>Card details are locked after payment is confirmed.</Description>
</div>
