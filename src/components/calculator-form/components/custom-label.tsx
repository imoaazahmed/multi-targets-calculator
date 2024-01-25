import { useClipboard } from "@/hooks/use-clipboard";

interface CustomLabelProps {
	children: React.ReactNode;
	onPaste?: (clipboardValue: string) => void;
}

export const CustomLabel = ({ children, onPaste }: CustomLabelProps) => {
	const { onPaste: _onPaste } = useClipboard();

	const onPasteBtnClick = () => {
		_onPaste().then((val) => {
			if (isNaN(Number(val))) {
				alert(`Clipboard value is not a number.`);
			}

			onPaste?.(val);
		});
	};

	return (
		<div className="flex items-center gap-2">
			<p>{children}</p>

			{!!onPaste && (
				<p className="text-sky-500 cursor-pointer" onClick={onPasteBtnClick}>
					Paste
				</p>
			)}
		</div>
	);
};
