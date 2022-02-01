<script lang="ts">
  import { toReal, genText, genLink } from "../util";
  export let openModal: boolean;
  export let closeModal: any;
  export let items;
  export let total: number;
  let wppNumber: number;
</script>

{#if openModal}
  <div class="fixed left-0 right-0 bottom-0 top-0 p-4 bg-black bg-opacity-80">
    <div
      class="main bg-white h-full mx-auto rounded relative p-2 overflow-auto"
    >
      <button
        class="bg-red-500 absolute right-1 top-1 text-sm text-white rounded w-5 h-5 flex items-center justify-center"
        on:click={() => {
          closeModal();
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
              href={genLink("55" + wppNumber, genText(items, total))}
              target="_blank"
              class="bg-green-500 text-center text-white flex-1 p-2 uppercase font-bold rounded"
              >enviar</a
            >
          {/if}
        {/if}
      </div>
    </div>
  </div>
{/if}
