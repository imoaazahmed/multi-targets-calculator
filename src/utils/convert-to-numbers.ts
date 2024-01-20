export function convertToNumbers<T>(data: T): Record<keyof T, number> {
	const numericValues: Record<keyof T, number> = {} as Record<keyof T, number>;

	for (const [key, value] of Object.entries(data as Object)) {
		const numericValue = Number(value);

		if (isNaN(numericValue)) {
			throw new Error(`Value for ${key} is not a valid number`);
		}

		numericValues[key as keyof T] = numericValue;
	}

	return numericValues;
}
