import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../types/user";
import { openModal } from "../../redux/slices/userModalSlice";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { deleteUser } from "../../redux/slices/userSlice";
import { useDeleteUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Avatar,
} from "@mui/material";

interface UserProps {
  filteredUsers: User[];
}

const UserList: React.FC<UserProps> = ({ filteredUsers }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [deleteUserApi] = useDeleteUserMutation();

  const notify = (message: string, type: "success" | "error" = "success") => {
    type === "success" ? toast.success(message) : toast.error(message);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    try {
      if (selectedUser) {
        await deleteUserApi(selectedUser.id).unwrap();
        dispatch(deleteUser(selectedUser));
        notify("User deleted successfully!");
      }
    } catch (error: any) {
      notify(error.data?.error || "Something went wrong", "error");
    }

    setShowConfirmDialog(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableContainer component={Paper} className="shadow-md rounded-lg">
        <Table aria-label="users table">
          <TableHead className="bg-gray-200">
            <TableRow>
              <TableCell className="font-semibold">Avatar</TableCell>
              <TableCell className="font-semibold">Email</TableCell>
              <TableCell className="font-semibold">First Name</TableCell>
              <TableCell className="font-semibold">Last Name</TableCell>
              <TableCell className="font-semibold text-center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-100">
                <TableCell>
                  <Avatar src={user.avatar} alt="avatar" />
                </TableCell>
                <TableCell>
                  <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">
                    {user.email}
                  </a>
                </TableCell>
                <TableCell>{user.first_name}</TableCell>
                <TableCell>{user.last_name}</TableCell>
                <TableCell className="flex gap-2 justify-center space-x-2">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => dispatch(openModal(user))}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDeleteClick(user)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showConfirmDialog && (
        <DeleteConfirmationModal setShowConfirmDialog={setShowConfirmDialog} confirmDelete={confirmDelete} />
      )}
    </>
  );
};

export default UserList;
