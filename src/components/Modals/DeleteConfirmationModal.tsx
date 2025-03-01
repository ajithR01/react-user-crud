import React from "react";

interface DeleteConfirmationModalProps {
  setShowConfirmDialog: (show: boolean) => void;
  confirmDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  setShowConfirmDialog,
  confirmDelete,
}) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <p className="text-lg font-semibold">
            Are you sure you want to delete this user?
          </p>
          <div className="flex justify-end gap-3 mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancel
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={confirmDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
