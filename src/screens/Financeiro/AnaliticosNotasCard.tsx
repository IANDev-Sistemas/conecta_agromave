import React from "react";
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback, Pressable } from "react-native";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import { formatDateString } from "@/src/helpers/formatDateString";

interface Nota {
  cidade: string;
  safra: string;
  produtos: Array<{
    produto: string;
    quantidadefaturado: number;
    valorfaturado: number;
  }>;
  valor: number;
  serienota: string;
  numnota: number;
  datapedido: string;
}

type AnaliticoNotasCardProps = {
  isVisible: boolean;
  onClose: () => void;
  nota: Nota;
};

const AnaliticoNotasCard: React.FC<AnaliticoNotasCardProps> = ({ isVisible, onClose, nota }) => {
  const renderProductItem = ({ item }: { item: any }) => (
    <Pressable style={{ width: "100%" }}>
      <View style={styles.productItem}>
        <Text style={styles.productName}>{item.produto}</Text>
        <View style={styles.productDetails}>
          <Text style={styles.productDetailText}>
            Quantidade: {item.quantidadefaturado}
          </Text>
          <Text style={styles.productDetailText}>
            {formatCurrency(item.valorfaturado)}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <Modal transparent={true} animationType="fade" visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Detalhes da Nota</Text>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Cidade:</Text>
                <Text style={styles.detailValue}>{nota.cidade}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Safra:</Text>
                <Text style={styles.detailValue}>{nota.safra}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Valor Total:</Text>
                <Text style={styles.detailValue}>
                  {formatCurrency(nota.valor)}
                </Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Número da Nota:</Text>
                <Text style={styles.detailValue}>{nota.numnota}</Text>
              </View>

              <View style={styles.detailsContainer}>
                <Text style={styles.detailLabel}>Data do Pedido:</Text>
                <Text style={styles.detailValue}>
                  {formatDateString(nota.datapedido)}
                </Text>
              </View>

              <Text style={styles.itemsTitle}>Itens da Nota</Text>

              <View style={styles.flatListContainer}>
                <FlatList
                  data={nota.produtos}
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
    maxHeight: 200,
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

export default AnaliticoNotasCard;
