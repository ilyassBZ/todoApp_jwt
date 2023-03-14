import React from "react";
import "./loginpage.css";
import { useEffect, useState } from "react";
import { appendErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormRow from "../components/formRow";
import { useAppContext } from "../context/appContext";
import Alert from "../components/Alert";
import { Navigate, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  isMember: true,
};

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});

const schema2 = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
  userName: yup.string().min(5).required(),
  confirmPassword: yup.string().oneOf([yup.ref("password")]),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    formProps,
  } = useForm({
    resolver: values.isMember ? yupResolver(schema) : yupResolver(schema2),
  });

  const onSubmit = (e) => {
    const { userName, email, password, isMember } = values;
    const currentUser = { userName, email, password };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    console.log(values);
    reset();
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <div className='form-box'>
      <div className='login'>
        <form
          className='form'
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        >
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          <Alert />
          <div className='field1'>
            {!values.isMember && (
              <FormRow
                labelText='Username'
                name='userName'
                type='text'
                required
                errors={errors}
                register={register}
                handleChange={handleChange}
                value={values.userName}
                isMember={values.isMember}
              />
            )}
            <FormRow
              labelText='Email'
              name='email'
              type='email'
              errors={errors}
              register={register}
              handleChange={handleChange}
              value={values.email}
            />
            <FormRow
              name='password'
              labelText='Password'
              type='password'
              errors={errors}
              register={register}
              handleChange={handleChange}
              value={values.password}
            />
            {!values.isMember && (
              <FormRow
                name='confirmPassword'
                labelText='Confirm Password'
                type='password'
                errors={errors}
                register={register}
                handleChange={handleChange}
                value={values.confirmPassword}
              />
            )}

            <div className='row'>
              <p>
                {values.isMember ? "Not a member ?" : "Already a member ?"}
             
                <button
                  className='toggleBtn'
                  type='button'
                  onClick={toggleMember}
                >
                  {values.isMember ?"Register" :  "Login"}
                </button>
              </p>
              <div className='col text-center'>
                <button
                  className='btn btn-block'
                  type='submit'
                  disabled={isLoading}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
