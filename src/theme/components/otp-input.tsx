import { InputProps } from "@nextui-org/react";
import React, { useCallback, useEffect, useMemo } from "react";
import { useOTPInput } from "use-otp-input";
import { Input } from "./input";

interface OTPInputProps extends Omit<InputProps, "ref" | "value" | "onKeyDown" | "onKeyUp"> {
	length?: number;
	defaultValue?: string;
	onComplete?: (val: string) => void;
	spacing?: number;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 4, defaultValue = "", onComplete, onChange, spacing, style, ...rest }) => {
	const otpInput = useOTPInput({
		length,
		normalizeValue: (value, prevValue) => (!Number.isNaN(Number(value)) ? Number(value).toString() : prevValue),
	});

	const currentValue = otpInput.getInput();

	/**
	 * Set default value
	 */
	useEffect(() => {
		const isNumber = !isNaN(Number(defaultValue));
		const isValidLength = defaultValue.length === length;

		otpInput.setInput(isNumber && isValidLength ? defaultValue : "");
	}, [defaultValue, length]);

	/**
	 * Trigger onComplete Fn
	 */
	useEffect(() => {
		if (currentValue.length === length) {
			onComplete?.(currentValue);
		}
	}, [currentValue, length]);

	/**
	 * Trigger external onChange
	 */
	useEffect(() => {
		onChange?.({
			target: { value: currentValue },
		} as React.ChangeEvent<HTMLInputElement>);
	}, [currentValue]);

	const gap = useMemo(() => `${spacing || 16}px`, [spacing]);

	const handleFocus = useCallback(
		(
			e: React.FocusEvent<HTMLInputElement, Element> | React.FocusEvent<Element, Element>,
			onFocus: (e: React.FocusEvent<HTMLInputElement>) => void
		) => {
			onFocus(e as React.FocusEvent<HTMLInputElement>);
		},
		[]
	);

	return (
		<div className="flex" style={{ gap }}>
			{otpInput.inputProps.map(({ onFocus, ...inputItemProps }, index) => (
				<Input
					key={index}
					style={{ textAlign: "center", ...style }}
					onFocus={(e) => handleFocus(e, onFocus)}
					autoComplete="off"
					aria-label={`OTP Digit ${index + 1}`}
					{...rest}
					{...inputItemProps}
				/>
			))}
		</div>
	);
};
