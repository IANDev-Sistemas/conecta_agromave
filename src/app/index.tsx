import { AuthProvider } from "../contexts/AuthContext";
import Router from "../navigation/Router";


export default function Index() {
  return (
      <AuthProvider>
          <Router />
      </AuthProvider>
  );
}


