<script lang="ts">
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
    // import { ToastContainer } from '@zerodevx/svelte-toast';
	import { showToast } from '$lib/stores/toastStore';
    // import { ToastContainer } from '@zerodevx/svelte-toast';

	import '../app.css';
	let { children } = $props();
</script>

<div class="bg-secondary-50 dark:bg-dark-secondary-50 min-h-screen">
    <nav class="bg-primary-100 flex items-center p-4 text-white dark:bg-slate-900">
        <div class="container row-auto mx-auto flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6 dark:text-white text-black"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                />
            </svg>
            <h1 class="text-2xl font-bold text-black dark:text-white">My Bookshelf</h1>
        </div>
        <ThemeToggle />
    </nav>

    <!-- <ToastContainer /> -->

	<main class="container mx-auto p-4 bg-secondary-50 dark:bg-dark-secondary-50">
		{@render children?.()}
		<!-- <slot /> -->
	</main>
</div>
