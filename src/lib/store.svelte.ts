// Menggunakan Svelte Runes untuk store
export const toastState = $state({
	message: '',
	type: 'info',
	visible: false,
	duration: 3000
});

// Fungsi untuk menampilkan toast
export function showToast(message: string, type = 'info', duration = 3000) {
	toastState.message = message;
	toastState.type = type;
	toastState.duration = duration;
	toastState.visible = true;
}

// Fungsi untuk menyembunyikan toast
export function hideToast() {
	toastState.visible = false;
}
