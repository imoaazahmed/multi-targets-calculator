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
	stopLossPrice: string;
	targets: Target[];
};

const defaultValues: FormInputs = {
	buyPrice: "",
	investedAmount: "",
	stopLossPrice: "",
	targets: [
		{ amount: "", sellingPercentage: "40" },
		{ amount: "", sellingPercentage: "30" },
		{ amount: "", sellingPercentage: "30" },
	],
};

const schema = yup.object().shape({
	investedAmount: yup.string().required("Invested amount is required"),
	buyPrice: yup.string().required("Buy price is required"),
	stopLossPrice: yup.string().required("Stop-loss is required"),
	targets: yup
		.array()
		.of(
			yup.object().shape({
				amount: yup.string().required("Target is required"),
				sellingPercentage: yup.string().required("Selling percentage is required"),
			})
		)
		.required(),
});

export const CalculatorForm = () => {
	const { isMobile } = useBreakpoint();

	const [totalProfitInUSD, setTotalProfitInUSD] = useState<number>(0);
	const [totalProfitPercentage, setTotalProfitPercentage] = useState<number>(0);
	const [investmentAmount, setInvestmentAmount] = useState<number>(0);
	const [totalExitAmount, setTotalExitAmount] = useState<number>(0);

	const [stopLossPrice, setStopLossPrice] = useState<number>(0);
	const [stopLossPercentage, setStopLossPercentage] = useState<number>(0);
	const [totalStopLossExitAmount, setTotalStopLossExitAmount] = useState<number>(0);

	const {
		control,
		handleSubmit,
		resetField,
		setValue,
		getValues,
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
				stopLossPrice,
				target1,
				target2,
				target3,
				sellingPercentageAtTarget1,
				sellingPercentageAtTarget2,
				sellingPercentageAtTarget3,
			} = convertToNumbers({
				investedAmount: data.investedAmount,
				buyPrice: data.buyPrice,
				stopLossPrice: data.stopLossPrice,
				target1: data.targets[0]?.amount,
				target2: data.targets[1]?.amount,
				target3: data.targets[2]?.amount,
				sellingPercentageAtTarget1: data.targets[0]?.sellingPercentage,
				sellingPercentageAtTarget2: data.targets[1]?.sellingPercentage,
				sellingPercentageAtTarget3: data.targets[2]?.sellingPercentage,
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

			const numberOfCoins = investedAmount / buyPrice;
			const totalLossAmount = numberOfCoins * stopLossPrice;
			const stopLossAmount = investedAmount - totalLossAmount;

			setStopLossPrice(stopLossAmount);
			setStopLossPercentage((stopLossAmount / investedAmount) * 100);
			setTotalStopLossExitAmount(totalLossAmount);

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
		setStopLossPrice(0);
		setStopLossPercentage(0);
		setTotalStopLossExitAmount(0);
	};

	const updateAmount = (index: number, newValue: string) => {
		update(index, {
			amount: newValue,
			sellingPercentage: getValues(`targets.${index}.sellingPercentage`),
		});
	};

	const updateSellingPercentage = (index: number, newValue: string) => {
		update(index, { amount: getValues(`targets.${index}.amount`), sellingPercentage: newValue });
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

						<div className="flex xs:flex-row md:flex-col xs:justify-between md:gap-2 xs:items-center md:items-start">
							<p className="text-sm">STOP-LOSS</p>

							<div className="flex gap-4">
								<ProfitLossResult
									amount={stopLossPrice}
									currencyCode="USD"
									percentage={stopLossPercentage}
									isLoss={stopLossPrice !== 0}
								/>
							</div>
						</div>

						<div className="flex xs:flex-row md:flex-col xs:justify-between md:gap-2 xs:items-center md:items-start">
							<p className="text-sm">Total STOP-LOSS Exit Amount</p>

							<div className="flex gap-4">
								<ProfitLossResult amount={totalStopLossExitAmount} currencyCode="USD" isLoss={totalStopLossExitAmount !== 0} />
							</div>
						</div>
					</div>
				</CardBody>
			</Card>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" noValidate>
				<div className="grid grid-cols-1 gap-unit-md">
					<div className="grid grid-cols-3 gap-unit-md">
						<Card>
							<CardHeader className="font-bold">Investments</CardHeader>
							<CardBody>
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
						<Card>
							<CardHeader className="font-bold">Buy Price</CardHeader>
							<CardBody>
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
						<Card>
							<CardHeader className="font-bold">STOP-LOSS Price</CardHeader>
							<CardBody>
								{/* Stop Loss Input */}
								<Controller
									name="stopLossPrice"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PriceSymbolIcon />}
											label={<CustomLabel onPaste={(val) => setValue("stopLossPrice", val)}>STOP-LOSS Price</CustomLabel>}
											type="number"
											placeholder="0"
											onClear={() => resetField("stopLossPrice")}
											errorMessage={errors.stopLossPrice?.message}
											isClearable
										/>
									)}
								/>
							</CardBody>
						</Card>
					</div>

					<div className="grid grid-cols-3 gap-unit-md">
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
												label={<CustomLabel onPaste={(val) => updateAmount(index, val)}>Amount</CustomLabel>}
												type="number"
												placeholder="0"
												onClear={() => updateAmount(index, "")}
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
													onClear={() => updateSellingPercentage(index, "")}
													errorMessage={error?.message}
													isClearable
												/>
											)}
										/>

										<SuggestedPercentages onSuggestedValueClick={(val) => updateSellingPercentage(index, val)} />
									</div>
								</CardBody>
							</Card>
						))}
					</div>
				</div>

				<div className="grid xs:grid-cols-2 md:grid-cols-6 gap-4 mt-8">
					<Button color="danger" variant="shadow" size="lg" className="md:col-start-5" onClick={onReset}>
						Reset
					</Button>

					<Button type="submit" variant="shadow" color="primary" size="lg">
						Submit
					</Button>
				</div>
			</form>
		</div>
	);
};
