<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm rounded-xl border border-separator p-1">
  <ListBox aria-label="Destructive actions" variant="danger">
    <ListBox.Item id="remove-member" textValue="Remove member">
      <ListBox.ItemLabel>Remove member</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="revoke-access" textValue="Revoke API access">
      <ListBox.ItemLabel>Revoke API access</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="delete-project" textValue="Delete project" variant="danger">
      <ListBox.ItemLabel>Delete project</ListBox.ItemLabel>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  </ListBox>
</div>
