import React from 'react';
import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';

describe('NewsItem', () => {
  const defaultProps = {
    title: 'Test Title',
    description: 'Test Description',
    newsUrl: 'https://example.com/news',
    date: '2023-01-15T12:30:00Z',
    source: 'Test Source',
  };

  test('renders with default props and displays correct information', () => {
    render(<NewsItem {...defaultProps} />);

    // Check title
    expect(screen.getByText('Test Title')).toBeInTheDocument();

    // Check description
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check source badge
    expect(screen.getByText('Test Source')).toBeInTheDocument();

    // Check "Read More" link
    const readMoreLink = screen.getByRole('link', { name: 'Read More' });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', 'https://example.com/news');
    expect(readMoreLink).toHaveAttribute('target', '_blank');

    // Check default image
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg');

    // Check default author
    expect(screen.getByText('By Unknown on Sun, 15 Jan 2023 12:30:00 GMT')).toBeInTheDocument(); // Includes formatted date

    // Check formatted date (already implicitly checked with author, but can be more specific if needed)
    // For example, if author was not present, or if we want to test date formatting independently:
    // expect(screen.getByText(new Date('2023-01-15T12:30:00Z').toGMTString())).toBeInTheDocument();
  });

  test('renders with all props provided and displays correct information', () => {
    const allProps = {
      title: 'Another Test Title',
      description: 'Another Test Description',
      newsUrl: 'https://example.com/another-news',
      imageUrl: 'https://example.com/custom-image.jpg',
      author: 'John Doe',
      date: '2023-02-20T10:00:00Z',
      source: 'Another Source',
    };
    render(<NewsItem {...allProps} />);

    // Check title
    expect(screen.getByText('Another Test Title')).toBeInTheDocument();

    // Check description
    expect(screen.getByText('Another Test Description')).toBeInTheDocument();

    // Check source badge
    expect(screen.getByText('Another Source')).toBeInTheDocument();

    // Check "Read More" link
    const readMoreLink = screen.getByRole('link', { name: 'Read More' });
    expect(readMoreLink).toBeInTheDocument();
    expect(readMoreLink).toHaveAttribute('href', 'https://example.com/another-news');
    expect(readMoreLink).toHaveAttribute('target', '_blank');

    // Check custom image
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/custom-image.jpg');

    // Check provided author and formatted date
    expect(screen.getByText('By John Doe on Mon, 20 Feb 2023 10:00:00 GMT')).toBeInTheDocument();
  });
});
