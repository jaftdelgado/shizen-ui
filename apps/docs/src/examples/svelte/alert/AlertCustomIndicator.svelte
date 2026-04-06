<script lang="ts">
  import { Alert } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { CloudCheck } from "@assets/icons";
</script>

<div class="w-full max-w-sm">
  <Alert status="success">
    <Alert.Indicator>
      <Icon icon={CloudCheck} class="size-4" />
    </Alert.Indicator>
    <Alert.Content>
      <Alert.Title>Cloud backup completed</Alert.Title>
      <Alert.Description>
        Your project was backed up to cloud storage and is now securely archived.
      </Alert.Description>
    </Alert.Content>
  </Alert>
</div>
