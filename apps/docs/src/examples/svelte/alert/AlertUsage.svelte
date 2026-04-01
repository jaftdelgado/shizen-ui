<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm">
  <Alert status="warning">
    <Alert.Indicator />
    <Alert.Content>
      <Alert.Title>Upcoming maintenance window</Alert.Title>
      <Alert.Description>
        Scheduled maintenance starts tonight at 11:00 PM UTC and may affect API response times.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
