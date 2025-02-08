<script lang="ts">
	import BookForm from '$lib/components/BookForm.svelte';
	import BookSearch from '$lib/components/BookSearch.svelte';
	import BookList from '$lib/components/BookList.svelte';
</script>

<div class="container bg-secondary-50 dark:bg-secondary-900 mx-auto px-4 py-8">
	<BookForm />
	<BookSearch />
	<!-- <BookList /> -->
</div>
