// src/App.tsx
import React, { useState, useContext } from 'react';
import { UserProvider, UserContext } from './context/UserContext';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import { Container, Button } from '@mui/material';
import { User } from './types/User';

const App: React.FC = () => {
  const { state, dispatch } = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <UserProvider>
      <Container>
        <Button variant="contained" onClick={handleAddUser}>
          Add User
        </Button>
        <UserList setSelectedUser={setSelectedUser} setOpen={setIsModalOpen} />
        <UserDetails
          open={isModalOpen}
          setOpen={setIsModalOpen}
          selectedUser={selectedUser}
        />
      </Container>
    </UserProvider>
  );
};

export default App;
