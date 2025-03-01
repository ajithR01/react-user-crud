import React from "react";
import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

interface FormSelectProps {
  name: string;
  control: any;
  label: string;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({ name, control, label, options }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          label={label}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!error}
          helperText={error ? error.message : ""}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default FormSelect;
