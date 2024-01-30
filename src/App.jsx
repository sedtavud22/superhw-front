import useAuth from "./hooks/useAuth";
import { AppRouter } from "./routes/AppRouter";

function App() {
  const { loading } = useAuth();

  return loading ? (
    <div className="text-center">
      <span className="loading loading-ball loading-lg"></span>
      <span className="loading loading-ball loading-lg"></span>
      <span className="loading loading-ball loading-lg"></span>
    </div>
  ) : (
    <AppRouter />
  );
}

export default App;
