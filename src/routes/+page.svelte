<script lang="ts">
    import BookForm from '$lib/components/BookForm.svelte';
    import BookSearch from '$lib/components/BookSearch.svelte';
    import BookList from '$lib/components/BookList.svelte';
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <BookForm />
    <BookSearch />
    <!-- <BookList /> -->
  </div>