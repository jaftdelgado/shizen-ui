<script lang="ts">
  import { Checkbox, Label, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col">
  <Checkbox disabled={true}>
    <Checkbox.Control />
    <Checkbox.Content>
      <Label>Early Access Program</Label>
      <Description>Beta features require a Pro subscription.</Description>
    </Checkbox.Content>
  </Checkbox>
</div>
