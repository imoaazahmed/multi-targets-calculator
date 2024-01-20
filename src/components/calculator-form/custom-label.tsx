import { UseFormSetValue } from "react-hook-form";
import { FormInputs } from ".";
import { useClipboard } from "../../hooks/use-clipboard";

interface CustomLabelProps {
	inputName: keyof FormInputs;
	children: React.ReactNode;
	setValue: UseFormSetValue<FormInputs>;
}

export const CustomLabel = ({ inputName, children, setValue }: CustomLabelProps) => {
	const { onPaste: _onPaste } = useClipboard();

	const onPaste = (inputName: keyof FormInputs) => {
		_onPaste().then((val) => {
			if (!isNaN(Number(val))) {
				setValue(inputName, val);
			}
		});
	};

	return (
		<div className="flex items-center gap-2">
			<p>{children}</p>
			<p className="text-sky-500 cursor-pointer" onClick={() => onPaste(inputName)}>
				Paste
			</p>
		</div>
	);
};
