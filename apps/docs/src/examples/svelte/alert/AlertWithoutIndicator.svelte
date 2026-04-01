<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm">
  <Alert status="accent">
    <Alert.Content>
      <Alert.Title>Read-only mode enabled</Alert.Title>
      <Alert.Description>
        This project is currently in read-only mode while a migration is in progress.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
