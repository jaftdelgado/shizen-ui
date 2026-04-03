<script lang="ts">
  import { Alert, Button } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm">
  <Alert status="danger">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Network Error</Alert.Title>
      <Alert.Description>Check your network settings and try again.</Alert.Description>
      <Alert.Actions>
        <Button size="sm" variant="secondary">Retry</Button>
      </Alert.Actions>
    </Alert.Content>
  </Alert>
</div>
