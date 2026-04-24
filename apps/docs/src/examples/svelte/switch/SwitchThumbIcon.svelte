<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { SoundHighSolid, SoundOffSolid } from "@assets/icons";

  let sound = $state(false);
</script>

<Switch bind:checked={sound}>
  <Switch.Control>
    <Switch.Thumb>
      <div style="display:flex;color: {sound ? 'var(--accent)' : 'var(--tertiary-text)'};">
        <Icon icon={sound ? SoundHighSolid : SoundOffSolid} class="size-2.5 items-center" />
      </div>
    </Switch.Thumb>
  </Switch.Control>
  <Switch.Content>
    <Label>{sound ? "Enabled sound" : "Disabled sound"}</Label>
    <Description>Toggle the audio playback state.</Description>
  </Switch.Content>
</Switch>
