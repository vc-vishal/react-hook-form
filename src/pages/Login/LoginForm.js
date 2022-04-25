import React from "react";
import { useForm } from "../../hooks/useForm";

const LoginForm = () => {
  const { register, formState, handleSubmit } = useForm();

  const submit = (data) => {
    console.log("data", data);
    console.log("formState", formState);
  };

  console.log("Rendered LoginForm");

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e, submit)}>
        <label>
          User Name:
          <input
            type="text"
            {...register("username", { required: true, minLength: 5 })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            {...register("email", { required: true, minLength: 8 })}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            {...register("password", { required: true, minLength: 5 })}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
