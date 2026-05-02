<script lang="ts">
  import { Description, ListBox, Separator, Surface } from "@shizen-ui/svelte";
  import Icon from "@assets/Icon.svelte";
  import { PagePlus, EditPencil, Bin } from "@assets/icons";
</script>

<div class="w-full max-w-2xs">
  <Surface class="w-full p-2">
    <ListBox aria-label="File actions" selectionMode="none">
      <ListBox.Section>
        <ListBox.SectionHeader>File actions</ListBox.SectionHeader>
        <ListBox.Item id="new-file" textValue="New file">
          <Icon icon={PagePlus} class="size-4 shrink-0 self-start mt-1 text-secondary-text" />
          <div class="flex flex-col ml-1">
            <ListBox.ItemLabel>New file</ListBox.ItemLabel>
            <Description>Create a new file</Description>
          </div>
        </ListBox.Item>
        <ListBox.Item id="edit-file" textValue="Edit file">
          <Icon icon={EditPencil} class="size-4 shrink-0 self-start mt-1 text-secondary-text" />
          <div class="flex flex-col ml-1">
            <ListBox.ItemLabel>Edit file</ListBox.ItemLabel>
            <Description>Make changes</Description>
          </div>
        </ListBox.Item>
      </ListBox.Section>

      <Separator class="my-2" />

      <ListBox.Section>
        <ListBox.Item id="delete-file" textValue="Delete file" variant="danger">
          <Icon icon={Bin} class="size-4 shrink-0 self-start mt-1 text-danger" />
          <div class="flex flex-col ml-1">
            <ListBox.ItemLabel>Delete file</ListBox.ItemLabel>
            <Description>Move to trash</Description>
          </div>
        </ListBox.Item>
      </ListBox.Section>
    </ListBox>
  </Surface>
</div>
