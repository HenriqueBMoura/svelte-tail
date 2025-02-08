<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { filteredBooks, deleteBook, books } from '$lib/stores/searchStore';

	let unsubscribe: () => void;

	onMount(() => {
		unsubscribe = () => {};
		// Handle storage events from other tabs
		const handleStorage = (event: StorageEvent) => {
			if (event.key === 'bookshelf_books') {
				const newValue = event.newValue ? JSON.parse(event.newValue) : [];
				books.set(newValue);
			}
		};

		window.addEventListener('storage', handleStorage);
		return () => {
			window.removeEventListener('storage', handleStorage);
			if (unsubscribe) unsubscribe();
		};
	});
</script>

<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each $filteredBooks as book (book.id)}
		<div class="rounded-lg bg-white p-6 shadow-md">
			<div class="mb-4 flex items-start justify-between">
				<div>
					<h3 class="text-lg font-semibold">{book.title}</h3>
					<p class="text-gray-600">by {book.author}</p>
				</div>
				<button
					class="text-red-500 hover:text-red-700"
					on:click={() => deleteBook(book.id)}
					aria-label="Delete book"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>

			<span
				class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
          {book.status === 'reading'
					? 'bg-yellow-100 text-yellow-800'
					: book.status === 'completed'
						? 'bg-green-100 text-green-800'
						: 'bg-blue-100 text-blue-800'}"
			>
				{book.status}
			</span>
		</div>
	{/each}
</div>
