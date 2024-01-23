import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CardHeader, Input } from "../../theme/components";
import { useBreakpoint } from "../../theme/hooks";
import { ProfitLossResult } from "../profit-loss-result";
import { scrollToTop } from "../../utils/scroll-to-top";
import { PriceSymbolIcon } from "./components/price-symbol-icon";
import { PercentageSymbolIcon } from "./components/percentage-symbol-icon";
import { CustomLabel } from "./components/custom-label";
import { SuggestedPercentages } from "./components/suggested-percentages";
import { useInvestmentResults } from "./hooks/use-investment-results";
import toNumber from "lodash/tonumber";

export type Target = {
	price: string;
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
		{ price: "", sellingPercentage: "40" },
		{ price: "", sellingPercentage: "30" },
		{ price: "", sellingPercentage: "30" },
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
				price: yup.string().required("Target is required"),
				sellingPercentage: yup.string().required("Selling percentage is required"),
			})
		)
		.required(),
});

export const CalculatorForm = () => {
	const { isMobile } = useBreakpoint();
	const { state, onResultsUpdate, onResultsReset } = useInvestmentResults();

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
			onResultsUpdate({
				investedAmount: toNumber(data.investedAmount),
				buyPrice: toNumber(data.buyPrice),
				stopLossPrice: toNumber(data.stopLossPrice),
				targets: data.targets.map((t) => {
					return {
						price: toNumber(t.price),
						sellingPercentage: toNumber(t.sellingPercentage),
					};
				}),
			});

			scrollToTop();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	const onReset = () => {
		reset(defaultValues);
		onResultsReset();
	};

	const updateAmount = (index: number, newValue: string) => {
		update(index, {
			price: newValue,
			sellingPercentage: getValues(`targets.${index}.sellingPercentage`),
		});
	};

	const updateSellingPercentage = (index: number, newValue: string) => {
		update(index, { price: getValues(`targets.${index}.price`), sellingPercentage: newValue });
	};

	return (
		<div className="flex flex-col xs:gap-4 md:gap-8">
			<Card className="dark:bg-gradient-to-r from-blue-900 to-red-900 dark:border-0">
				<CardHeader className="font-bold">Investment Result</CardHeader>
				<CardBody>
					<div className="grid xs:grid-cols-2 md:grid-cols-4 xs:gap-3 md:gap-1">
						<div className="flex flex-col gap-unit-xs items-start">
							<p className="xs:text-xs md:text-sm">Profit/Loss</p>

							<div className="flex gap-4 xs:text-sm md:text-md">
								<ProfitLossResult
									amount={state.profit.amount}
									currencyCode={state.profit.currencyCode}
									percentage={state.profit.percentage}
									isLoss={state.profit.isLoss}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-unit-xs items-start">
							<p className="xs:text-xs md:text-sm">Total Exit Amount</p>

							<div className="flex gap-4 xs:text-sm md:text-md">
								<ProfitLossResult
									amount={state.profit.totalExitAmount}
									currencyCode={state.profit.currencyCode}
									isLoss={state.profit.isLoss}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-unit-xs items-start">
							<p className="xs:text-xs md:text-sm">STOP-LOSS</p>

							<div className="flex gap-4 xs:text-sm md:text-md">
								<ProfitLossResult
									amount={state.stopLoss.amount}
									currencyCode={state.stopLoss.currencyCode}
									percentage={state.stopLoss.percentage}
									isLoss={state.stopLoss.isLoss}
								/>
							</div>
						</div>

						<div className="flex flex-col gap-unit-xs items-start">
							<p className="xs:text-xs md:text-sm">Total STOP-LOSS Amount</p>

							<div className="flex gap-4 xs:text-sm md:text-md">
								<ProfitLossResult
									amount={state.stopLoss.totalExitAmount}
									currencyCode={state.stopLoss.currencyCode}
									isLoss={state.stopLoss.isLoss}
								/>
							</div>
						</div>
					</div>
				</CardBody>
			</Card>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col" noValidate>
				<div className="grid xs:grid-cols-1 md:grid-cols-3 xs:gap-unit-xs md:gap-unit-md">
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

					{targets.map((target, index) => (
						<Card key={target.id}>
							<CardHeader className="font-bold">Target {index + 1}</CardHeader>
							<CardBody className="grid grid-cols-2 gap-unit-md">
								{/* Target Input */}
								<Controller
									control={control}
									name={`targets.${index}.price`}
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

				<div className="grid xs:grid-cols-2 md:grid-cols-6 xs:gap-unit-xs md:gap-unit-md xs:mt-unit-sm md:mt-unit-md">
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
