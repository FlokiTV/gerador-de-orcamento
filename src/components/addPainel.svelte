<script lang="ts">
  let itemName: string;
  let itemValue: string;
  export let addItem: any;
</script>

<textarea
  bind:value={itemName}
  class="flex-1 border border-gray-500 rounded outline-blue-500 p-2"
  placeholder="etapa"
/>
<div class="flex space-x-1">
  <input
    bind:value={itemValue}
    type="number"
    placeholder="valor"
    class="border flex-1 border-gray-500 outline-blue-500 p-2 rounded"
  />
  {#if itemName && itemValue}
    <button
      on:click={() => {
        addItem(itemName, itemValue);
        itemName = undefined;
        itemValue = undefined;
      }}
      class="bg-blue-500 hover:bg-blue-700 transition-all p-2 px-4 rounded text-white font-bold text-xl"
      >+</button
    >
  {:else}
    <button
      disabled
      class="bg-blue-500 disabled:bg-gray-500 hover:bg-blue-700 transition-all p-2 px-4 rounded text-white font-bold text-xl"
      >+</button
    >
  {/if}
</div>
