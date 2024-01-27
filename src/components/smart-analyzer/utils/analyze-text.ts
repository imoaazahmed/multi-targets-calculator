type AnalysisResult = {
  coinName: string;
  targets: string[];
  stopLoss: string;
  buyPrice: string[];
};

export const analyzeText = (text: string): AnalysisResult => {
  // Regular expressions to match the pattern in the text
  const coinNamePattern = /(\b[A-Z]+-[A-Z]+\b)/; // Added pattern to capture coin name
  const buyZonePattern = /buy\s*[-_]*zone:\s*(\d+\.\d+)\s*-\s*(\d+\.\d+)/i;
  const targetPattern =
    /first\s*[-_]*target:\s*(\d+\.\d+)\s+second\s*[-_]*target:\s*(\d+\.\d+)\s+third\s*[-_]*target:\s*(\d+\.\d+)/i;
  const stopLossPattern = /stop\s*[-_]*loss.*?under\s*(?:the\s*)?(\d*\.?\d+)/i;

  // Extract values using regex
  const coinNameMatch = text.match(coinNamePattern);
  const buyZoneMatch = text.match(buyZonePattern);
  const targetMatch = text.match(targetPattern);
  const stopLossMatch = text.match(stopLossPattern);

  return {
    coinName: coinNameMatch ? coinNameMatch[0] : 'Unknown', // Extracted coin name
    targets: [targetMatch?.[1] ?? '0', targetMatch?.[2] ?? '0', targetMatch?.[3] ?? '0'],
    stopLoss: stopLossMatch?.[1] ?? '0',
    buyPrice: [buyZoneMatch?.[1] ?? '0', buyZoneMatch?.[2] ?? '0'],
  };
};
