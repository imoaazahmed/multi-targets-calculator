import { extendVariants, Input as OInput } from "@nextui-org/react";

export const Input = extendVariants(OInput, {
	defaultVariants: {
		size: "md",
		labelPlacement: "inside",
		variant: "flat",
		color: "default",
		radius: "md",
	},
});
