import { describe, it, expect } from 'vitest';
import { render } from '@/tests/test-utils';
import App from './App';

describe('Renders App page correctly', async () => {
  it('Should render the page correctly', async () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });
});
