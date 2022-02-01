<script>
  import { toReal } from "../util";
  export let item;
  export let removeItem;
</script>

<div class="flex flex-col space-x-1">
  <div class="flex-1 flex items-center">
    {item.title}
  </div>
  <div class="flex justify-end">
    <div class="flex items-center">
      {toReal(item.value)}
    </div>
    <button
      on:click={() => {
        removeItem();
      }}
      class="p-2">🗑</button
    >
  </div>
</div>
