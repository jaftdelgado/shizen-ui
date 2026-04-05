<script lang="ts">
  import { tagGroupStyles, type TagGroupVariants } from "@shizen-ui/styles";

  let {
    children,
    class: className,
    ...props
  }: TagGroupVariants & {
    children?: any;
    class?: string;
    [key: string]: any;
  } = $props();
</script>

<div class={tag - groupStyles({ ...props, class: className })}>
  {@render children?.()}
</div>
