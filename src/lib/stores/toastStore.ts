import { toast } from '@zerodevx/svelte-toast';

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.push(message, {
    theme: {
      '--toastBackground': type === 'success' ? 'green' : 'red',
      '--toastColor': 'white',
      '--toastBarBackground': type === 'success' ? 'darkgreen' : 'darkred'
    }
  });
}