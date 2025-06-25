import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../../shared/api/passwordApi";
import { ResetFormData } from "../types/types";

const schema: yup.ObjectSchema<ResetFormData> = yup.object({
  password: yup.string().required("שדה חובה").min(6, "לפחות 6 תווים"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password")], "הסיסמאות אינן תואמות")
    .required("שדה חובה"),
}).required();

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: yupResolver(schema),
  });

  const [resetPassword, { isLoading, isError, isSuccess, error }] = useResetPasswordMutation();

  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const onSubmit = async (data: ResetFormData) => {
    try {
      if (!token) throw new Error("טוקן חסר");
      await resetPassword({ token, password: data.password }).unwrap();
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>איפוס סיסמה</h2>

      <label>סיסמה חדשה:</label>
      <input type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <label>אימות סיסמה:</label>
      <input type="password" {...register("confirm")} />
      {errors.confirm && <p>{errors.confirm.message}</p>}

      <button type="submit" disabled={isSubmitting || isLoading}>
        {isLoading ? "טוען..." : "איפוס סיסמה"}
      </button>

      {isError && (
        <p style={{ color: "red" }}>
          {(error as any)?.data?.message || "אירעה שגיאה"}
        </p>
      )}
      {isSuccess && <p>הסיסמה אופסה בהצלחה!</p>}
    </form>
  );
};

export default ResetPassword;
