import { extendVariants, Input as OInput } from "@nextui-org/react";

export const Input = extendVariants(OInput, {
	defaultVariants: {
		size: "lg",
		labelPlacement: "outside",
		variant: "bordered",
		color: "primary",
		radius: "md",
	},
});
