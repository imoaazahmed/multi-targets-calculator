import { Chip, ScrollShadow } from "../../theme/components";

interface SuggestedPercentagesProps {
	onSuggestedValueClick: (val: string) => void;
}

export const SuggestedPercentages = ({ onSuggestedValueClick }: SuggestedPercentagesProps) => {
	return (
		<ScrollShadow hideScrollBar className="flex gap-2 max-w-full">
			{["0", "20", "30", "40", "50", "100"].map((val) => (
				<Chip key={val} size="sm" className="cursor-pointer" onClick={() => onSuggestedValueClick(val)}>
					{val}%
				</Chip>
			))}
		</ScrollShadow>
	);
};
