module.exports = (lastOnline) => {
	const result = (Date.now() - lastOnline.getTime()) / 1000;
	if (result < 60) return true;
	else return false;
};
