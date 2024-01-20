import { UseFormSetValue } from "react-hook-form";
import { FormInputs } from ".";
import { Chip, ScrollShadow } from "../../theme/components";

interface SuggestedPercentagesProps {
	inputName: keyof FormInputs;
	setValue: UseFormSetValue<FormInputs>;
}

export const SuggestedPercentages = ({ inputName, setValue }: SuggestedPercentagesProps) => {
	return (
		<ScrollShadow hideScrollBar className="flex gap-2 max-w-full">
			{["0", "20", "30", "40", "50", "100"].map((val) => (
				<Chip size="sm" className="cursor-pointer" onClick={() => setValue(inputName, val)}>
					{val}%
				</Chip>
			))}
		</ScrollShadow>
	);
};
