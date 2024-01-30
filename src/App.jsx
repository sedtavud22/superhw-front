import useAuth from "./hooks/useAuth";
import LoginForm from "./layouts/LoginForm";
import RegisterForm from "./layouts/RegisterForm";

function App() {
  const { user } = useAuth();

  return (
    <>
      <div>
        <input
          type="checkbox"
          value="light"
          className="toggle theme-controller"
        />
      </div>
      {/* <RegisterForm /> */}
      <LoginForm />
    </>
  );
}

export default App;
