import { toast } from '@zerodevx/svelte-toast';

export function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.push(message, {
    theme: {
      '--toastBackground': type === 'success' ? 'bg-green-500' : 'bg-red-500',
      '--toastColor': 'text-white',
      '--toastBarBackground': type === 'success' ? 'bg-green-700' : 'bg-red-700'
    },
    classes: [
      'p-4',
      'rounded',
      'shadow-lg',
      'flex',
      'items-center',
      'justify-between',
      'space-x-4',
      'text-sm',
      'font-medium'
    ]
  });
}