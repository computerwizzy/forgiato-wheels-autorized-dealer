import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterBar from '@/components/FilterBar';

const SERIES = ['Classics', 'Flow Forged', 'Signature'];

test('renders All button and one button per series', () => {
  render(<FilterBar series={SERIES} activeSeries="All" onChange={jest.fn()} />);
  expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  SERIES.forEach(s => expect(screen.getByRole('button', { name: s })).toBeInTheDocument());
});

test('calls onChange with series name when clicked', async () => {
  const onChange = jest.fn();
  render(<FilterBar series={SERIES} activeSeries="All" onChange={onChange} />);
  await userEvent.click(screen.getByRole('button', { name: 'Classics' }));
  expect(onChange).toHaveBeenCalledWith('Classics');
});

test('calls onChange with All when All button clicked', async () => {
  const onChange = jest.fn();
  render(<FilterBar series={SERIES} activeSeries="Classics" onChange={onChange} />);
  await userEvent.click(screen.getByRole('button', { name: 'All' }));
  expect(onChange).toHaveBeenCalledWith('All');
});
