// src/components/UserList.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import UserList from './UserList';
import { UserProvider } from '../context/UserContext';

test('renders user list', () => {
  render(
    <UserProvider>
      <UserList setSelectedUser={jest.fn()} setOpen={jest.fn()} />
    </UserProvider>,
  );
  const linkElement = screen.getByText(/Add User/i);
  expect(linkElement).toBeInTheDocument();
});
