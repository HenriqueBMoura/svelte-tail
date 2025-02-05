<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-secondary-50 dark:bg-secondary-900">
	<nav class="bg-primary-100 dark:bg-slate-900 text-white p-4 flex items-center">
	  <div class="container mx-auto flex row-auto items-center gap-2">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
		</svg>
		<h1 class="text-2xl font-bold text-black dark:text-white ">My Bookshelf</h1>
		</div>
		<ThemeToggle />
	</nav>
	
	<main class="container mx-auto p-4">
	  {@render children()}
	</main>
</div>
