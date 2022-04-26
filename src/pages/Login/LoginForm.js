import React from "react";
import { useForm } from "../../hooks/useForm";

const LoginForm = () => {
  const {
    register,
    // formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data) => {
    console.log("submit data", data);
  };

  console.log("Render Login form");

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e, submit);
        }}
      >
        <label>User Name:</label>
        <input
          type="text"
          {...register("username", { required: true, minLength: 5 })}
        />
        {/* {errors?.username ? <p>Error in User Name</p> : null} */}

        <label>Email:</label>
        <input
          type="email"
          {...register("email", {
            required: true,
            minLength: 8,
            email: true,
          })}
        />
        {/* {errors?.email ? <p>Error in Email</p> : null} */}

        <label>Password:</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 5 })}
        />
        {/* {errors?.password ? <p>Error in Password</p> : null} */}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default LoginForm;
