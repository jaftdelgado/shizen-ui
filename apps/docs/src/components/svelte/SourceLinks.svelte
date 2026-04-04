<script lang="ts">
  import { Button } from "@shizen-ui/svelte";
  import { CodeBracketsIcon, GithubIcon } from "@assets/icons/svelte";

  interface Props {
    svelteUrl: string;
    stylesUrl: string;
  }

  let { svelteUrl, stylesUrl }: Props = $props();

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
</script>

<div class="flex flex-wrap gap-2 my-6">
  <Button variant="tertiary" onclick={() => openLink(svelteUrl)}>
    {#snippet startContent()}
      <GithubIcon class="size-4" />
    {/snippet}
    Source
  </Button>

  <Button variant="tertiary" onclick={() => openLink(stylesUrl)}>
    {#snippet startContent()}
      <CodeBracketsIcon class="size-4" />
    {/snippet}
    Styles source
  </Button>
</div>
