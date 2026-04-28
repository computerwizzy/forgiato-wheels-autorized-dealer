import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuoteModal from '@/components/QuoteModal';
import { Wheel } from '@/types';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} />,
}));

const WHEEL: Wheel = {
  name: "D'Uno", series: 'Classics',
  imageUrl: 'https://forgiato.com/images/d-uno.jpg', slug: 'd-uno',
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  });
});

test('displays wheel name and series in header', () => {
  render(<QuoteModal wheel={WHEEL} onClose={jest.fn()} />);
  expect(screen.getByText("D'Uno")).toBeInTheDocument();
  expect(screen.getByText('Classics')).toBeInTheDocument();
});

test('calls onClose when X button clicked', async () => {
  const onClose = jest.fn();
  render(<QuoteModal wheel={WHEEL} onClose={onClose} />);
  await userEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(onClose).toHaveBeenCalled();
});

test('submits form with all required fields and shows success', async () => {
  render(<QuoteModal wheel={WHEEL} onClose={jest.fn()} />);

  await userEvent.type(screen.getByLabelText(/full name/i), 'John Smith');
  await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  await userEvent.type(screen.getByLabelText(/phone/i), '555-1234');
  await userEvent.selectOptions(screen.getByLabelText(/year/i), '2023');
  await userEvent.type(screen.getByLabelText(/make/i), 'BMW');
  await userEvent.type(screen.getByLabelText(/model/i), 'M5');

  await userEvent.click(screen.getByRole('button', { name: /send request/i }));

  await waitFor(() => expect(screen.getByText(/request sent/i)).toBeInTheDocument());

  expect(global.fetch).toHaveBeenCalledWith(
    '/api/quote',
    expect.objectContaining({
      method: 'POST',
      body: expect.stringContaining('"vehicleMake":"BMW"'),
    })
  );
});

test('requires vehicle year, make, and model', () => {
  render(<QuoteModal wheel={WHEEL} onClose={jest.fn()} />);
  expect(screen.getByLabelText(/year/i)).toBeRequired();
  expect(screen.getByLabelText(/make/i)).toBeRequired();
  expect(screen.getByLabelText(/model/i)).toBeRequired();
});
