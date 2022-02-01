<script lang="ts">
  import { toReal } from "../util";
  import Modal from "../components/modal.svelte";
  import ItemList from "../components/itemList.svelte";
  import AddPainel from "../components/addPainel.svelte";
  interface Item {
    title: string;
    value: number;
  }
  let items: Item[] = [];
  let total: number = 0;
  let openModal: boolean;
  const addItem = (itemName, itemValue) => {
    items = [...items, { title: itemName, value: itemValue }];
    setTotal();
  };
  const removeItem = (i) => {
    delete items[i];
    items = items.filter((e) => {
      return e;
    });
    setTotal();
  };
  const setTotal = () => {
    let count = 0;
    items.forEach((e) => (count += e.value));
    total = count;
  };
  const closeModal = () => {
    openModal = false;
  };
</script>

<div class="main mx-auto w-full flex flex-col p-2 space-y-1">
  <h1 class="text-lg font-semibold">Proposta orçamentária</h1>
  <AddPainel {addItem} />
  <hr />
  <div class="flex flex-col space-y-1">
    {#if items.length}
      {#each items as item, i (i)}
        <ItemList {item} removeItem={() => removeItem(i)} />
      {/each}
    {/if}
  </div>
  <hr />
  <div class="flex justify-end">
    Valor de mão de obra {toReal(total)}
  </div>
  {#if items.length}
    <button
      on:click={() => {
        openModal = true;
      }}
      class="bg-green-500 text-white flex-1 p-2 uppercase font-bold rounded"
      >visualizar</button
    >
  {/if}
</div>
<Modal {items} {total} {openModal} {closeModal} />
