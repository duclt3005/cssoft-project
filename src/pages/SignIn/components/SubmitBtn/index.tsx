// hooks
import { useTypedForm } from "@/hooks/useTypedForm";
import { Button } from "antd";

/**
 * SubmitBtn
 */
export default function SubmitBtn() {
  const { getValues } = useTypedForm("SignIn");

  return (
    <>dds</>
    // <Button
    //   variant="contained"
    //   onClick={() => {
    //     const { username, password } = getValues();
    //     // TODO:
    //     // eslint-disable-next-line no-alert
    //     alert({ username, password });
    //   }}
    // >
    //   Sign In
    // </Button>
  );
}
