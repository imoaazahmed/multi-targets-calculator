import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "../theme/components";
import { useState } from "react";
import { calculateTotalProfit } from "../utils/calculate-total-profit";
import { convertToNumbers } from "../utils/convert-to-numbers";
import { formatPrice } from "../utils/format-price";

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
	buyPrice: "",
	investedAmount: "",
	target1: "",
	target2: "",
	target3: "",
	sellingPercentageAtTarget1: "40",
	sellingPercentageAtTarget2: "30",
	sellingPercentageAtTarget3: "30",
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
	const [totalProfitInUSD, setTotalProfitInUSD] = useState<number>(0);
	const [totalProfitInAED, setTotalProfitInAED] = useState<number>(0);
	const [totalProfitPercentage, setTotalProfitPercentage] = useState<number>(0);

	const {
		control,
		handleSubmit,
		resetField,
		formState: { errors },
	} = useForm<FormInputs>({
		reValidateMode: "onChange",
		resolver: yupResolver(schema),
		defaultValues: { ...defaultValues },
	});

	const onSubmit = (data: FormInputs) => {
		try {
			const numericFormInputs = convertToNumbers<FormInputs>(data);

			const profit = calculateTotalProfit(
				numericFormInputs.investedAmount,
				numericFormInputs.buyPrice,
				numericFormInputs.target1,
				numericFormInputs.target2,
				numericFormInputs.target3,
				numericFormInputs.sellingPercentageAtTarget1,
				numericFormInputs.sellingPercentageAtTarget2,
				numericFormInputs.sellingPercentageAtTarget3
			);

			setTotalProfitInUSD(profit);
			setTotalProfitInAED(profit * 3.67);
			setTotalProfitPercentage((profit / numericFormInputs.investedAmount) * 100);
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	return (
		<div className="grid grid-cols-1 gap-9 py-unit-2xl">
			<h1 className="text-4xl text-center font-bold">Total Profit Calculator</h1>

			<div className="grid grid-cols-2 gap-1 text-lg">
				<div className="flex gap-2 items-center">
					<p className="font-bold">Total Profit:</p>
					<p>
						{formatPrice(totalProfitInUSD, "USD")} ({formatPrice(totalProfitPercentage)}%)
					</p>
				</div>

				<div className="flex gap-2 items-center">
					<p className="font-bold">Total Profit:</p>
					<p>{formatPrice(totalProfitInAED, "AED")}</p>
				</div>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-8" noValidate>
				<div className="grid grid-cols-2 gap-x-16 gap-y-8">
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
								type="number"
								onClear={() => resetField("investedAmount")}
								errorMessage={errors.investedAmount?.message}
								isClearable
							/>
						)}
					/>

					{/* Buy Price Input */}
					<Controller
						name="buyPrice"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"$"}
								label="Buy Price"
								type="number"
								onClear={() => resetField("buyPrice")}
								errorMessage={errors.buyPrice?.message}
								isClearable
							/>
						)}
					/>

					{/* Target 1 Input */}
					<Controller
						name="target1"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"$"}
								label="Target 1"
								type="number"
								onClear={() => resetField("target1")}
								errorMessage={errors.target1?.message}
								isClearable
							/>
						)}
					/>

					{/* Selling Percentage at Target 1 Input */}
					<Controller
						name="sellingPercentageAtTarget1"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"%"}
								label="Selling % at Target 1"
								type="number"
								onClear={() => resetField("sellingPercentageAtTarget1")}
								errorMessage={errors.sellingPercentageAtTarget1?.message}
								isClearable
							/>
						)}
					/>

					{/* Target 2 Input */}
					<Controller
						name="target2"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"$"}
								label="Target 2"
								type="number"
								onClear={() => resetField("target2")}
								errorMessage={errors.target2?.message}
								isClearable
							/>
						)}
					/>

					{/* Selling Percentage at Target 2 Input */}
					<Controller
						name="sellingPercentageAtTarget2"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"%"}
								label="Selling % at Target 2"
								type="number"
								onClear={() => resetField("sellingPercentageAtTarget2")}
								errorMessage={errors.sellingPercentageAtTarget2?.message}
								isClearable
							/>
						)}
					/>

					{/* Target 3 Input */}
					<Controller
						name="target3"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"$"}
								label="Target 3"
								type="number"
								onClear={() => resetField("target3")}
								errorMessage={errors.target3?.message}
								isClearable
							/>
						)}
					/>

					{/* Selling Percentage at Target 3 Input */}
					<Controller
						name="sellingPercentageAtTarget3"
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<Input
								onChange={onChange}
								onBlur={onBlur}
								value={value}
								startContent={"%"}
								label="Selling % at Target 3"
								type="number"
								onClear={() => resetField("sellingPercentageAtTarget3")}
								errorMessage={errors.sellingPercentageAtTarget3?.message}
								isClearable
							/>
						)}
					/>
				</div>

				<Button type="submit" color="primary" size="lg" className="mt-4">
					Submit
				</Button>
			</form>
		</div>
	);
};
