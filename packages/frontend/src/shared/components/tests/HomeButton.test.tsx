import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomeButton from '../HomeButton';
import { useLocation, useNavigate } from 'react-router-dom';

// מוק ל־useNavigate
const mockNavigate = jest.fn();

// מוקים ל־react-router
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: () => mockNavigate,
}));

describe('HomeButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('לא מציג את הכפתור כאשר הנתיב הוא /home', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/home' });

    render(<HomeButton />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('מציג את הכפתור כאשר הנתיב הוא שונה מ־/home', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/login' });

    render(<HomeButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('מעביר ל־/home כאשר לוחצים על הכפתור', () => {
    (useLocation as jest.Mock).mockReturnValue({ pathname: '/dashboard' });

    render(<HomeButton />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/home');
  });
});
