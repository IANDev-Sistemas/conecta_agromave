import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as SecureStore from "expo-secure-store";
import apiPublic from "../api/api";
import { getHashSHA1 } from "../helpers/getHash";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import { useFazenda } from "./FazendaContext";
import { tKeyGenerator } from "../helpers/tKeyGenerator";
import { useSafra } from "./SafraContext";
import { useGrupo } from "./GrupoContext";
import { useProduto } from "./ProdutoContext";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    status: string | null;
    usuario: {
      nome: string;
      codigo: number;
      email: string;
      telefone: string;
      limite:number;
    } | null;
  };
  onLogin?: (cgc: string, password: string, checked: boolean) => Promise<any>;
  onLogout?: () => Promise<any>;
  forgotPassword?: (cgc: string) => Promise<any>;
  checkValidationCode?: (cgc: string, validateCode: string) => Promise<any>;
  changePassword?: (
    cgc: string,
    validateCode: string,
    newPwd: string
  ) => Promise<any>;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const handleNotification = async (msg: string, title: string) => {
  let { status }: any = await Notifications.getPresentedNotificationsAsync();

  if (status !== "granted") {
    await Notifications.requestPermissionsAsync();
  }
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: msg,
    },
    trigger: null,
  });
};

const TOKEN_KEY = "my-jwt";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    status: string | null;
    usuario: {
      nome: string;
      codigo: number;
      email: string;
      telefone: string;
      limite:number;
    } | null;
  }>({
    token: null,
    authenticated: null,
    status: null,
    usuario: null,
  });

  const { carregarFazendas } = useFazenda();
  const { carregarSafras } = useSafra();
  const { carregarGrupos } = useGrupo();
  const { carregarProdutos } = useProduto();




  useEffect(() => {
    const fetchData = async (authState:any) => {
      if (authState.authenticated == true) {
        await carregarFazendas(authState.usuario?.codigo);
        await carregarSafras(authState.usuario?.codigo);
        await carregarGrupos(authState.usuario?.codigo);
        await carregarProdutos(authState.usuario?.codigo);
        console.log("carregado")
      }
    };

    fetchData(authState);
  }, [authState]);


  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const usuarioString = await SecureStore.getItemAsync("Usuario_Details");
  
      if (token) {
        const usuario = usuarioString ? JSON.parse(usuarioString) : null;

        setAuthState({
          token,
          authenticated: true,
          status: "Ok",
          usuario: usuario &&
          typeof usuario === "object" &&
          "nome" in usuario &&
          "codigo" in usuario &&
          "telefone" in usuario &&
          "email" in usuario &&
          "limite" in usuario
            ? usuario
            : null,
        });
  
        if (usuario?.codigo) {
          await carregarFazendas(usuario.codigo);
        }
      }
    };
  
    loadToken();
  }, []);


  
  const login = async (cgc: string, password: string, checked: boolean) => {
    const passwordHash = getHashSHA1(password);
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-public",
          tKey: "ec21c9ee-81fb-4346-8326-8abb8f24efc4",
          scriptFunction: "auth",
          usr: cgc,
          pwd: `!${passwordHash}`,
        },
      });

      if (response.data.status !== "error") {
        if (response.data.status === "needupdate") {
          setAuthState({
            token: null,
            authenticated: false,
            status: "needupdate",
            usuario: null,
          });

          await forgotPassword(cgc);
        } else {


          
          const token = "my-jwt";
          if (checked) {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
          }

          await getDados(cgc);
          return response.data;
        }
      } else {
        return {
          error: true,
          msg: response.data.msg || "Usuário/senha inválido.",
        };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return {
        error: true,
        msg: "Usuário/senha inválido.",
      };
    }
  };

  const forgotPassword = async (cgc: string) => {
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-public",
          tKey: "ec21c9ee-81fb-4346-8326-8abb8f24efc4",
          scriptFunction: "forgotPwd",
          usr: cgc,
        },
      });

      if (response.data.status === "ok") {
        handleNotification(response.data.msg, "E-mail Enviado 📩");

        setAuthState({
          token: null,
          authenticated: false,
          status: "needupdate",
          usuario: null,
        });

        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error during password change:", error);
      return {
        error: true,
        msg: "Invalid details",
      };
    }
  };

  const getDados = async (cgc: string) => {
    const tKey = tKeyGenerator();
  
    console.log("Iniciando getDados para:", cgc); // Log antes da chamada API
  
    const token = "my-jwt";
    try {
      console.log("Tentando realizar requisição..."); // Confirmação da tentativa
  
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-rotas",
          tKey: tKey,
          scriptFunction: "getInfoUser",
          cpfCnpj: cgc,
        },
      });
  
      console.log("Requisição bem-sucedida:", response.data); // Se a requisição funcionar
  
      setAuthState({
        token: token,
        authenticated: true,
        status: "login",
        usuario: response.data,
      });
  
      await SecureStore.setItemAsync(
        "Usuario_Details",
        JSON.stringify(response.data)
      );
  
      return response.data;
    } catch (error) {
      console.error("Erro ao fazer getDados:", error);
      return {
        error: true,
        msg: "Invalid details",
      };
    }
  };
  
  

  const checkValidationCode = async (cgc: string, validationCode: string) => {
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-public",
          tKey: "ec21c9ee-81fb-4346-8326-8abb8f24efc4",
          scriptFunction: "checkValidationCode",
          usr: cgc,
          validationCode: validationCode,
        },
      });

      if (response.data.status === "ok") {
        setAuthState({
          token: null,
          authenticated: false,
          status: "changePassword",
          usuario: null,
        });

        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error during password change:", error);
      return {
        error: true,
        msg: "Invalid details",
      };
    }
  };

  const changePassword = async (
    cgc: string,
    validationCode: string,
    newPwd: string
  ) => {
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-public",
          tKey: "ec21c9ee-81fb-4346-8326-8abb8f24efc4",
          scriptFunction: "updatePwd",
          usr: cgc,
          validationCode: validationCode,
          newPwd: `@${newPwd}`,
        },
      });

      if (response.data.status === "ok") {
        Alert.alert(response.data.msg);

        setAuthState({
          token: null,
          authenticated: false,
          status: "login",
          usuario: null,
        });

        return response.data;
      }
      return response.data;
    } catch (error) {
      console.error("Error during password change:", error);
      return {
        error: true,
        msg: "Invalid details",
      };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
      status: null,
      usuario: null,
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    checkValidationCode: checkValidationCode,
    forgotPassword: forgotPassword,
    changePassword: changePassword,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
