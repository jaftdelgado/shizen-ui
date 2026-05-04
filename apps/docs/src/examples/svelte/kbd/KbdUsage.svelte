<script lang="ts">
  import { Kbd, Description } from "@shizen-ui/svelte";
</script>

<div class="flex flex-col gap-3">
  <Description class="text-sm">
    Open command palette with
    <Kbd>
      <Kbd.Abbr title="Command">⌘</Kbd.Abbr>
      <Kbd.Content>K</Kbd.Content>
    </Kbd>
  </Description>
  <Description class="text-sm">
    Save your file using
    <Kbd>
      <Kbd.Abbr title="Command">⌘</Kbd.Abbr>
      <Kbd.Content>S</Kbd.Content>
    </Kbd>
  </Description>
  <Description class="text-sm">
    Press
    <Kbd>
      <Kbd.Content>Esc</Kbd.Content>
    </Kbd>
    to close the dialog.
  </Description>
  <Description class="text-sm">
    Navigate with
    <Kbd>
      <Kbd.Abbr title="Arrow Up">↑</Kbd.Abbr>
    </Kbd>
    and
    <Kbd>
      <Kbd.Abbr title="Arrow Down">↓</Kbd.Abbr>
    </Kbd>
    arrow keys.
  </Description>
</div>
