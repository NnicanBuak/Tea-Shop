export default ({ app }, inject) => {
	const isCursorAvailable = process.client ? "onmousemove" in window : true;
	inject("isCursorAvailable", isCursorAvailable);
};
