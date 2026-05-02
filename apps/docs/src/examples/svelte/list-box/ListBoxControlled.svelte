<script lang="ts">
  import { Description, ListBox } from "@shizen-ui/svelte";

  let selectedTeam = $state(new Set<string>(["sales"]));
</script>

<div class="flex w-full max-w-sm flex-col gap-3">
  <div class="rounded-xl border border-separator p-1">
    <ListBox aria-label="Team inbox" bind:selectedKeys={selectedTeam}>
      <ListBox.Item id="sales" textValue="Sales inbox">
        <span>Sales inbox</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="support" textValue="Support inbox">
        <span>Support inbox</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>

      <ListBox.Item id="partnerships" textValue="Partnerships inbox">
        <span>Partnerships inbox</span>
        <ListBox.ItemIndicator />
      </ListBox.Item>
    </ListBox>
  </div>

  <Description>Current inbox: {Array.from(selectedTeam)[0] ?? "none"}</Description>
</div>
