<script lang="ts">
  import { ScrollArea, Surface } from "@shizen-ui/svelte";

  const works = [
    {
      artist: "O. Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "T. Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80"
    },
    {
      artist: "V. Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80"
    }
  ];
</script>

<Surface class="w-64 md:w-80 flex flex-col">
  <p class="p-4 text-sm font-medium">Artwork</p>
  <ScrollArea orientation="horizontal">
    <div class="flex w-max gap-4 px-4 pb-3">
      {#each works as { artist, art }}
        <figure class="shrink-0">
          <div class="overflow-hidden rounded-lg">
            <img src={art} alt="Photo by {artist}" class="aspect-3/4 w-32 object-cover" />
          </div>
          <figcaption class="pt-2 text-xs text-secondary-text">
            Photo by <span class="font-medium text-primary-text">{artist}</span>
          </figcaption>
        </figure>
      {/each}
    </div>
  </ScrollArea>
</Surface>
