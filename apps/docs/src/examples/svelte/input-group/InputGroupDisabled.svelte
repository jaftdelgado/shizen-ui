<script lang="ts">
  import { InputGroup } from "@shizen-ui/svelte";
  import Icon from "@components/svelte/Icon.svelte";

  let value = $state("info@shizen.com");
</script>

<div class="w-full max-w-xs">
  <InputGroup size="md" data-disabled="true">
    <InputGroup.Prefix>
      <Icon name="at" />
    </InputGroup.Prefix>

    <InputGroup.Input value="hola" placeholder="example@mail.com" />

    <InputGroup.Suffix>
      <span class="text-xs font-mono uppercase opacity-50">Locked</span>
    </InputGroup.Suffix>
  </InputGroup>
</div>
