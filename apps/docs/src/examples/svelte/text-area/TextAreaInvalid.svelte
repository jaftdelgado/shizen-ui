<script lang="ts">
  import { TextField, Label, TextArea, Description, FieldError } from "@shizen-ui/svelte";
</script>

<div class="flex items-center w-full max-w-sm">
  <TextField invalid>
    <Label>Comments</Label>
    <TextArea placeholder="Enter your comments" value="Too short" />
    <Description>Minimun 20 characters.</Description>
    <FieldError>The comment must be at least 20 characters long.</FieldError>
  </TextField>
</div>
