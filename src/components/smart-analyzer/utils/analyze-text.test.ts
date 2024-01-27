import { analyzeText } from './analyze-text';

test('parses correctly formatted input for multiple scenarios', () => {
  const text1 = `
    FLUX-USDT  #Binance 
    Buy-zone:  0.5936 - 0.5958
    First target: 0.6170
    Second target: 0.6561
    Third target: 0.7186
    STOP-LOSS: Close 4hrs candle under the 0.5492
  `;

  const text2 = `
    ZEC-USDT  #Binance 
    Buy-zone:  23.97 - 24.15 
    First target: 25.10
    Second target: 27.71
    Third target: 29.33
    STOP-LOSS: Close 4hrs candle under 22.21
  `;

  const text3 = `
    RVN-USDT  #Binance 
    Buy-zone: 0.02133 - 0.02145 
    First target: 0.02226
    Second target: 0.02371
    Third target: 0.02772
    STOP-LOSS: Close 4hrs candle under 0.01989
  `;

  const result1 = analyzeText(text1);
  expect(result1.coinName).toBe('FLUX-USDT');
  expect(result1.buyPrice).toEqual(['0.5936', '0.5958']);
  expect(result1.targets).toEqual(['0.6170', '0.6561', '0.7186']);
  expect(result1.stopLoss).toBe('0.5492');

  const result2 = analyzeText(text2);
  expect(result2.coinName).toBe('ZEC-USDT');
  expect(result2.buyPrice).toEqual(['23.97', '24.15']);
  expect(result2.targets).toEqual(['25.10', '27.71', '29.33']);
  expect(result2.stopLoss).toBe('22.21');

  const result3 = analyzeText(text3);
  expect(result3.coinName).toBe('RVN-USDT');
  expect(result3.buyPrice).toEqual(['0.02133', '0.02145']);
  expect(result3.targets).toEqual(['0.02226', '0.02371', '0.02772']);
  expect(result3.stopLoss).toBe('0.01989');
});

test('handles variations in formatting', () => {
  const text = `
    CITY-USDT  #Binance 

    buy_zone:  2.973 - 2.990 

    first_target: 3.103
    second_target: 3.251
    third_target: 3.496

    stop_loss: Close 4hrs candle under the 2.755
    `;

  const result = analyzeText(text);

  expect(result.buyPrice).toEqual(['2.973', '2.990']);
  expect(result.targets).toEqual(['3.103', '3.251', '3.496']);
  expect(result.stopLoss).toBe('2.755');
});

test('handles missing data', () => {
  const text = `
    SUI-USDT  #Binance #OKX 

    Buy-zone:   1.2681 - 1.2793  
    `;

  const result = analyzeText(text);

  expect(result.buyPrice).toEqual(['1.2681', '1.2793']);
  expect(result.targets).toEqual(['0', '0', '0']); // Default values as targets are missing
  expect(result.stopLoss).toBe('0'); // Default value as stop loss is missing
});

test('handles incorrectly formatted text', () => {
  const text = `
      Buying at: 1.50 and 1.55
      Targets: 1.60, 1.65, 1.70
      Loss: Under 1.45
    `;

  const result = analyzeText(text);

  // Expect default values as the text does not match the expected format
  expect(result.buyPrice).toEqual(['0', '0']);
  expect(result.targets).toEqual(['0', '0', '0']);
  expect(result.stopLoss).toBe('0');
});
