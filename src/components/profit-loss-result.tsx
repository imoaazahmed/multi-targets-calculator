import { formatPrice } from "@/utils/format-price";

interface ProfitLossResultProps {
	amount: number;
	currencyCode: string;
	percentage?: number;
	isLoss?: boolean;
}

export const ProfitLossResult = ({ amount, currencyCode, percentage, isLoss }: ProfitLossResultProps) => {
	const profitStyleClassNames = "text-profit-500 bg-profit-400";
	const lossStyleClassNames = "text-loss-500 bg-loss-400";

	return (
		<div
			className={`flex items-center gap-unit-xs text-md bg-opacity-[0.15] rounded-md p-unit-xs font-semibold ${
				isLoss ? lossStyleClassNames : profitStyleClassNames
			}`}>
			<p>{formatPrice(amount, currencyCode)}</p>
			{!!percentage && <p>({formatPrice(percentage)}%)</p>}
		</div>
	);
};
