function showToast(toastId) {
    const toast = document.getElementById(toastId);
    const bsToast = bootstrap.Toast.getOrCreateInstance(toast);
    bsToast.show();
}