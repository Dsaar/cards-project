import FormPageLayout from '../layout/FormPageLayout';
import LoginForm from '../users/components/LoginForm';

function LoginPage() {
  return (
    <FormPageLayout sx={{pt:15}}>
      <LoginForm />
    </FormPageLayout>
  );
}
export default LoginPage;
