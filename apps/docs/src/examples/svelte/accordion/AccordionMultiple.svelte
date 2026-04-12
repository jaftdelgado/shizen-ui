<script lang="ts">
  import { Accordion, Surface } from "@shizen-ui/svelte";

  import Icon from "@assets/Icon.svelte";
  import { Bell, EyeEmpty, ProfileCircle, WarningTriangle } from "@assets/icons";

  const items = [
    {
      value: "notifications",
      title: "Notification preferences",
      icon: Bell,
      content:
        "Choose how and when you receive alerts for activity, mentions, and system updates across all your connected devices."
    },
    {
      value: "privacy",
      title: "Privacy and visibility",
      icon: EyeEmpty,
      content:
        "Control who can view your profile, activity feed, and contact details. Changes apply immediately across all platforms."
    },
    {
      value: "sessions",
      title: "Active sessions",
      icon: ProfileCircle,
      content:
        "You are currently signed in on 3 devices. Review and revoke access to any session you do not recognize or no longer use."
    },
    {
      value: "danger",
      title: "Delete account",
      icon: WarningTriangle,
      content:
        "Permanently delete your account and all associated data. This action is irreversible and cannot be undone once confirmed."
    }
  ];
</script>

<Surface class="w-full max-w-xs">
  <Accordion expandeMode="multiple">
    {#each items as item}
      <Accordion.Item value={item.value}>
        <Accordion.Heading>
          <Accordion.Trigger>
            <Icon icon={item.icon} class="size-4 shrink-0 text-secondary-text" />
            {item.title}
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            {item.content}
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    {/each}
  </Accordion>
</Surface>
