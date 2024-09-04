
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SearchProducts } from '../search-products';
import { useSearchParams } from 'next/navigation';
import { useToast } from '../ui/use-toast';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('./ui/use-toast', () => ({
  useToast: jest.fn(),
}));

jest.mock('./product', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Product Component</div>),
}));

describe('SearchProducts Component', () => {
  const mockToast = jest.fn();
  const mockUseSearchParams = useSearchParams as jest.Mock;
  const mockUseToast = useToast as jest.Mock;

  beforeEach(() => {
    mockUseSearchParams.mockReturnValue({ get: () => 'test query' });
    mockUseToast.mockReturnValue({ toast: mockToast });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should display loading message initially', () => {
    render(<SearchProducts />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display products when fetch is successful', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: '1', title: 'Test Product', caption: 'Test Caption', price: '100', permalink: 'https://example.com' }]),
      })
    ) as jest.Mock;

    render(<SearchProducts />);

    await waitFor(() => {
      expect(screen.getByText('Product Component')).toBeInTheDocument();
    });
  });

  it('should display error alert if no products are found', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    ) as jest.Mock;

    render(<SearchProducts />);

    await waitFor(() => {
      expect(screen.getByText('Não foi possível carregar produtos com a sua pesquisa')).toBeInTheDocument();
    });
  });

  it('should display error alert if fetch fails', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Fetch error'))
    ) as jest.Mock;

    render(<SearchProducts />);

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        variant: 'destructive',
        title: 'Erro ao pesquisar produtos',
        description: 'Fetch error',
      });
    });
  });
});