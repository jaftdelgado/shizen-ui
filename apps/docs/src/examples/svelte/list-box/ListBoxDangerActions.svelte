<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-sm rounded-xl border border-separator p-1">
  <ListBox aria-label="Destructive actions" variant="danger">
    <ListBox.Item id="remove-member" textValue="Remove member">
      <span>Remove member</span>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="revoke-access" textValue="Revoke API access">
      <span>Revoke API access</span>
      <ListBox.ItemIndicator />
    </ListBox.Item>

    <ListBox.Item id="delete-project" textValue="Delete project" variant="danger">
      <span>Delete project</span>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  </ListBox>
</div>
