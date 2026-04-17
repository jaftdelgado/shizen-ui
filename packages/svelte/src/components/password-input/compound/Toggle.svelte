<script lang="ts">
  import { usePasswordInputContext } from "../../../contexts/internal/index.js";
  import { EyeIcon, EyeSlashIcon } from "../../../shared/icons/index.js";
  import { Toggle } from "../../toggle";

  const ctx = usePasswordInputContext();
</script>

<Toggle
  pressed={ctx.visible}
  onPressedChange={() => ctx.toggle()}
  disabled={ctx.disabled}
  aria-label={ctx.visible ? "Ocultar contraseña" : "Mostrar contraseña"}
  iconOnly
  size="sm"
  variant="ghost"
  class="password-input__toggle"
>
  {#if ctx.visible}
    <EyeSlashIcon />
  {:else}
    <EyeIcon />
  {/if}
</Toggle>
