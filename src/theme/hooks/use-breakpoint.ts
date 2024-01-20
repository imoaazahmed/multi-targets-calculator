import { useMediaQuery } from 'react-responsive';

const breakpoints = {
  xs: '375px',
  // => @media (min-width: 375px) { ... }

  sm: '640px',
  // => @media (min-width: 640px) { ... }

  md: '768px',
  // => @media (min-width: 768px) { ... }

  lg: '1024px',
  // => @media (min-width: 1024px) { ... }

  xl: '1280px',
  // => @media (min-width: 1280px) { ... }

  '2xl': '1536px',
  // => @media (min-width: 1536px) { ... }
};

export function useBreakpoint() {
  const isMobile = useMediaQuery({
    query: `(max-width: ${breakpoints.sm})`,
  });

  const isTablet = useMediaQuery({
    query: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
  });

  const isDesktop = useMediaQuery({
    query: `(min-width: ${breakpoints.lg})`,
  });

  return { isMobile, isTablet, isDesktop };
}
