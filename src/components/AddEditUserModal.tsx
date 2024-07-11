// src/components/AddEditUserModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';
import { User } from '../types/User';

interface AddEditUserModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  onDelete: (userId: number) => void;
  user?: User | null;
}

const AddEditUserModal: React.FC<AddEditUserModalProps> = ({
  open,
  onClose,
  onSave,
  onDelete,
  user,
}) => {
  const [userData, setUserData] = useState<User>({
    id: 0,
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setUserData(user);
    } else {
      setUserData({ id: 0, name: '', email: '' });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(userData);
    onClose();
  };

  const handleDelete = () => {
    if (user && user.id) {
      onDelete(user.id);
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          value={userData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          value={userData.email}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        {user && (
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        )}
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditUserModal;
