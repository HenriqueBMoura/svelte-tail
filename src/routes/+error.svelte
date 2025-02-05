<script lang="ts">
    import { page } from '$app/stores';
  </script>
  
  <div class="container mx-auto p-4">
    <h1 class="text-2xl text-red-600">Error {$page.status}</h1>
    <p class="text-gray-600">{$page.error?.message}</p>
  </div>