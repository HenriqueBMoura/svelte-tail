<script lang="ts">
    import BookForm from '$lib/components/BookForm.svelte';
    import BookList from '$lib/components/BookList.svelte';
  </script>
  
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">My Bookshelf</h1>
    <BookForm />
    <BookList />
  </div>