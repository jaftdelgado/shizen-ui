<script lang="ts">
  import { InputGroup, Label, Description } from "@shizen-ui/svelte";
  import { CreditCardIcon } from "@assets/icons/svelte";

  const cardNumber = "•••• •••• •••• 4242";
</script>

<div class="flex flex-col w-full max-w-64 gap-1.5">
  <Label for="card-number">Card number</Label>
  <InputGroup disabled={true}>
    <InputGroup.Prefix>
      <CreditCardIcon class="size-4" />
    </InputGroup.Prefix>

    <InputGroup.Input id="card-number" value={cardNumber} class="font-mono" />
  </InputGroup>
  <Description>Card details are locked after payment is confirmed.</Description>
</div>
