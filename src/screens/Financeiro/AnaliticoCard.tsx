import { formatCurrency } from "@/src/helpers/formatCurrency";
import { formatDateString } from "@/src/helpers/formatDateString";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";

interface Pedido {
    cidade: string;
    safra: string;
    produtos: Array<{
      produto: string;
      quantidadeproduto: number;
      quantidadefaturado: number;
      valor: number;
    }>;
    valor: number;
    condicaopgto:number;
    valorfaturar:number;
    seriepedido: string;
    numpedido: number;
    datapedido: string;
  }
  

type AnaliticoCardProps = {
  isVisible: boolean;
  onClose: () => void;
  pedido: Pedido;
};


const AnaliticoCard: React.FC<AnaliticoCardProps> = ({
  isVisible,
  onClose,
  pedido,
}) => {
  const renderProductItem = ({ item }: { item: any }) => (
    <Pressable style={{width:"100%"}}>
      <View style={styles.productItem}>
        <Text style={styles.productName}>{item.produto}</Text>
        <View style={styles.productDetails}>
          {item.quantidadeproduto !==0 &&
          <Text style={styles.productDetailText}>
            Quantidade: {item.quantidadeproduto}
          </Text>}
          <Text
            style={styles.productDetailText}
          >{formatCurrency(item.valor)}</Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Detalhes do Pedido</Text>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Cidade:</Text>
                <Text style={styles.detailValue}>{pedido.cidade}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Safra:</Text>
                <Text style={styles.detailValue}>{pedido.safra}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Valor Total:</Text>
                <Text style={styles.detailValue}>
                {formatCurrency(pedido.valor  ? pedido.valor : pedido.valorfaturar)}
                </Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Pagamento:</Text>
                <Text style={styles.detailValuePag}>{pedido.condicaopgto}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Número do Pedido:</Text>
                <Text style={styles.detailValue}>{pedido.numpedido}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Data do Pedido:</Text>
                <Text style={styles.detailValue}>
                  {formatDateString(pedido.datapedido)}
                </Text>
              </View>

              <Text style={styles.itemsTitle}>Itens do Pedido</Text>

              <View style={styles.flatListContainer}>
                <FlatList
                  data={pedido.produtos}
                  renderItem={renderProductItem}
                  keyExtractor={(item) => item.produto}
                  contentContainerStyle={styles.flatListContent}
                />
              </View>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 24,
    color: "#222",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },
  detailValuePag:{
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  detailValue: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  itemsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    alignSelf: "flex-start",
    marginBottom: 12,
    marginTop: 16,
  },
  flatListContainer: {
    maxHeight: 200, // Limita a altura da FlatList
    width: "100%",
  },
  productItem: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    width: "100%",
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderColor: "#E7E7E7",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  productName: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
    marginRight: 10,
    marginBottom: 5,
  },
  productValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#28a745",
  },
  productDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 20,
    marginTop: 4,
  },
  productDetailText: {
    fontSize: 14,
    color: "#666",
  },
  flatListContent: {
    paddingBottom: 0,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default AnaliticoCard;
