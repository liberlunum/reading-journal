import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useState, useRef } from 'react';
export type authType = {
  registerSwitch: boolean;
};
export type authPrompt = {
  login: string;
  password: string;
};
type FormValues = {
  login: string;
  password: string;
};

export default function Auth({
  registerSwitchProp,
}: {
  registerSwitchProp: boolean;
}) {
  const [registerSwitch, setRegisterSwitch] = useState(registerSwitchProp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const authSwitch = (mode: boolean) => {
    console.log('1');
    if (registerSwitch !== mode) setRegisterSwitch(mode);
  };
  const loginCheck = (auth: authPrompt, userData: authPrompt[]) => {
    userData.forEach(el => {
      el.login === auth.login &&
        el.password === auth.password &&
        localStorage.setItem('Authed', 'true');
    });
    console.log(localStorage.getItem('Authed'));
  };

  const UsersRef = useRef<authPrompt[]>([]);
  const updLocalStorage = (auth: authPrompt) => {
    const users = localStorage.getItem('Users');
    if (users) UsersRef.current = JSON.parse(users);
    UsersRef.current.push(auth);
    localStorage.setItem('Users', JSON.stringify(UsersRef.current));
  };
  const authCheck = (data: authPrompt, registerSwitch: boolean) => {
    registerSwitch ? updLocalStorage(data) : loginCheck(data, UsersRef.current);
  };
  console.log(errors);
  return (
    <>
      <div className="auth__type">
        <Button
          disabled={registerSwitch}
          onClick={() => {
            authSwitch(true);
          }}
          className="auth__register-button"
        >
          Register
        </Button>
        <Button
          disabled={!registerSwitch}
          onClick={() => {
            authSwitch(false);
          }}
          className="auth__login-button"
        >
          Login
        </Button>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(data => {
          authCheck(data, registerSwitch);
        })}
      >
        <div className="auth__input-fields">
          <TextField
            {...register('login', {
              pattern: {
                value: /^[a-zA-Z0-9]{4,10}$/,
                message: 'Login cannot contain special character',
              },
              required: 'This field is required',
              minLength: 3,
            })}
            label="Login"
            type="text"
          />
          <TextField
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 4,
                message: 'Minimal password length is 8 symbols',
              },
            })}
            label="Password"
            type="text"
          />
        </div>
        <Button type="submit">{registerSwitch ? 'Register' : 'Login'}</Button>
      </form>
    </>
  );
}
