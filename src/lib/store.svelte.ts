export const toastState = $state({
	message: '',
	type: 'info',
	visible: false,
	duration: 3000
});

export function showToast(message: string, type = 'info', duration = 3000) {
	toastState.message = message;
	toastState.type = type;
	toastState.duration = duration;
	toastState.visible = true;
}

export function hideToast() {
	toastState.visible = false;
}
