import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Login } from '../../state/action-creators/auth';
import { useDispatch } from 'react-redux';
import { NavigateFunction } from 'react-router-dom';
export type authType = {
  registerSwitch: boolean;
};
export interface AuthPrompt {
  login: string;
  password: string;
}
type FormValues = {
  login: string;
  password: string;
};

export interface UserData extends AuthPrompt {}
export default function Auth({
  registerSwitchProp,
}: {
  registerSwitchProp: boolean;
}) {
  const dispatch: any = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { register, handleSubmit } = useForm<FormValues>();

  const authedUserPush = (userData: object) => {
    localStorage.setItem('CurrentUser', JSON.stringify(userData));
    dispatch(Login(userData));
    navigate('/');
  };
  const loginCheck = (auth: AuthPrompt, userData: AuthPrompt[]) => {
    userData.forEach(el => {
      el.login === auth.login &&
        el.password === auth.password &&
        authedUserPush(el);
    });
  };
  const UsersRef = useRef<AuthPrompt[]>([]);
  const users = localStorage.getItem('Users');
  users ? (UsersRef.current = JSON.parse(users)) : (UsersRef.current = []);

  const updLocalStorage = (auth: AuthPrompt) => {
    UsersRef.current.push(auth);
    localStorage.setItem('Users', JSON.stringify(UsersRef.current));
  };
  const authCheck = (data: AuthPrompt, registerSwitch: boolean) => {
    registerSwitch ? updLocalStorage(data) : loginCheck(data, UsersRef.current);
  };
  return (
    <>
      <div className="auth__type">
        <Button
          disabled={registerSwitchProp}
          onClick={() => {
            navigate('/signup');
          }}
          className="auth__register-button"
        >
          Register
        </Button>
        <Button
          disabled={!registerSwitchProp}
          onClick={() => {
            navigate('/signin');
          }}
          className="auth__login-button"
        >
          Login
        </Button>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(data => {
          authCheck(data, registerSwitchProp);
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
        <Button type="submit">
          {registerSwitchProp ? 'Register' : 'Login'}
        </Button>
      </form>
    </>
  );
}
