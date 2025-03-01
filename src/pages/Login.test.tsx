// import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useLoginUserMutation } from "../redux/api/authApi"; // Adjust the import path as needed
import Login from "./Login"; // Adjust the path to your Login component

jest.mock("../redux/api/authApi", () => ({
  useLoginUserMutation: jest.fn(),
}));

describe("Login Component", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (useLoginUserMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: false },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () => {
    render(<Login />);
  };

  it("renders login form correctly", () => {
    renderComponent();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("calls login mutation on form submit", () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("disables login button when loading", () => {
    (useLoginUserMutation as jest.Mock).mockReturnValue([
      mockLogin,
      { isLoading: true },
    ]);

    renderComponent();
    expect(screen.getByRole("button", { name: /login/i })).toBeDisabled();
  });
});
