import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CardHeader, Input } from "../../theme/components";
import { useEffect, useState } from "react";
import { calculateTotalProfit } from "../../utils/calculate-total-profit";
import { convertToNumbers } from "../../utils/convert-to-numbers";
import { useBreakpoint } from "../../theme/hooks";
import { ProfitLossResult } from "../profit-loss-result";
import { scrollToTop } from "../../utils/scroll-to-top";
import { PriceSymbolIcon } from "./price-symbol-icon";
import { PercentageSymbolIcon } from "./percentage-symbol-icon";
import { CustomLabel } from "./custom-label";
import { SuggestedPercentages } from "./suggested-percentages";

export type FormInputs = {
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
	const [totalProfitInUSD, setTotalProfitInUSD] = useState<number>(0);
	const [totalProfitPercentage, setTotalProfitPercentage] = useState<number>(0);
	const [investmentAmount, setInvestmentAmount] = useState<number>(0);
	const [totalExitAmount, setTotalExitAmount] = useState<number>(0);
	const { isMobile } = useBreakpoint();

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

	// Set default values for T1, T2, T3 percentages
	useEffect(() => {
		setValue("sellingPercentageAtTarget1", "40");
		setValue("sellingPercentageAtTarget2", "30");
		setValue("sellingPercentageAtTarget3", "30");
	}, []);

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
			} = convertToNumbers<FormInputs>(data);

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
			<Card className="dark:bg-transparent dark:border-gray-600 dark:border-1">
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
					<Card>
						<CardHeader className="font-bold">Investments</CardHeader>
						<CardBody className="grid grid-cols-2 gap-unit-md">
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
										label={
											<CustomLabel inputName="investedAmount" setValue={setValue}>
												Investment
											</CustomLabel>
										}
										type="number"
										placeholder="0"
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
										startContent={<PriceSymbolIcon />}
										label={
											<CustomLabel inputName="buyPrice" setValue={setValue}>
												Buy Price
											</CustomLabel>
										}
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
						<CardHeader className="font-bold">Target 1</CardHeader>
						<CardBody className="grid grid-cols-2 gap-unit-md">
							{/* Target 1 Input */}
							<Controller
								name="target1"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										startContent={<PriceSymbolIcon />}
										label={
											<CustomLabel inputName="target1" setValue={setValue}>
												Amount
											</CustomLabel>
										}
										type="number"
										placeholder="0"
										onClear={() => resetField("target1")}
										errorMessage={errors.target1?.message}
										isClearable
									/>
								)}
							/>

							{/* Selling Percentage at Target 1 Input */}
							<div className="flex flex-col gap-2 items-start">
								<Controller
									name="sellingPercentageAtTarget1"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PercentageSymbolIcon />}
											label={isMobile ? "Selling %" : "Selling % at this Target"}
											type="number"
											placeholder="0"
											onClear={() => resetField("sellingPercentageAtTarget1")}
											errorMessage={errors.sellingPercentageAtTarget1?.message}
											isClearable
										/>
									)}
								/>

								<SuggestedPercentages inputName="sellingPercentageAtTarget1" setValue={setValue} />
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader className="font-bold">Target 2</CardHeader>
						<CardBody className="grid grid-cols-2 gap-unit-md">
							{/* Target 2 Input */}
							<Controller
								name="target2"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										startContent={<PriceSymbolIcon />}
										label={
											<CustomLabel inputName="target2" setValue={setValue}>
												Amount
											</CustomLabel>
										}
										type="number"
										placeholder="0"
										onClear={() => resetField("target2")}
										errorMessage={errors.target2?.message}
										isClearable
									/>
								)}
							/>

							{/* Selling Percentage at Target 2 Input */}
							<div className="flex flex-col gap-2 items-start">
								<Controller
									name="sellingPercentageAtTarget2"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PercentageSymbolIcon />}
											label={isMobile ? "Selling %" : "Selling % at this Target"}
											type="number"
											placeholder="0"
											onClear={() => resetField("sellingPercentageAtTarget2")}
											errorMessage={errors.sellingPercentageAtTarget2?.message}
											isClearable
										/>
									)}
								/>

								<SuggestedPercentages inputName="sellingPercentageAtTarget2" setValue={setValue} />
							</div>
						</CardBody>
					</Card>

					<Card>
						<CardHeader className="font-bold">Target 3</CardHeader>
						<CardBody className="grid grid-cols-2 gap-unit-md">
							{/* Target 3 Input */}
							<Controller
								name="target3"
								control={control}
								render={({ field: { onChange, onBlur, value } }) => (
									<Input
										onChange={onChange}
										onBlur={onBlur}
										value={value}
										startContent={<PriceSymbolIcon />}
										label={
											<CustomLabel inputName="target3" setValue={setValue}>
												Amount
											</CustomLabel>
										}
										type="number"
										placeholder="0"
										onClear={() => resetField("target3")}
										errorMessage={errors.target3?.message}
										isClearable
									/>
								)}
							/>

							{/* Selling Percentage at Target 3 Input */}
							<div className="flex flex-col gap-2 items-start">
								<Controller
									name="sellingPercentageAtTarget3"
									control={control}
									render={({ field: { onChange, onBlur, value } }) => (
										<Input
											onChange={onChange}
											onBlur={onBlur}
											value={value}
											startContent={<PercentageSymbolIcon />}
											label={isMobile ? "Selling %" : "Selling % at this Target"}
											type="number"
											placeholder="0"
											onClear={() => resetField("sellingPercentageAtTarget3")}
											errorMessage={errors.sellingPercentageAtTarget3?.message}
											isClearable
										/>
									)}
								/>

								<SuggestedPercentages inputName="sellingPercentageAtTarget3" setValue={setValue} />
							</div>
						</CardBody>
					</Card>
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
