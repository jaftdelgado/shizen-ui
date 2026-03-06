<script lang="ts">
  import { Switch, Label, Description } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";

  let sound = $state(false);
</script>

<Switch bind:checked={sound}>
  <Switch.Control>
    <Switch.Thumb>
      <div style="display:flex;color: {sound ? 'var(--accent)' : 'var(--secondary-text)'};">
        <Icon name={sound ? "volume_fill" : "volume_slash_fill"} size={10} />
      </div>
    </Switch.Thumb>
  </Switch.Control>
  <Switch.Content>
    <Label>{sound ? "Enable sound" : "Disable sound"}</Label>
    <Description>Toggle the audio playback state.</Description>
  </Switch.Content>
</Switch>
