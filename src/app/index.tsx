import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/AuthContext";
import Router from "../navigation/Router";
import { FazendaProvider } from "../contexts/FazendaContext";

export default function Index() {
  return (
    <FazendaProvider>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </FazendaProvider>
  );
}
