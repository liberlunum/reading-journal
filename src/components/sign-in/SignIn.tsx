import Auth from '../auth/Auth';
function SignIn() {
  return (
    <>
      <Auth registerSwitchProp={false} />
    </>
  );
}

export default SignIn;
