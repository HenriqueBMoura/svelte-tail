<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="min-h-screen bg-secondary-50">
	<nav class="bg-primary-600 text-white p-4">
	  <div class="container mx-auto">
		<h1 class="text-2xl font-bold">My App</h1>
	  </div>
	</nav>
	
	<main class="container mx-auto p-4">
	  {@render children()}
	</main>
</div>
