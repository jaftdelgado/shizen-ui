<script lang="ts">
  import { InputGroup, Tag, Button } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Code, NavArrowDown, Plus } from "@assets/icons";

  let handoffNote = $state("");
</script>

<div class="flex w-full max-w-86">
  <InputGroup>
    <InputGroup.Prefix class="py-0 px-3 mt-3">
      <Tag size="sm" selectionMode="none">
        {#snippet startContent()}
          <Icon icon={Code} />
        {/snippet}
        index.js
        <Tag.RemoveButton />
      </Tag>
    </InputGroup.Prefix>

    <InputGroup.TextArea
      id="handoff-note"
      rows={3}
      bind:value={handoffNote}
      placeholder="Describe what to build..."
    />

    <InputGroup.Suffix>
      <div class="flex w-full items-center justify-between gap-2">
        <Button variant="outline" class="h-7 px-2.5 text-xs">
          {#snippet startContent()}
            <Icon icon={Plus} class="text-secondary-text -mr-1.5" />
          {/snippet}
          Add files
        </Button>

        <div class="flex items-center gap-1.5">
          <Button variant="outline" class="h-7 px-2.5 text-xs">
            {#snippet endContent()}
              <Icon icon={NavArrowDown} class="text-secondary-text" />
            {/snippet}
            GPT-5.3
          </Button>

          <Button class="h-7 px-2.5 text-xs">Send</Button>
        </div>
      </div>
    </InputGroup.Suffix>
  </InputGroup>
</div>
