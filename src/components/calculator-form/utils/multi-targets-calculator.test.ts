import { multiTargetsCalculator } from './multi-targets-calculator';

test('calculates correct values for standard input', () => {
  const input1 = {
    investedAmount: 500,
    buyPrice: 2.973,
    stopLossPrice: 2.755,
    targets: [
      { sellingPercentage: 33.33, price: 3.103 },
      { sellingPercentage: 33.33, price: 3.251 },
      { sellingPercentage: 33.33, price: 3.496 },
    ],
  };

  const expectedOutput1 = {
    numberOfCoins: 168.18028927009755,
    profit: 52.18673057517654,
    profitPercentage: 10.437346115035307,
    totalRevenue: 552.1367305751766,
    isLoss: false,
    stopLoss: 36.663303060881276,
    stopLossPercentage: 7.332660612176254,
    totalStopLossRevenue: 463.3366969391187,
    targetDetails: [
      {
        price: 3.103,
        profit: 7.28708375378406,
        revenue: 173.93708375378407,
        sellingPercentage: 33.33,
      },
      {
        price: 3.251,
        profit: 15.583148335015096,
        revenue: 182.2331483350151,
        sellingPercentage: 33.33,
      },
      {
        price: 3.496,
        profit: 29.316498486377384,
        revenue: 195.9664984863774,
        sellingPercentage: 33.33,
      },
    ],
  };

  const input2 = {
    investedAmount: 500,
    buyPrice: 0.5936,
    stopLossPrice: 0.5492,
    targets: [
      { sellingPercentage: 33.33, price: 0.617 },
      { sellingPercentage: 33.33, price: 0.6561 },
      { sellingPercentage: 33.33, price: 0.7186 },
    ],
  };

  const expectedOutput2 = {
    numberOfCoins: 842.3180592991913,
    profit: 59.209038072776224,
    profitPercentage: 11.841807614555243,
    totalRevenue: 559.1590380727762,
    isLoss: false,
    stopLoss: 37.39892183288413,
    stopLossPercentage: 7.479784366576824,
    totalStopLossRevenue: 462.6010781671159,
    targetDetails: [
      {
        price: 0.617,
        profit: 6.569423854447422,
        revenue: 173.21942385444743,
        sellingPercentage: 33.33,
      },
      {
        price: 0.6561,
        profit: 17.546538072776258,
        revenue: 184.19653807277626,
        sellingPercentage: 33.33,
      },
      {
        price: 0.7186,
        profit: 35.093076145552544,
        revenue: 201.74307614555255,
        sellingPercentage: 33.33,
      },
    ],
  };

  const output1 = multiTargetsCalculator(input1);
  expect(output1).toEqual(expectedOutput1);

  const output2 = multiTargetsCalculator(input2);
  expect(output2).toEqual(expectedOutput2);
});

test('total profit equals the sum of all target profits', () => {
  const input = {
    investedAmount: 500,
    buyPrice: 2.973,
    stopLossPrice: 2.755,
    targets: [
      { sellingPercentage: 33.33, price: 3.103 },
      { sellingPercentage: 33.33, price: 3.251 },
      { sellingPercentage: 33.33, price: 3.496 },
    ],
  };

  const output = multiTargetsCalculator(input);

  // Calculate sum of individual target profits
  const sumOfTargetProfits = output.targetDetails.reduce((acc, target) => acc + target.profit, 0);

  // Check if the total profit is equal to the sum of individual target profits
  expect(output.profit).toBeCloseTo(sumOfTargetProfits);
});

test('correctly identifies a loss scenario', () => {
  const input = {
    investedAmount: 1000,
    buyPrice: 10,
    stopLossPrice: 9,
    targets: [{ sellingPercentage: 100, price: 8 }],
  };

  const output = multiTargetsCalculator(input);

  expect(output.isLoss).toBe(true);
  expect(output.profit).toBeLessThan(0);
});

test('handles case with no targets', () => {
  const input = {
    investedAmount: 1000,
    buyPrice: 10,
    stopLossPrice: 8,
    targets: [],
  };

  const output = multiTargetsCalculator(input);

  expect(output.totalRevenue).toBe(0);
  expect(output.profit).toBe(0);
});

test('handles zero invested amount', () => {
  const input = {
    investedAmount: 0,
    buyPrice: 10,
    stopLossPrice: 8,
    targets: [
      { sellingPercentage: 50, price: 12 },
      { sellingPercentage: 50, price: 14 },
    ],
  };

  const output = multiTargetsCalculator(input);

  expect(output.numberOfCoins).toBe(0);
  expect(output.profit).toBe(0);
});
