<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";

  let isSubscribed = $state(false);
</script>

<div class="flex flex-col gap-4">
  <Checkbox bind:checked={isSubscribed}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Newsletter</Label>
      <Description>Receive the latest updates and product news.</Description>
    </Checkbox.Content>
  </Checkbox>

  <Description>
    Controlled state: {isSubscribed}
  </Description>
</div>
