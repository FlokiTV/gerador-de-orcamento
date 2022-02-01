<script lang="ts">
  interface Item {
    title: string;
    value: number;
  }
  let wppNumber: number;
  let items: Item[] = [];
  let itemName: string;
  let itemValue: number;
  let total: number = 0;
  let openModal: boolean;
  const addItem = () => {
    items = [...items, { title: itemName, value: itemValue }];
    itemName = undefined;
    itemValue = undefined;
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
  const toReal = (value) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "brl",
    });
  };
  const genLink = (num, text) => {
    return `https://api.whatsapp.com/send?phone=${num}&text=${text.replace(
      /(?:\r\n|\r|\n)/g,
      "%0A"
    )}`;
  };
  const genText = () => {
    let txt = `*Proposta orçamentária*\n`;
    items.forEach((e) => {
      txt += `\n- ${e.title}`;
    });
    txt += `\n\n *Valor de mão de obra*: ${toReal(total)}`;
    return txt;
  };
</script>

<div class="main mx-auto w-full flex flex-col p-2 space-y-1">
  <h1 class="text-lg font-semibold">Proposta orçamentária</h1>
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
        on:click={addItem}
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
  <hr />
  <div class="flex flex-col space-y-1">
    {#if items.length}
      {#each items as item, i (i)}
        <div class="flex flex-col space-x-1">
          <div class="flex-1 flex items-center">
            {item.title}
          </div>
          <div class="flex justify-end">
            <div class="flex items-center">
              {toReal(item.value)}
            </div>
            <button on:click={removeItem(i)} class="p-2">🗑</button>
          </div>
        </div>
      {/each}
    {/if}
  </div>
  <hr />
  <div class="flex justify-end">
    Valor de mão de obra {toReal(total)}
  </div>
  <button
    on:click={() => {
      openModal = true;
    }}
    class="bg-green-500 text-white flex-1 p-2 uppercase font-bold rounded"
    >visualizar</button
  >
</div>
<!-- modal -->
{#if openModal}
  <div class="fixed left-0 right-0 bottom-0 top-0 p-4 bg-black bg-opacity-80">
    <div
      class="main bg-white h-full mx-auto rounded relative p-2 overflow-auto"
    >
      <button
        class="bg-red-500 absolute right-1 top-1 text-sm text-white rounded w-5 h-5 flex items-center justify-center"
        on:click={() => {
          openModal = false;
        }}>x</button
      >
      <h1 class="text-lg font-semibold mb-2">Proposta orçamentária</h1>
      <div class="flex flex-col space-y-1">
        {#if items.length}
          {#each items as item, i (i)}
            <div class="flex flex-col space-x-1">
              <div class="flex-1 flex items-center">
                - {item.title}
              </div>
            </div>
          {/each}
          <br />
          <hr />
          <div class="flex justify-end">
            Valor de mão de obra {toReal(total)}
          </div>
          <br />
          <input
            type="number"
            placeholder="whatsapp"
            class="border flex-1 border-gray-500 outline-blue-500 p-2 rounded"
            bind:value={wppNumber}
          />
          {#if wppNumber}
            <a
              href={genLink("55" + wppNumber, genText())}
              target="_blank"
              class="bg-green-500 text-white flex-1 p-2 uppercase font-bold rounded"
              >enviar</a
            >
          {/if}
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .main {
    max-width: 500px;
  }
</style>
