<script lang="ts">
  import { Button, Card } from "@shizen-ui/svelte";
</script>

<div class="w-full max-w-xs">
  <Card class="w-full">
    <Card.Header>
      <Card.Title>Backup storage</Card.Title>
      <Card.Description>25.8 GB remaining of your 100 GB limit.</Card.Description>
    </Card.Header>

    <Card.Content>
      <div class="flex items-end justify-between gap-4 mt-2">
        <div>
          <p class="text-sm text-secondary-text">Storage used</p>
          <p class="mt-1 text-2xl font-semibold tracking-[-0.04em] text-primary-text">74.2 GB</p>
        </div>
      </div>
      <div class="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-tertiary-text/20">
        <div class="h-full w-[74%] rounded-full bg-warning"></div>
      </div>
    </Card.Content>

    <Card.Footer class="flex items-center justify-end gap-3 mt-2">
      <Button variant="outline">View backups</Button>
      <Button>Upgrade</Button>
    </Card.Footer>
  </Card>
</div>
