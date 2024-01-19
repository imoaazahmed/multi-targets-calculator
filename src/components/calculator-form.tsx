import { useForm, Controller } from "react-hook-form";
import { Button, Input } from "@nextui-org/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormInputs = {
	investedAmount: string;
	buyPrice: string;
	target1: string;
	target2: string;
	target3: string;
	sellingPercentageAtTarget1: string;
	sellingPercentageAtTarget2: string;
	sellingPercentageAtTarget3: string;
};

const defaultValues: FormInputs = {
	investedAmount: "",
	buyPrice: "",
	target1: "",
	target2: "",
	target3: "",
	sellingPercentageAtTarget1: "",
	sellingPercentageAtTarget2: "",
	sellingPercentageAtTarget3: "",
};

const schema = yup.object().shape({
	investedAmount: yup.string().required("Invested amount is required"),
	buyPrice: yup.string().required("Buy price is required"),
	target1: yup.string().required("Target 1 is required"),
	target2: yup.string().required("Target 2 is required"),
	target3: yup.string().required("Target 3 is required"),
	sellingPercentageAtTarget1: yup.string().required("Selling percentage at target 1 is required"),
	sellingPercentageAtTarget2: yup.string().required("Selling percentage at target 2 is required"),
	sellingPercentageAtTarget3: yup.string().required("Selling percentage at target 3 is required"),
});

export const CalculatorForm = () => {
	const {
		control,
		register,
		handleSubmit,
		resetField,
		watch,
		formState: { errors },
	} = useForm<FormInputs>({
		reValidateMode: "onChange",
		resolver: yupResolver(schema),
		defaultValues: { ...defaultValues },
	});

	console.log(watch("investedAmount"));

	const onSubmit = (data: FormInputs) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
			{/* Invested Amount Input */}
			<Controller
				name="investedAmount"
				control={control}
				render={({ field: { onChange, onBlur, value } }) => (
					<Input
						onChange={onChange}
						onBlur={onBlur}
						value={value}
						startContent={"$"}
						label="Invested Amount"
						labelPlacement="outside"
						size="lg"
						type="number"
						className="w-full"
						color="primary"
						variant="bordered"
						onClear={() => resetField("investedAmount")}
						isInvalid={!!errors.investedAmount}
						errorMessage={errors.investedAmount?.message}
						isClearable
					/>
				)}
			/>

			{/* Buy Price Input */}
			<Input
				{...register("buyPrice")}
				isClearable
				label="$ Buy Price"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.buyPrice?.message}
			/>

			{/* Target 1 Input */}
			<Input
				{...register("target1")}
				isClearable
				label="$ Target 1"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.target1?.message}
			/>

			{/* Target 2 Input */}
			<Input
				{...register("target2")}
				isClearable
				label="$ Target 2"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.target2?.message}
			/>

			{/* Target 3 Input */}
			<Input
				{...register("target3")}
				isClearable
				label="$ Target 3"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.target3?.message}
			/>

			{/* Selling Percentage at Target 1 Input */}
			<Input
				{...register("sellingPercentageAtTarget1")}
				isClearable
				label="% Selling at Target 1"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.sellingPercentageAtTarget1?.message}
			/>

			{/* Selling Percentage at Target 2 Input */}
			<Input
				{...register("sellingPercentageAtTarget2")}
				isClearable
				label="% Selling at Target 2"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.sellingPercentageAtTarget2?.message}
			/>

			{/* Selling Percentage at Target 3 Input */}
			<Input
				{...register("sellingPercentageAtTarget3")}
				isClearable
				label="% Selling at Target 3"
				type="number"
				className="w-full"
				color="primary"
				errorMessage={errors.sellingPercentageAtTarget3?.message}
			/>

			<Button type="submit" color="primary">
				Submit
			</Button>
		</form>
	);
};
