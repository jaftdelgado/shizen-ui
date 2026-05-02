<script lang="ts">
  import { ListBox } from "@shizen-ui/svelte";

  const check = "M6 10l2 2 4-5";
</script>

<div class="w-full max-w-sm rounded-xl border border-separator p-1">
  <ListBox aria-label="Notification channel" selectedKeys={new Set(["email"])}>
    <ListBox.Item id="email" textValue="Email">
      <span>Email</span>
      <ListBox.ItemIndicator>
        {#snippet children({ isSelected }: { isSelected: boolean })}
          {#if isSelected}
            <svg viewBox="0 0 16 16" class="size-4" aria-hidden="true">
              <path
                d={check}
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          {/if}
        {/snippet}
      </ListBox.ItemIndicator>
    </ListBox.Item>

    <ListBox.Item id="push" textValue="Push">
      <span>Push</span>
      <ListBox.ItemIndicator>
        {#snippet children({ isSelected }: { isSelected: boolean })}
          {#if isSelected}
            <span class="text-xs font-semibold">ON</span>
          {/if}
        {/snippet}
      </ListBox.ItemIndicator>
    </ListBox.Item>

    <ListBox.Item id="slack" textValue="Slack">
      <span>Slack</span>
      <ListBox.ItemIndicator>
        {#snippet children({ isSelected }: { isSelected: boolean })}
          {#if isSelected}
            <span class="text-xs font-semibold">OK</span>
          {/if}
        {/snippet}
      </ListBox.ItemIndicator>
    </ListBox.Item>
  </ListBox>
</div>
