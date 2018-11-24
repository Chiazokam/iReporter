const stringCheck = (elem) => {
	if (typeof elem === "string") {
		return true;
	} else {
		return false;
	}
};

const arrayCheck = (elem) => {
	return Array.isArray(elem);
};



