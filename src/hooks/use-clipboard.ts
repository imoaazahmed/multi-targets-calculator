import { useCallback, useState } from 'react';

export const useClipboard = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopy = useCallback(async (text: string, duration = 1000): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), duration);
      return true;
    } catch (error) {
      console.error('Failed to copy: ', error);
      return false;
    }
  }, []);

  const onPaste = useCallback(async (): Promise<string> => {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch (error) {
      console.error('Failed to paste: ', error);
      return '';
    }
  }, []);

  return { onCopy, onPaste, hasCopied };
};
