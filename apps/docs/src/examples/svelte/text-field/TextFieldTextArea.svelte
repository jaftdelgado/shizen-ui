<script lang="ts">
  import { TextField, Label, TextArea, Description } from "@shizen-ui/svelte";
</script>

<TextField class="w-full max-w-64">
  <Label>Project Notes</Label>
  <TextArea placeholder="Write your highlights..." />
  <Description>Minimum 20 characters.</Description>
</TextField>
