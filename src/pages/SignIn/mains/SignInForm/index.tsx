// libs
import { useTypedForm } from "@/hooks/useTypedForm";
// components
import SubmitBtn from "../../components/SubmitBtn";
// others
import classes from "./SignInForm.module.scss";

/**
 * SignInForm
 */
export default function SignInForm() {
  const { register } = useTypedForm("SignIn");

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>Sign in</div>
      <form>
        {/* <div className={classes.formItem}>
          <TextField
            {...register("username")}
            autoComplete="username"
            id="username"
            label="Username"
          />
        </div>
        <div className={classes.formItem}>
          <TextField
            {...register("password")}
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
        </div>
        <SubmitBtn /> */}
      </form>
    </div>
  );
}
