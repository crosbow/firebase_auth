import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import Input from "../components/Input";
import { registerWithEmailAndPass } from "../firebase";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerWithEmailAndPass(data.email, data.password);

      navigate("/login", {
        state: {
          ...data,
        },
      });
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
    <FieldSet label={"Register"}>
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
        <Field>
          <Button>Register</Button>
        </Field>
      </form>

      {errors?.root?.firebaseError && (
        <div className="text-red-400">
          {" "}
          {errors?.root?.firebaseError.message}{" "}
        </div>
      )}

      <div>
        Already have an account{" "}
        <Link className="underline text-blue-600" to={"/login"}>
          Login
        </Link>
      </div>
    </FieldSet>
  );
};
export default Register;
