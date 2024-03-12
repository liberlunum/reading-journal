import { Button, TextField, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useCallback, useState } from 'react';
import { Login } from '../../state/action-creators/auth';
import { useDispatch } from 'react-redux';
import { NavigateFunction } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { UserType } from '../../types/AuthTypes';
import './Auth.css';
import { AuthPrompt, FormValues, alertType } from '../../types/AuthTypes';

export default function Auth({
  registerSwitchProp,
}: {
  registerSwitchProp: boolean;
}) {
  const dispatch = useAppDispatch();

  const navigate: NavigateFunction = useNavigate();
  const initialState: alertType = {
    registerErrorShow: false,
    loginErrorShow: false,
    passErrorShow: false,
    login: '',
    uniqueErrorShow: false,
  };
  const [alert, setAlert] = useState<alertType>(initialState);
  const { register, handleSubmit, formState } = useForm<FormValues>();
  const { errors } = formState;
  const authedUserPush = useCallback(
    (userData: UserType) => {
      localStorage.setItem('CurrentUser', JSON.stringify(userData));
      dispatch(Login(userData));
      navigate('/');
    },
    [dispatch, navigate]
  );
  const loginCheck = (auth: AuthPrompt, userData: UserType[]) => {
    const matchingEl1 = userData.findIndex(el => el.login === auth.login);
    const matchingEl2 = userData.findIndex(el => el.password === auth.password);
    matchingEl1 === matchingEl2 && matchingEl1 >= 0
      ? authedUserPush(userData[matchingEl1])
      : matchingEl1 < 0
        ? setAlert({ ...initialState, loginErrorShow: true })
        : setAlert({ ...initialState, passErrorShow: true });
  };

  const UsersRef = useRef<UserType[]>([]);
  const users = localStorage.getItem('Users');
  users ? (UsersRef.current = JSON.parse(users)) : (UsersRef.current = []);
  const uploadToLocalStorage = (user: UserType) => {
    UsersRef.current.push({
      login: user.login,
      password: user.password,
      favorites: [],
      history: [],
    });
    localStorage.setItem('Users', JSON.stringify(UsersRef.current));
    setAlert({ ...initialState, registerErrorShow: true, login: user.login });
  };
  const checkUniqueness = (auth: AuthPrompt) => {
    UsersRef.current.findIndex(el => el.login === auth.login) < 0
      ? uploadToLocalStorage({
          login: auth.login,
          password: auth.password,
          history: [],
          favorites: [],
        })
      : setAlert({ ...initialState, uniqueErrorShow: true });
  };
  const authCheck = (data: AuthPrompt, registerSwitch: boolean) => {
    registerSwitch ? checkUniqueness(data) : loginCheck(data, UsersRef.current);
  };
  return (
    <>
      <form
        className={'authForm'}
        action=""
        onSubmit={handleSubmit(data => {
          authCheck(data, registerSwitchProp);
        })}
      >
        {alert.loginErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="error">
            Not registered login!
          </Alert>
        )}
        {alert.passErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="error">
            Wrong password!
          </Alert>
        )}
        {alert.registerErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="success">
            Congratulations, {alert.login}. You have successfully registered!
          </Alert>
        )}
        {alert.uniqueErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="error">
            Not unique login!
          </Alert>
        )}
        <div className="auth__input-fields">
          <TextField
            {...register('login', {
              pattern: {
                value: /(\d|\w)+/,
                message: 'Login cannot contain special characters',
              },
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Minimal login length is 3 symbols',
              },
            })}
            label="Login"
            type="text"
          />
          <p>{errors.login?.message}</p>
          <TextField
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 8,
                message: 'Minimal password length is 8 symbols',
              },
            })}
            label="Password"
            type="text"
          />
          <p>{errors.password?.message}</p>
        </div>
        <Button type="submit">
          {registerSwitchProp ? 'Register' : 'Login'}
        </Button>
      </form>
    </>
  );
}
