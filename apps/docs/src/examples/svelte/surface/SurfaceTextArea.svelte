<script lang="ts">
  import { Surface, TextArea, Label } from "@shizen-ui/svelte";
</script>

<Surface class="p-6 w-full max-w-xs">
  <div class="flex flex-col w-full gap-1.5">
    <Label for="about">About You</Label>
    <TextArea id="about" placeholder="Tell us about yourself..." />
  </div>
</Surface>
