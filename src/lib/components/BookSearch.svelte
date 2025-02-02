<script lang="ts">
    import { filters, filteredBooks } from '$lib/stores/searchStore';
    import type { BookStatus } from '$lib/types/book';
    import { onMount } from 'svelte';
    
    let search = '';
    let status: BookStatus | '' = '';
    let searchTimeout: ReturnType<typeof setTimeout>;
  
    function debounceSearch() {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        console.log('Updating filters:', { search, status });
        $filters.search = search;
        $filters.status = status || undefined;
      }, 300);
    }
  
    function handleInput() {
      debounceSearch();
    }
  
    function handleStatusChange() {
      debounceSearch();
    }
  
    onMount(() => {
      return () => {
        clearTimeout(searchTimeout);
      };
    });
  </script>
  
  <div class="mb-6 space-y-4">
    <div class="flex gap-4">
      <input
        type="text"
        placeholder="Search books..."
        bind:value={search}
        on:input={handleInput}
        class="flex-1 px-4 py-2 border rounded-md"
      />
      <select
        bind:value={status}
        on:change={handleStatusChange}
        class="px-4 py-2 border rounded-md"
      >
        <option value="">All Status</option>
        <option value="reading">Reading</option>
        <option value="completed">Completed</option>
        <option value="want-to-read">Want to Read</option>
      </select>
    </div>
  
    <div class="mt-4">
      {#each $filteredBooks as book}
        <div class="bg-white p-4 rounded-md shadow mb-2">
          <h3 class="font-semibold">{book.title}</h3>
          <p class="text-gray-600">{book.author}</p>
          <span class="text-sm text-blue-600">{book.status}</span>
        </div>
      {/each}
    </div>
  </div>