<script lang="ts">
  import { TextArea, Description } from "@shizen-ui/svelte";

  let bio = $state("");
</script>

<div class="flex flex-col gap-1.5 w-full max-w-72">
  <TextArea placeholder="Describe the issue..." bind:value={bio} />
  <Description>
    Characters: {bio.length} / 128
  </Description>
</div>
