<script lang="ts">
  import { Surface, Tabs } from "@shizen-ui/svelte";
  import { SunIcon, MoonIcon, MonitorIcon } from "@assets/icons/svelte";

  type ThemeMode = "light" | "dark" | "system";

  const STORAGE_KEY = "shizen-ui-theme";
  const DARK_QUERY = "(prefers-color-scheme: dark)";

  const applyTheme = (mode: ThemeMode) => {
    const isDark = mode === "dark" || (mode === "system" && window.matchMedia(DARK_QUERY).matches);
    document.documentElement.classList.toggle("dark", isDark);
  };

  let themeMode = $state<ThemeMode>("system");
  let initialized = false;

  $effect(() => {
    if (!initialized) {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark" || saved === "system") {
        themeMode = saved;
      }
      initialized = true;
    }

    applyTheme(themeMode);
    localStorage.setItem(STORAGE_KEY, themeMode);
  });

  $effect(() => {
    const media = window.matchMedia(DARK_QUERY);
    const onSystemChange = () => themeMode === "system" && applyTheme("system");
    const onAfterSwap = () => applyTheme(themeMode);

    media.addEventListener("change", onSystemChange);
    document.addEventListener("astro:after-swap", onAfterSwap);

    return () => {
      media.removeEventListener("change", onSystemChange);
      document.removeEventListener("astro:after-swap", onAfterSwap);
    };
  });
</script>

<Tabs bind:value={themeMode}>
  <Tabs.ListContainer>
    <Tabs.List aria-label="Theme mode" iconOnly>
      <Tabs.Tab value="light" aria-label="Light mode">
        <SunIcon />
        <Tabs.Indicator />
      </Tabs.Tab>

      <Tabs.Tab value="dark" aria-label="Dark mode">
        <Tabs.Separator />
        <MoonIcon />
        <Tabs.Indicator />
      </Tabs.Tab>

      <Tabs.Tab value="system" aria-label="System mode">
        <Tabs.Separator />
        <MonitorIcon />
        <Tabs.Indicator />
      </Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>
</Tabs>
