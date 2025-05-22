import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  });

  test('renders brand link', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const brandLink = screen.getByRole('link', { name: 'News' });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveAttribute('href', '/');
  });

  test('renders all navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const navLinks = [
      { name: 'Home', href: '/' },
      { name: 'Business', href: '/business' },
      { name: 'Entertainment', href: '/entertainment' },
      { name: 'General', href: '/general' },
      { name: 'Health', href: '/health' },
      { name: 'Science', href: '/science' },
      { name: 'Sports', href: '/sports' },
      { name: 'Technology', href: '/technology' },
    ];

    navLinks.forEach(link => {
      const navLink = screen.getByRole('link', { name: link.name });
      expect(navLink).toBeInTheDocument();
      expect(navLink).toHaveAttribute('href', link.href);
    });
  });

  test('renders the navbar toggler button', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const togglerButton = screen.getByRole('button', { class: 'navbar-toggler' });
    expect(togglerButton).toBeInTheDocument();
  });
});
