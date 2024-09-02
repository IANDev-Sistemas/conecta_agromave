import { Divider } from "@rneui/themed";
import { DollarCircle, ArrowUp, ArrowDown } from "iconsax-react-native"; // Importando os ícones diretamente
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Cotas = {
  nome: string;
  valor: number;
  percentual: number;
};

interface CotacaoCardProps {
  cotacoes: Array<Cotas>;
}

const CotacaoCard: React.FC<CotacaoCardProps> = ({ cotacoes }) => {
  return (
    <TouchableOpacity>
      <View style={styles.CotacaoCard}>
        <View style={styles.cardHeader}>
          <DollarCircle size={24} color="#000" />
          <Text style={styles.cardTitle}>Cotações</Text>
        </View>
        <Divider width={2} color="#E7E7E7"></Divider>
        {cotacoes.map((cotacao, index) => (
          <View key={index} style={styles.cotacaoRow}>
            <Text style={styles.cotacaoNome}>{cotacao.nome}</Text>
            <View style={styles.cotacaoValores}>
              <Text style={styles.cotacaoValor}>
                {cotacao.valor.toFixed(4)}
              </Text>
              <View style={styles.cotacaoPercentualContainer}>
                {cotacao.percentual >= 0 ? (
                  <ArrowUp size={16} color="#28a745" />
                ) : (
                  <ArrowDown size={16} color="#dc3545" />
                )}
                <Text
                  style={[
                    styles.cotacaoPercentual,
                    {
                      color: cotacao.percentual >= 0 ? "#28a745" : "#dc3545",
                    },
                  ]}
                >
                  {`${cotacao.percentual.toFixed(2)}%`}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default CotacaoCard;

const styles = StyleSheet.create({
  CotacaoCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  cotacaoRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  cotacaoNome: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "left",
    flex: 1, // Faz com que o nome ocupe o máximo de espaço disponível
  },
  cotacaoValores: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start", // Garante que o conteúdo fique alinhado à esquerda
    flex: 2, // Faz com que os valores também tenham mais espaço
  },
  cotacaoValor: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8, // Adiciona um espaço entre o valor e o percentual
  },
  cotacaoPercentualContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 80, // Define um tamanho fixo para o container de percentual e seta
    justifyContent: "flex-start", // Alinha o conteúdo à direita
  },
  cotacaoPercentual: {
    fontSize: 18,
    fontWeight: "500",
  },
});
