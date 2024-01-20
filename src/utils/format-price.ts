export const formatPrice = (price?: string | number, currencyCode?: string): string => {
	if ((price !== 0 && !price) || isNaN(Number(price))) return "";

	const _price = Number(price);

	const priceStr: string = _price.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	if (currencyCode) return `${priceStr} ${currencyCode}`;
	return `${priceStr}`;
};
