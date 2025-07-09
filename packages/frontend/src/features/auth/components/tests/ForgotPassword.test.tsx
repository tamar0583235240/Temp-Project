import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../../features/auth/store/authSlice";

// משתנה גישה דינמית מתוך הטסטים
let mockForgotPassword = jest.fn();
let mockIsSuccess = false;

jest.mock("../../../../shared/api/passwordApi", () => ({
  useForgotPasswordMutation: () => [
    mockForgotPassword,
    {
      isLoading: false,
      isSuccess: mockIsSuccess,
      error: null,
    },
  ],
}));

jest.mock("../../../../shared/api/authApi", () => ({
  authApi: {
    endpoints: {
      refreshToken: {
        matchPending: () => false,
        matchFulfilled: () => false,
        matchRejected: () => false,
      },
    },
  },
}));

let logSpy: jest.SpyInstance;
let errorSpy: jest.SpyInstance;
let warnSpy: jest.SpyInstance;

beforeAll(() => {
  logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
});

afterAll(() => {
  logSpy.mockRestore();
  errorSpy.mockRestore();
  warnSpy.mockRestore();
});

function renderWithProviders(ui: React.ReactNode) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        user: null,
        token: null,
        loggedIn: false,
        loading: false,
        error: null,
        isAdmin: false,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>
  );
}

describe("ForgotPassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsSuccess = false;
  });

  test("מציג את הטופס עם שדה אימייל וכפתור", () => {
    renderWithProviders(<ForgotPassword />);
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button", { name: /שלח קישור/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("מראה שגיאה כאשר לוחצים שליחה בלי למלא אימייל", async () => {
    renderWithProviders(<ForgotPassword />);
    fireEvent.click(screen.getByRole("button", { name: /שלח קישור/i }));
    expect(await screen.findByText(/שדה חובה/i)).toBeInTheDocument();
  });

  test("שולח קריאה ל־forgotPassword כאשר האימייל תקין", async () => {
    mockForgotPassword.mockReturnValue({ unwrap: () => Promise.resolve() });

    renderWithProviders(<ForgotPassword />);
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "test@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /שלח קישור/i }));

    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith({ email: "test@example.com" });
    });
  });

  test("מציג הודעת הצלחה אחרי שליחה מוצלחת", async () => {
    mockIsSuccess = true;
    renderWithProviders(<ForgotPassword />);
    expect(await screen.findByText((t) =>
      /אם.*נשלחה אליו הודעה/.test(t)
    )).toBeInTheDocument();
  });
});
