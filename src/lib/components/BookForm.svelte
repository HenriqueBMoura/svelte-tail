<script lang="ts">
	import type { NewBook } from '$lib/types/book';
	import { books } from '$lib/stores/bookStore';

	let newBook: NewBook = {
		title: '',
		author: '',
		status: 'want-to-read'
	};

	function handleSubmit() {
		books.addBook(newBook);
		newBook = {
			title: '',
			author: '',
			status: 'want-to-read'
		};
	}
</script>

<div class="mb-8 rounded-lg bg-secondary-50 dark:bg-dark-secondary-50 p-6 shadow-md">
	<h2 class="mb-4 text-xl font-semibold">Add New Book</h2>
	<form on:submit|preventDefault={handleSubmit} class="space-y-4 bg-secondary-50 dark:bg-secondary-900">
		<div>
			<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
			<input
				type="text"
				id="title"
				bind:value={newBook.title}
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="author" class="block text-sm font-medium text-gray-700">Author</label>
			<input
				type="text"
				id="author"
				bind:value={newBook.author}
				required
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="status" class="block text-sm font-medium text-gray-700">Status</label>
			<select
				id="status"
				bind:value={newBook.status}
				class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
			>
				<option value="want-to-read">Want to Read</option>
				<option value="reading">Currently Reading</option>
				<option value="completed">Completed</option>
			</select>
		</div>

		<button
			type="submit"
			class="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
		>
			Add Book
		</button>
	</form>
</div>
