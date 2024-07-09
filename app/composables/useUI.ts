const DEFAULT_TOAST_PARAMS = {
	life: 5000,
};
export default () => {
	const toast = useToast();

	const showErrorToast = (message: string) => toast.add({ ...DEFAULT_TOAST_PARAMS, severity: "error", summary: "Error", detail: message });
	const showSuccessToast = (message: string) => toast.add({ ...DEFAULT_TOAST_PARAMS, severity: "success", summary: "Done", detail: message });

	return {
		showErrorToast,
		showSuccessToast,
	};
};
