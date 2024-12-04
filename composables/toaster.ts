export const useToaster = () => {
  const toast = useToast();

  function toastSuccess(message: string) {
    toast.add({
      title: 'Success',
      description: message,
      icon: 'i-heroicons-check-circle',
      color: 'green',
    });
  }

  function toastError(message: string) {
    toast.add({
      title: 'Error',
      description: message || 'Something went wrong. Please try again.',
      icon: 'i-heroicons-x-circle',
      color: 'red',
    });
  }

  function toastWarning(message: string) {
    toast.add({
      title: 'Warning',
      description: message,
      icon: 'i-heroicons-exclamation-triangle',
      color: 'amber',
    });
  }

  function toastInfo(message: string) {
    toast.add({
      title: 'Info',
      description: message,
      icon: 'i-heroicons-information-circle',
      color: 'blue',
    });
  }

  return {
    toastSuccess,
    toastError,
    toastWarning,
    toastInfo,
  };
};
