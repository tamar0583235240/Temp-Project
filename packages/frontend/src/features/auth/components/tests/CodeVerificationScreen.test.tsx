import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CodeVerificationScreen from "../CodeVerificationScreen";

// ✅ Mock the hooks from verifyCodeApi
jest.mock("../../../../shared/api/verifyCodeApi", () => ({
  useGenerateCodeMutation: () => [
    jest.fn().mockReturnValue({
      unwrap: () => Promise.resolve({ isSent: true }),
    }),
  ],
  useValidateCodeMutation: () => [
    jest.fn().mockReturnValue({
      unwrap: () => Promise.resolve({ valid: true, message: "הקוד תקין." }),
    }),
  ],
}));

describe("CodeVerificationScreen", () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    mockOnSuccess.mockClear();
  });

  it("מציג שדות קלט וכפתורי שליחה", async () => {
    const { container } = render(
      <CodeVerificationScreen
        email="test@example.com"
        onSuccess={mockOnSuccess}
      />
    );

    // Check for expected static elements
    expect(
      screen.getByText("הזן את קוד האימות שנשלח למייל שלך")
    ).toBeInTheDocument();
    expect(screen.getByText("לא קיבלת קוד? שלח מחדש")).toBeInTheDocument();
    expect(screen.getByText("אשר קוד")).toBeInTheDocument();

    // Check that input exists (using container.querySelector for input[type=password])
    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();

    // Simulate resend button click
    fireEvent.click(screen.getByText("לא קיבלת קוד? שלח מחדש"));

    await waitFor(() => {
      expect(screen.getByText("קוד נשלח לאימייל שלך.")).toBeInTheDocument();
    });
  });

  it("מאפשר להקליד קוד ואימות עובר בהצלחה", async () => {
    const { container } = render(
      <CodeVerificationScreen
        email="test@example.com"
        onSuccess={mockOnSuccess}
      />
    );

    const input = container.querySelector('input[type="password"]');
    expect(input).toBeInTheDocument();

    const submitButton = screen.getByText("אשר קוד");

    // Simulate entering a 6-digit code
    fireEvent.change(input!, { target: { value: "123456" } });

    // Click "אשר קוד"
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/הקוד תקין/)).toBeInTheDocument();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
