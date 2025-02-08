<script lang="ts">
	import { books, filters, filteredBooks } from '$lib/stores/bookStore';
	import type { BookStatus } from '$lib/types/book';
	import { onMount, onDestroy } from 'svelte';

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

	function deleteBook(bookId: string) {
		books.update((currentBooks) => currentBooks.filter((book) => book.id !== bookId));
		localStorage.setItem('bookshelf_books', JSON.stringify($books));
	}
</script>

<div class="mb-6 space-y-4 bg-secondary-50 dark:bg-dark-secondary-50 p-6 shadow-md">
	<div class="flex gap-4">
		<input
			type="text"
			placeholder="Search books..."
			bind:value={search}
			on:input={handleInput}
			class="flex-1 rounded-md border px-4 py-2"
		/>
		<select bind:value={status} on:change={handleStatusChange} class="rounded-md border px-4 py-2">
			<option value="">All Status</option>
			<option value="reading">Reading</option>
			<option value="completed">Completed</option>
			<option value="want-to-read">Want to Read</option>
		</select>
	</div>

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
		{#each $filteredBooks as book (book.id)}
			<div class="rounded-lg bg-white p-6 shadow-md">
				<div class="mb-4 flex items-start justify-between">
					<div>
						<h3 class="text-lg font-semibold">{book.title}</h3>
						<p class="text-gray-600">by {book.author}</p>
					</div>
					<button
						on:click={() => deleteBook(book.id)}
						class="text-red-500 transition-colors hover:text-red-700"
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
</div>
