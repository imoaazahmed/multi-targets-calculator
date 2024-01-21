import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CardHeader, Input } from "../../theme/components";
import { useState } from "react";
import { calculateTotalProfit } from "../../utils/calculate-total-profit";
import { convertToNumbers } from "../../utils/convert-to-numbers";
import { useBreakpoint } from "../../theme/hooks";
import { ProfitLossResult } from "../profit-loss-result";
import { scrollToTop } from "../../utils/scroll-to-top";
import { PriceSymbolIcon } from "./price-symbol-icon";
import { PercentageSymbolIcon } from "./percentage-symbol-icon";
import { CustomLabel } from "./custom-label";
import { SuggestedPercentages } from "./suggested-percentages";

export type Target = {
	amount: string;
	sellingPercentage: string;
};

export type FormInputs = {
	investedAmount: string;
	buyPrice: string;
	targets: Target[];
};

const defaultValues: FormInputs = {
	buyPrice: "",
	investedAmount: "",
	targets: [
		{ amount: "", sellingPercentage: "40" },
		{ amount: "", sellingPercentage: "30" },
		{ amount: "", sellingPercentage: "30" },
	],
};

const schema = yup.object().shape({
	investedAmount: yup.string().required("Invested amount is required"),
	buyPrice: yup.string().required("Buy price is required"),
	targets: yup.array(
		yup.object().shape({
			amount: yup.string().required("Target is requires"),
			sellingPercentage: yup.string().required("Selling percentage is required"),
		})
	),
});

export const CalculatorForm = () => {
	const { isMobile } = useBreakpoint();

	const [totalProfitInUSD, setTotalProfitInUSD] = useState<number>(0);
	const [totalProfitPercentage, setTotalProfitPercentage] = useState<number>(0);
	const [investmentAmount, setInvestmentAmount] = useState<number>(0);
	const [totalExitAmount, setTotalExitAmount] = useState<number>(0);

	const {
		control,
		handleSubmit,
		resetField,
		setValue,
		reset,
		formState: { errors },
	} = useForm<FormInputs>({
		reValidateMode: "onChange",
		mode: "onChange",
		resolver: yupResolver(schema),
		defaultValues: { ...defaultValues },
	});

	const { fields: targets, update } = useFieldArray({
		control,
		name: "targets",
	});

	const onSubmit = (data: FormInputs) => {
		try {
			const {
				investedAmount,
				buyPrice,
				target1,
				target2,
				target3,
				sellingPercentageAtTarget1,
				sellingPercentageAtTarget2,
				sellingPercentageAtTarget3,
			} = convertToNumbers({
				investedAmount: data.investedAmount,
				buyPrice: data.buyPrice,
				target1: data.targets[0]?.amount,
				target2: data.targets[0]?.amount,
				target3: data.targets[0]?.amount,
				sellingPercentageAtTarget1: data.targets[0]?.sellingPercentage,
				sellingPercentageAtTarget2: data.targets[0]?.sellingPercentage,
				sellingPercentageAtTarget3: data.targets[0]?.sellingPercentage,
			});

			const percentagesSum = sellingPercentageAtTarget1 + sellingPercentageAtTarget2 + sellingPercentageAtTarget3;
			const isPercentageSumValid = percentagesSum <= 100;

			if (!isPercentageSumValid) return alert(`Percentages sum result is ${percentagesSum}% it should be equal or less than 100%`);

			const profit = calculateTotalProfit(
				investedAmount,
				buyPrice,
				target1,
				target2,
				target3,
				sellingPercentageAtTarget1,
				sellingPercentageAtTarget2,
				sellingPercentageAtTarget3
			);

			setTotalProfitInUSD(profit);
			setTotalProfitPercentage((profit / investedAmount) * 100);
			setInvestmentAmount(investedAmount);
			setTotalExitAmount(investedAmount + profit);

			scrollToTop();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	const onReset = () => {
		reset(defaultValues);
		setTotalProfitInUSD(0);
		setTotalProfitPercentage(0);
		setInvestmentAmount(0);
		setTotalExitAmount(0);
	};

	return (
		<div className="flex flex-col gap-8">
			<Card className="dark:bg-gradient-to-r from-blue-900 to-red-900 dark:border-0">
				<CardHeader className="font-bold">Investment Result</CardHeader>
				<CardBody>
					<div className="grid xs:grid-cols-1 md:grid-cols-4 xs:gap-3 md:gap-1">
						<div className="flex xs:flex-row md:flex-col xs:justify-between md:gap-2 xs:items-center md:items-start">
							<p className="text-sm">Profit/Loss</p>

							<div className="flex gap-4">
								<ProfitLossResult
									amount={totalProfitInUSD}
									currencyCode="USD"
									percentage={totalProfitPercentage}
									isLoss={totalProfitInUSD < 0}
								/>
							</div>
						</div>

						<div className="flex xs:flex-row md:flex-col xs:justify-between md:gap-2 xs:items-center md:items-start">
							<p className="text-sm">Total Exit Amount</p>

							<div className="flex gap-4">
								<ProfitLossResult amount={totalExitAmount} currencyCode="USD" isLoss={totalExitAmount < investmentAmount} />
							</div>
						</div>
					</div>
				</CardBody>
			</Card>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" noValidate>
				<div className="grid xs:grid-cols-1 md:grid-cols-2 gap-unit-md">
					<div className="flex gap-unit-md">
						<Card className="flex-1">
							<CardHeader className="font-bold">Investments</CardHeader>
							<CardBody className="">
								{/* Invested Amount Input */}
								<Controller
									name="investedAmount"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PriceSymbolIcon />}
											label={<CustomLabel onPaste={(val) => setValue("investedAmount", val)}>Investment</CustomLabel>}
											type="number"
											placeholder="0"
											onClear={() => resetField("investedAmount")}
											errorMessage={errors.investedAmount?.message}
											isClearable
										/>
									)}
								/>
							</CardBody>
						</Card>
						<Card className="flex-1">
							<CardHeader className="font-bold">Buy Price</CardHeader>
							<CardBody className="">
								{/* Buy Price Input */}
								<Controller
									name="buyPrice"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PriceSymbolIcon />}
											label={<CustomLabel onPaste={(val) => setValue("buyPrice", val)}>Buy Price</CustomLabel>}
											type="number"
											placeholder="0"
											onClear={() => resetField("buyPrice")}
											errorMessage={errors.buyPrice?.message}
											isClearable
										/>
									)}
								/>
							</CardBody>
						</Card>
					</div>

					{targets.map((target, index) => (
						<Card key={target.id}>
							<CardHeader className="font-bold">Target {index + 1}</CardHeader>
							<CardBody className="grid grid-cols-2 gap-unit-md">
								{/* Target Input */}
								<Controller
									control={control}
									name={`targets.${index}.amount`}
									render={({ field, fieldState: { error } }) => (
										<Input
											{...field}
											startContent={<PriceSymbolIcon />}
											label={<CustomLabel onPaste={(val) => update(index, { ...target, amount: val })}>Amount</CustomLabel>}
											type="number"
											placeholder="0"
											onClear={() => update(index, { ...target, amount: "" })}
											errorMessage={error?.message}
											isClearable
										/>
									)}
								/>

								{/* Selling Percentage Input */}
								<div className="flex flex-col gap-2 items-start">
									<Controller
										name={`targets.${index}.sellingPercentage`}
										control={control}
										render={({ field, fieldState: { error } }) => (
											<Input
												{...field}
												startContent={<PercentageSymbolIcon />}
												label={<CustomLabel>{isMobile ? "Selling %" : "Selling % at this Target"}</CustomLabel>}
												type="number"
												placeholder="0"
												onClear={() => update(index, { ...target, sellingPercentage: "" })}
												errorMessage={error?.message}
												isClearable
											/>
										)}
									/>

									<SuggestedPercentages onSuggestedValueClick={(val) => update(index, { ...target, sellingPercentage: val })} />
								</div>
							</CardBody>
						</Card>
					))}
				</div>

				<div className="grid xs:grid-cols-2 md:grid-cols-6 gap-4 mt-8">
					<Button color="danger" size="lg" className="md:col-start-5" onClick={onReset}>
						Reset
					</Button>

					<Button type="submit" color="primary" size="lg">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};
