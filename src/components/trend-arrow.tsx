import { FaArrowTrendUp, FaArrowTrendDown } from 'react-icons/fa6';

interface TrendArrowProps {
  isDown?: boolean;
}

export const TrendArrow = ({ isDown = false }: TrendArrowProps) => {
  if (isDown) {
    return <FaArrowTrendDown fill='#ff4d4d' />;
  }

  return <FaArrowTrendUp fill='#6ccf59' />;
};
