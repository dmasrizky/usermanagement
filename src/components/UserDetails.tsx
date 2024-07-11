// src/components/UserDetails.tsx
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { User } from '../types/User';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

interface UserDetailsProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedUser: User | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  open,
  setOpen,
  selectedUser,
}) => {
  const { dispatch } = useContext(UserContext);
  const [user, setUser] = useState<User | null>(selectedUser);

  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (user) {
      if (user.id) {
        dispatch({ type: 'EDIT_USER', payload: user });
      } else {
        user.id = Date.now(); // Use current timestamp as ID for simplicity
        dispatch({ type: 'ADD_USER', payload: user });
      }
    }
    setOpen(false);
  };

  const handleDelete = () => {
    if (user && user.id) {
      dispatch({ type: 'DELETE_USER', payload: user.id });
    }
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value } as User);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{user?.id ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={user?.name || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={user?.email || ''}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {user?.id && (
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetails;
