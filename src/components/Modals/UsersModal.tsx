import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { closeModal } from "../../redux/slices/userModalSlice";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import UserForm from "../Forms/UserForm";

const UserModal: React.FC = () => {
  const dispatch = useDispatch();
  const { open, userData } = useSelector((state: RootState) => state.userModal);

  return (
    <Dialog open={open} onClose={() => dispatch(closeModal())} maxWidth="sm" fullWidth>
      <DialogTitle className="text-lg font-semibold">
        {userData ? "Edit User" : "Create User"}
      </DialogTitle>
      <DialogContent>
        <UserForm userData={userData} onClose={() => dispatch(closeModal())} />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
