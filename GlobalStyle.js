import { createTheme } from "@rneui/themed";

// Definindo o tema personalizado
const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: "Roboto", // Define a fonte para todos os textos
      },
    },
    TextInput: {
      style: {
        fontFamily: "Roboto", // Define a fonte para todos os campos de entrada
      },
    },
  },
});

export default theme;
