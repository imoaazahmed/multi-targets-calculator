import { Button } from "@/theme/components";
import { createArray } from "@/utils/create-array";
import { ButtonGroup, ButtonGroupProps } from "@nextui-org/react";
import { UseFormSetValue } from "react-hook-form";
import { FormInputs } from "@/components/calculator-form";
import { useState } from "react";
import { useBreakpoint } from "@/theme/hooks";

interface TargetsButtonGroupProps extends ButtonGroupProps {
	setValue: UseFormSetValue<FormInputs>;
}

export const TargetsButtonGroup = ({ setValue, ...rest }: TargetsButtonGroupProps) => {
	const [currentTargetsLength, setCurrentTargetsLength] = useState(3);
	const { isMobile } = useBreakpoint();

	const onClick = (targetsLength: number) => {
		setCurrentTargetsLength(targetsLength);
		setValue(
			"targets",
			createArray(targetsLength).map(() => {
				return { price: "", sellingPercentage: (100 / targetsLength).toFixed(0).toString() };
			})
		);
	};

	return (
		<ButtonGroup fullWidth={isMobile} {...rest}>
			{[1, 2, 3].map((i) => (
				<Button key={i} size="sm" color={currentTargetsLength === i ? "primary" : "default"} onClick={() => onClick(i)}>
					{i} Target{i > 1 ? "s" : ""}
				</Button>
			))}
		</ButtonGroup>
	);
};
