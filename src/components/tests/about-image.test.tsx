import * as React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AboutImage } from '../about-image';

jest.mock('next/image', () => {
  const MockImage: React.FC<{ src: string; alt: string; width?: number; height?: number }> = (props) => {
    return <img {...props} />;
  };
  return MockImage;
});

describe('AboutImage Component', () => {
  it('renders an image with the correct props', () => {
    const { getByAltText } = render(<AboutImage />);
    const imageElement = getByAltText('About image');

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', '/about.png');
    expect(imageElement).toHaveAttribute('width', '1920');
    expect(imageElement).toHaveAttribute('height', '1080');
  });
});