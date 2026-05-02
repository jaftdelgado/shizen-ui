<script lang="ts">
  import { Description, ListBox, Surface } from "@shizen-ui/svelte";

  let selectedTeam = $state(new Set<string>(["sales"]));

  const teams = [
    { id: "sales", label: "Sales inbox" },
    { id: "support", label: "Support inbox" },
    { id: "partnerships", label: "Partnerships inbox" }
  ];
</script>

<div class="flex w-full max-w-2xs flex-col gap-6">
  <Surface class="w-full p-2">
    <ListBox aria-label="Team inbox" bind:selectedKeys={selectedTeam}>
      {#each teams as team (team.id)}
        <ListBox.Item id={team.id} textValue={team.label}>
          <ListBox.ItemLabel>{team.label}</ListBox.ItemLabel>
          <ListBox.ItemIndicator />
        </ListBox.Item>
      {/each}
    </ListBox>
  </Surface>

  <Description>
    Current inbox: {Array.from(selectedTeam)[0] ?? "none"}
  </Description>
</div>
