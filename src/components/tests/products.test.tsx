
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Products } from '../products';
import productsData from '../../public/productsFile.json';
import Product from '../product';


jest.mock('./product', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Product Component</div>),
}));

describe('Products Component', () => {
  it('should render the correct number of Product components based on the amount prop', () => {
    const amount = 3;
    const { container } = render(<Products amount={amount} />);
    
    const productComponents = container.querySelectorAll('div');
    expect(productComponents).toHaveLength(amount);
  });

  it('should render the Product components with correct props', () => {
    const amount = 2;
    const products = productsData.slice(0, amount);

    render(<Products amount={amount} />);

    products.forEach((product) => {
      expect(screen.getByText('Product Component')).toBeInTheDocument();
    });
  });
});