
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Product from '../product';
import { ProductType } from '../product-modal';
import tags from '../../public/tagsFile.json';

jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(() => <img alt="mocked" />),
}));

describe('Product Component', () => {
  const mockProduct: ProductType = {
    id: '1',
    title: 'Test Product',
    caption: 'This is a test product.',
    price: '100',
    permalink: 'https://example.com',
  };

  it('should render the product details correctly', () => {
    render(<Product {...mockProduct} />);

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(`R$${mockProduct.price}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.caption)).toBeInTheDocument();
  });

  it('should render tags if they are present in the caption', () => {
    const mockTags = [{ id: 'test', name: 'Test Tag', backgroundColor: '#00FF00' }];
    jest.mock('../public/tagsFile.json', () => mockTags, { virtual: true });

    render(<Product {...mockProduct} />);

    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('should render the correct links and icons', () => {
    render(<Product {...mockProduct} />);

    expect(screen.getByRole('link', { name: /Instagram/i })).toHaveAttribute('href', mockProduct.permalink);
    expect(screen.getByRole('link', { name: /Comprar/i })).toHaveAttribute('href', `https://api.whatsapp.com/send?phone=1531998648448&text=Olá!%20Gostaria%20de%20saber%20a%20disponibilidade%20do%20produto:%20${mockProduct.permalink}`);
  });
});