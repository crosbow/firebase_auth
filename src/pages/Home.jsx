import { addDoc, collection } from "firebase/firestore";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import Feedbacks from "../components/Feedbacks";
import Field from "../components/Field";
import FieldSet from "../components/FieldSet";
import Input from "../components/Input";
import { db } from "../firebase";
import useAuthState from "../hooks/useAuthState";

const Home = () => {
  const { user, loading } = useAuthState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm();

  if (loading) return <h2>Buffering...</h2>;

  const onSubmit = async ({ feedback }) => {
    try {
      await addDoc(collection(db, "feedbacks"), {
        feedback,
        timestamp: new Date(),
      });
      reset();
    } catch (error) {
      setError("root.firebaseError", {
        type: "firebaseError",
        message: error.message,
      });
    }
  };

  return (
    <div>
      <FieldSet label="Send Feedback">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field error={errors.feedback && errors.feedback}>
            <Input
              {...register("feedback", {
                required: "Write something on the textbox",
              })}
              id="feedback"
              type="text"
              placeholder="Feedback"
            />
          </Field>
          <Field>
            <Button className="mt-3">Send</Button>
          </Field>
        </form>

        {errors?.root?.firebaseError && (
          <div className="text-red-400">
            {errors?.root?.firebaseError.message}{" "}
          </div>
        )}
      </FieldSet>

      {user && <Feedbacks />}
    </div>
  );
};
export default Home;
