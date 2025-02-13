<script lang="ts">
    import BookForm from '$lib/components/BookForm.svelte';
    import BookSearch from '$lib/components/BookSearch.svelte';
    import ToastContainer from '$lib/components/ToastContainer.svelte';
    // import { showToast } from '$lib/stores/toastStore';
    import { showToast } from '$lib/stores/toastStore';

</script>

<div class="container bg-secondary-50 dark:bg-secondary-900 mx-auto px-4 py-8">
    <BookForm />
    <BookSearch />
    <ToastContainer />
</div>

<style lang="postcss">
    :global(html) {
      background-color: theme(colors.gray.100);
    }
  </style>
  
