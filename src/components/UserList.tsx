// src/components/UserList.tsx
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { User } from '../types/User';
import { List, ListItem, ListItemText, Avatar, Box } from '@mui/material';
import axios from 'axios';

interface UserListProps {
  setSelectedUser: (user: User) => void;
  setOpen: (open: boolean) => void;
}

const UserList: React.FC<UserListProps> = ({ setSelectedUser, setOpen }) => {
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch({ type: 'SET_USERS', payload: response.data });
    };
    fetchUsers();
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <List>
      {state.users.map((user) => (
        <ListItem key={user.id} button onClick={() => handleUserClick(user)}>
          <Box display="flex" alignItems="center">
            <Avatar src={`https://picsum.photos/seed/${user.id}/50`} />
            <ListItemText
              primary={user.name}
              secondary={user.email}
              sx={{ ml: 2 }}
            />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
