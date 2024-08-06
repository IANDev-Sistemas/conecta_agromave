import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiPublic from '../api/api';
import { getHashSHA1 } from '../helpers/getHash';

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    status: string | null;
  };
  onLogin?: (cgc: string, password: string, checked:boolean) => Promise<any>;
  onLogout?: () => Promise<any>;
  forgotPassword?: (cgc: string) => Promise<any>;
  checkValidationCode?: (cgc:string, validateCode:string) =>Promise<any>
  changePassword?: (cgc:string, validateCode:string, newPwd:string) =>Promise<any>
}

const TOKEN_KEY = 'my-jwt';
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
    status:string |null;
  }>({
    token: null,
    authenticated: null,
    status: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({
          token,
          authenticated: true,
          status:"Ok"
        });
      }
    };
    loadToken();
  }, []);


  const login = async (cgc: string, password: string, checked:boolean) => {
    const passwordHash = getHashSHA1(password)

    try {
      const response = await apiPublic.get('/odwctrl', {
        params: {
          action: 'execTarefa',
          apelido: 'CNTAGROMAVE-api-public',
          tKey: 'ec21c9ee-81fb-4346-8326-8abb8f24efc4',
          scriptFunction: 'auth',
          usr: cgc,
          pwd: `!${passwordHash}`,
        },
      });

      if (response.data.status !== "error") {
     
        if(response.data.status === "needupdate"){
          setAuthState({
            token:null,
            authenticated: false,
            status: "needupdate"
          });

          await forgotPassword(cgc)
        }
        else
        {
          const token = 'my-jwt'; 

          setAuthState({
            token:token,
            authenticated: true,
            status: "Ok"
          });

          if(checked){
            await SecureStore.setItemAsync(TOKEN_KEY, token);
          }
         
          return response.data
        }
      } else {
        return {
          error: true,
          msg: response.data.msg || 'Usuário/senha inválido.',
        };
      }
    } catch (error) {
      console.error('Error during login:', error);
      return {
        error: true,
        msg: 'Usuário/senha inválido.',
      };
    }
  };

  const forgotPassword = async (cgc: string) =>{
    try {
      const response = await apiPublic.get('/odwctrl', {
        params: {
          action: 'execTarefa',
          apelido: 'CNTAGROMAVE-api-public',
          tKey: 'ec21c9ee-81fb-4346-8326-8abb8f24efc4',
          scriptFunction: 'forgotPwd',
          usr: cgc,
        },
      });

      if(response.data.status ==='ok'){
        setAuthState({
          token:null,
          authenticated: false,
          status: "needupdate"
        });

        return response.data
      }
     
    } catch (error) {
      console.error('Error during password change:', error);
      return {
        error: true,
        msg: 'Invalid details',
      };
    }
  };

  const checkValidationCode = async (cgc:string, validationCode: string) =>{
    try {
      const response = await apiPublic.get('/odwctrl', {
        params: {
          action: 'execTarefa',
          apelido: 'CNTAGROMAVE-api-public',
          tKey: 'ec21c9ee-81fb-4346-8326-8abb8f24efc4',
          scriptFunction: 'checkValidationCode',
          usr: cgc,
          validationCode: validationCode
        },
      });

      if(response.data.status ==='ok'){
        setAuthState({
          token:null,
          authenticated: false,
          status: "changePassword"
        });

        return response.data
      }
     
    } catch (error) {
      console.error('Error during password change:', error);
      return {
        error: true,
        msg: 'Invalid details',
      };
    }
  }
  const changePassword = async (cgc:string, validationCode: string, newPwd:string) =>{
    try {
      const response = await apiPublic.get('/odwctrl', {
        params: {
          action: 'execTarefa',
          apelido: 'CNTAGROMAVE-api-public',
          tKey: 'ec21c9ee-81fb-4346-8326-8abb8f24efc4',
          scriptFunction: 'updatePwd',
          usr: cgc,
          validationCode: validationCode,
          newPwd:`@${newPwd}`
        },
      });

      if(response.data.status ==='ok'){
        setAuthState({
          token:null,
          authenticated: false,
          status: "login"
        });

        return response.data
      }
     
    } catch (error) {
      console.error('Error during password change:', error);
      return {
        error: true,
        msg: 'Invalid details',
      };
    }
  }

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setAuthState({
      token: null,
      authenticated: false,
      status:null
    });
  };

  const value = {
    onLogin: login,
    onLogout: logout,
    checkValidationCode: checkValidationCode,
    forgotPassword: forgotPassword,
    changePassword:changePassword,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
