import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WheelCard from '@/components/WheelCard';
import { Wheel } from '@/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const WHEEL: Wheel = {
  name: "D'Uno", series: 'Classics',
  imageUrl: 'https://forgiato.com/images/d-uno.jpg', slug: 'd-uno',
};

test('renders wheel name and series', () => {
  render(<WheelCard wheel={WHEEL} onQuoteClick={jest.fn()} />);
  expect(screen.getByText("D'Uno")).toBeInTheDocument();
  expect(screen.getByText('Classics')).toBeInTheDocument();
});

test('renders wheel image with correct src', () => {
  render(<WheelCard wheel={WHEEL} onQuoteClick={jest.fn()} />);
  expect(screen.getByRole('img')).toHaveAttribute('src', WHEEL.imageUrl);
});

test('calls onQuoteClick with wheel when button clicked', async () => {
  const onQuoteClick = jest.fn();
  render(<WheelCard wheel={WHEEL} onQuoteClick={onQuoteClick} />);
  await userEvent.click(screen.getByRole('button', { name: /get a quote/i }));
  expect(onQuoteClick).toHaveBeenCalledWith(WHEEL);
});
