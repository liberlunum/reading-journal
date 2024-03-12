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
  const [modal, setModal] = useState<alertType>({
    registerErrorShow: false,
    loginPassErrorShow: false,
    login: '',
    uniqueErrorShow: false,
  });
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
    const matchingEl = userData.findIndex(
      el => el.login === auth.login && el.password === auth.password
    );
    matchingEl >= 0
      ? authedUserPush(userData[matchingEl])
      : setModal({ ...modal, loginPassErrorShow: true });
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
    setModal({ ...modal, registerErrorShow: true, login: user.login });
  };
  const checkUniqueness = (auth: AuthPrompt) => {
    UsersRef.current.findIndex(el => el.login === auth.login) < 0
      ? uploadToLocalStorage({
          login: auth.login,
          password: auth.password,
          history: [],
          favorites: [],
        })
      : setModal({ ...modal, uniqueErrorShow: true });
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
        {modal.loginPassErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="error">
            Wrong login or password!
          </Alert>
        )}
        {modal.registerErrorShow && (
          <Alert className={'registerAlertSuccess'} severity="success">
            Congratulations, {modal.login}. You have successfully registered!
          </Alert>
        )}
        {modal.uniqueErrorShow && (
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
