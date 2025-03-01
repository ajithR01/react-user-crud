import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../../redux/slices/userSlice";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Inputs/FormInput";
import { userSchema, UserSchemaType } from "../../schemas/userSchema";
import { useCreateUserMutation, useUpdateUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";


interface UserFormProps {
  userData?: UserSchemaType | null;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ userData, onClose }) => {
  const {
    control,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: undefined,
      first_name: "",
      last_name: "",
      email: "",
      avatar: "",
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      reset(userData);
    }
  }, [userData, reset]);

  const [createUser, { isLoading: creating }] = useCreateUserMutation();
  const [updateUserApi, { isLoading: updating }] = useUpdateUserMutation();

  const notify = (message: string, type: "success" | "error" = "success") => {
    type === "success" ? toast.success(message) : toast.error(message);
  };

  const onSubmit = async (data: UserSchemaType) => {
    console.log('userdata', data)
    try {
      if (userData) {
        //update call
        const res = await updateUserApi({ id: userData.id, ...data }).unwrap();
        dispatch(updateUser({...res, id:userData.id}));
        notify("User updated successfully!");
      } else {
        // Otherwise, create
       const res = await createUser(data).unwrap();
       dispatch(addUser(res));
       console.log('res from submitted', res)
        notify("User created successfully!");
      }
      onClose();
    } catch (error: any) {
      notify(error.data?.error || "Something went wrong", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput name="first_name" control={control} label="First Name" />
      <FormInput name="last_name" control={control} label="Last Name" />
      <FormInput name="email" control={control} label="Email" type="email" />
      {/* {!userData && <FormInput name="password" control={control} label="Password" type="password" />} */}
      <FormInput name="avatar" control={control} label="Avatar URL" type="url" />

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outlined" onClick={onClose} >
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit" loading={creating || updating}>
        {userData ? "Update User" : "Create User"}
      </Button>
      </div>
    </form>
  );
};

export default UserForm;
