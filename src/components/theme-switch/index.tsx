import { useSwitch, VisuallyHidden, SwitchProps } from "@nextui-org/react";
import { MoonIcon } from "./icons/moon-icon";
import { SunIcon } from "./icons/sun-icon";
import { useThemeMode } from "../../theme/hooks/use-theme-mode";

export const ThemeSwitch = (props: SwitchProps) => {
	const { toggleThemeMode, isDark } = useThemeMode();
	const { Component, slots, getBaseProps, getInputProps, getWrapperProps } = useSwitch(props);

	return (
		<Component {...getBaseProps()}>
			<VisuallyHidden>
				<input {...getInputProps()} />
			</VisuallyHidden>

			<div
				{...getWrapperProps()}
				onClick={toggleThemeMode}
				className={slots.wrapper({
					class: ["w-8 h-8", "flex items-center justify-center", "rounded-lg bg-default-100 hover:bg-default-200"],
				})}>
				{isDark ? <SunIcon /> : <MoonIcon />}
			</div>
		</Component>
	);
};
