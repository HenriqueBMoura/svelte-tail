<!-- <script>
    import { toast } from '@zerodevx/svelte-toast';
  </script>
  
  {#each $toast as { id, ...rest }}
    <div {...rest}></div>
  {/each} -->

  <script>
    import { toast } from '@zerodevx/svelte-toast';
  </script>
  
  {#each $toast as { id, ...rest }}
    <div {...rest}></div>
  {/each}