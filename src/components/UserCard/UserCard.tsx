import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { User } from "../../types/user";
import { openModal } from "../../redux/slices/userModalSlice";
import DeleteConfirmationModal from "../Modals/DeleteConfirmationModal";
import { deleteUser } from "../../redux/slices/userSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDeleteUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";

interface UserProps {
  filteredUsers: User[];
}

const UserCard: React.FC<UserProps> = ({ filteredUsers }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [hoveredUserId, setHoveredUserId] = useState<number | null>(null);

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
        console.log('selectedUser', selectedUser.id)
        // const response =
         await deleteUserApi(selectedUser.id).unwrap();
        // if (response) {
          dispatch(deleteUser(selectedUser));
          notify("User deleted success fully!");
        // }
      }
    } catch (error: any) {
      notify(error.data?.error || "Something went wrong", "error");
    }

    setShowConfirmDialog(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="relative bg-white shadow-md rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg"
            onMouseEnter={() => setHoveredUserId(user.id)}
            onMouseLeave={() => setHoveredUserId(null)}
          >
            <img
              src={user.avatar}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto"
            />
            <h3 className="mt-3 font-semibold text-lg">
              {user.first_name} {user.last_name}
            </h3>
            <p className="text-gray-500">{user.email}</p>

            {hoveredUserId === user.id && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg transition-opacity">
                <button
                  className="bg-blue-500 text-white p-3 rounded-full mr-3 hover:bg-blue-600"
                  onClick={() => dispatch(openModal(user))}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600"
                  onClick={() => handleDeleteClick(user)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showConfirmDialog && (
        <DeleteConfirmationModal
          setShowConfirmDialog={setShowConfirmDialog}
          confirmDelete={confirmDelete}
        />
      )}
    </>
  );
};

export default UserCard;
