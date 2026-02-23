<script lang="ts">
  import { TextField, Label, TextArea } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-6 w-full max-w-sm">
  <TextField>
    <Label>Short Bio (3 rows)</Label>
    <TextArea rows={3} placeholder="Three rows of text..." />
  </TextField>

  <TextField>
    <Label>Long Story (6 rows)</Label>
    <TextArea rows={6} placeholder="Six rows of text..." />
  </TextField>
</div>
