<script lang="ts">
  import { NumberInput, Label, Description } from "@shizen-ui/svelte";

  let usd = $state(99.99);
  let eur = $state(1250.0);
  let percent = $state(0.5);
  let decimal = $state(1234.56);
  let kg = $state(1000);
</script>

<div class="flex flex-col gap-4 w-full max-w-60">
  <div class="flex flex-col gap-1.5">
    <Label for="usd">Price (USD)</Label>
    <NumberInput
      id="usd"
      bind:value={usd}
      min={0}
      formatOptions={{ style: "currency", currency: "USD" }}
    >
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Currency format in USD.</Description>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="eur">Price (EUR)</Label>
    <NumberInput
      id="eur"
      bind:value={eur}
      min={0}
      formatOptions={{ style: "currency", currency: "EUR", currencySign: "accounting" }}
    >
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Currency format in EUR accounting style.</Description>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="percent">Tax Rate</Label>
    <NumberInput
      id="percent"
      bind:value={percent}
      min={0}
      max={1}
      step={0.01}
      formatOptions={{ style: "percent" }}
    >
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Percentage format (0–1 maps to 0%–100%).</Description>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="decimal">Amount</Label>
    <NumberInput
      id="decimal"
      bind:value={decimal}
      min={0}
      formatOptions={{ style: "decimal", minimumFractionDigits: 2, maximumFractionDigits: 2 }}
    >
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Decimal format with 2 fixed decimal places.</Description>
  </div>

  <div class="flex flex-col gap-1.5">
    <Label for="kg">Net Weight</Label>
    <NumberInput
      id="kg"
      bind:value={kg}
      min={0}
      step={50}
      formatOptions={{ style: "unit", unit: "kilogram", unitDisplay: "short" }}
    >
      <NumberInput.DecrementButton />
      <NumberInput.Input />
      <NumberInput.IncrementButton />
    </NumberInput>
    <Description>Unit format in kilograms.</Description>
  </div>
</div>
