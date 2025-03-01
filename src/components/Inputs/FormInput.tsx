import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, control, label, type = "text" }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label={label}
          type={type}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : ""}
        />
      )}
    />
  );
};

export default FormInput;
