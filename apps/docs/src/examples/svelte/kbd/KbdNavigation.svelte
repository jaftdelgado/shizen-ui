<script lang="ts">
  import { Kbd, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-2">
  <Description class="text-sm">
    Use
    <Kbd><Kbd.Abbr title="Arrow Up">↑</Kbd.Abbr></Kbd>
    and
    <Kbd><Kbd.Abbr title="Arrow Down">↓</Kbd.Abbr></Kbd>
    to move between options.
  </Description>
  <Description class="text-sm">
    Use
    <Kbd><Kbd.Abbr title="Arrow Left">←</Kbd.Abbr></Kbd>
    and
    <Kbd><Kbd.Abbr title="Arrow Right">→</Kbd.Abbr></Kbd>
    to navigate between columns.
  </Description>
  <Description class="text-sm">
    Press
    <Kbd><Kbd.Content>Enter</Kbd.Content></Kbd>
    to select or
    <Kbd><Kbd.Content>Esc</Kbd.Content></Kbd>
    to dismiss.
  </Description>
</div>
