<script lang="ts">
  import { books, filters, filteredBooks } from '$lib/stores/bookStore';
  import type { BookStatus } from '$lib/types/book';
  import { onMount, onDestroy } from 'svelte';
  import BookCard from './BookCard.svelte';

  let search = '';
  let status: BookStatus | '' = '';
  let searchTimeout: ReturnType<typeof setTimeout>;

  function handleInput() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      $filters.search = search;
      $filters.status = status || undefined;
    }, 300);
  }

  function handleStatusChange() {
    $filters.status = status || undefined;
  }

  onMount(() => {
    const stored = localStorage.getItem('bookshelf_books');
    if (stored) {
      try {
        books.set(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load stored books:', error);
      }
    }
  });

  onDestroy(() => {
    clearTimeout(searchTimeout);
  });
</script>

<div class="mb-6 space-y-4 p-6">
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

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each $filteredBooks as book (book.id)}
      <BookCard {book} />
    {/each}
  </div>
</div>