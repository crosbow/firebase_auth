import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import Input from "../components/Input";
import { loginWithEmailAndPass } from "../firebase";
const Login = () => {
  const dataFromRegister = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      email: dataFromRegister.state && dataFromRegister.state.email,
      password: dataFromRegister.state && dataFromRegister.state.password,
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await loginWithEmailAndPass(data.email, data.password);
      // console.log(response);
      navigate("/");
    } catch (error) {
      if (error.message.includes("Firebase")) {
        setError("root.firebaseError", {
          type: "firebaseError",
          message: error.message,
        });
      } else {
        setError("root.firebaseError", {
          type: "firebaseError",
          message: error,
        });
      }
    }
  };

  return (
    <FieldSet label={"Login"}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Field label="Email" error={errors.email && errors.email}>
          <Input
            {...register("email", {
              required: "Email is required",
            })}
            id="email"
            type="email"
            placeholder="john@email.com"
          />
        </Field>
        <Field label="Password" error={errors.password && errors.password}>
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must greater or equal 6 character",
              },
              maxLength: {
                value: 20,
                message: "Password must less or equal 20 character",
              },
            })}
            id="password"
            type="password"
            placeholder="Enter password"
          />
        </Field>

        {errors?.root?.firebaseError && (
          <div className="text-red-400">
            {" "}
            {errors?.root?.firebaseError.message}{" "}
          </div>
        )}
        <Field>
          <Button>Login</Button>
        </Field>
      </form>

      <div>
        Don't have an account{" "}
        <Link className="underline text-blue-600" to={"/register"}>
          Register
        </Link>
      </div>
    </FieldSet>
  );
};
export default Login;
