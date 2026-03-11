<script lang="ts">
  import { InputGroup, Label, FieldError } from "@shizen-ui/svelte";
  import { CircleXMark } from "@assets/icons/svelte";
</script>

<div class="flex flex-col w-full max-w-64 gap-1.5">
  <Label for="promo-code">Promo code</Label>
  <InputGroup invalid={true}>
    <InputGroup.Input id="promo-code" value="SAVE50XYZ" placeholder="Enter promo code" />

    <InputGroup.Suffix>
      <CircleXMark class="text-danger" />
    </InputGroup.Suffix>
  </InputGroup>
  <FieldError>This code has expired or is no longer valid.</FieldError>
</div>
