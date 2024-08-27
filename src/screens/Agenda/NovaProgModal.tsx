import React, { useState } from "react";
import { Modal, View, Text, StyleSheet } from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import LoginButton from "@/src/components/buttons/LoginButton";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";
import Label from "@/src/components/general/Label";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import { useFazenda } from "@/src/contexts/FazendaContext";
import DatePicker from "@/src/components/inputs/DatePicker";
import Icon from "react-native-vector-icons/FontAwesome";
import { AddSquare, ArrowLeft } from "iconsax-react-native";
import StyledInput from "@/src/components/inputs/StyledInput";

interface CustomModalProps {
  visible: boolean;
  onChange: () => void;
  onClose: () => void;
  onRedirect: () => void;
}

const NovaProgModal: React.FC<CustomModalProps> = ({
  visible,
  onChange,
  onClose,
  onRedirect,
}) => {
  const { fazendas } = useFazenda();
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.backdrop} onTouchEndCapture={onClose}></View>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Nova Programação</Text>
        <View style={styles.row}>
          <View style={styles.columnHalf}>
            <Label size="md" weight="semibold">
              Fazendas
            </Label>
            <CustomDropdown
              onChange={(value) => onChange()}
              value={""}
              list={fazendas.map((fazenda) => ({
                key: fazenda.codigo,
                name: fazenda.nome,
              }))}
              placeholder="Selecione aqui"
            />
          </View>
          <View style={styles.columnHalf}>
            <Label size="md" weight="semibold">
              Tipo de Vistoria
            </Label>
            <CustomDropdown
              onChange={(value) => onChange()}
              value={""}
              list={[
                { key: 1, name: "Monitoramento" },
                { key: 0, name: "Técnica" },
              ]}
              placeholder="Selecione"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.columnThird}>
            <Label size="md" weight="semibold">
              Data
            </Label>
            <DatePicker
              label="Selecionar Data"
              value={new Date()}
              onChange={onChange}
            />
          </View>
          <View style={styles.columnTwoThird}>
            <Label size="md" weight="semibold">
              Tipo de Vistoria
            </Label>
            <View style={styles.inlineRow}>
              <DatePicker
                label="Selecionar Data"
                value={new Date()}
                onChange={onChange}
              />
              <Text style={styles.inlineText}>á</Text>
              <DatePicker
                label="Selecionar Data"
                value={new Date()}
                onChange={onChange}
              />
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.columnFull}>
            <Label size="md" weight="semibold">
              Representante
            </Label>
            <CustomDropdown
              onChange={(value) => onChange()}
              value={""}
              list={[
                { key: 1, name: "Representante 1" },
                { key: 0, name: "Representante 2" },
              ]}
              placeholder="Selecione aqui"
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.columnFull}>
            <Label size="md" weight="semibold">
              Observação
            </Label>
            <StyledInput multiline placeholder="Observação" />
          </View>
        </View>
        <View style={styles.checkboxRow}>
          <CheckBox
            center
            title="Agenda Recorrente"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={styles.checkboxContainer}
            textStyle={styles.checkboxText}
            checkedIcon={<Icon name="check-square" size={24} color="grey" />}
            uncheckedIcon={<Icon name="square-o" size={24} color="grey" />}
          />
        </View>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <ButtonGeneral
              color="#C0C0C0"
              icon={<ArrowLeft color="white" />}
              label="Voltar"
              onClick={onClose}
            />
          </View>
          <View style={styles.buttonContainer}>
            <ButtonGeneral
              icon={<AddSquare color="white" />}
              label="Salvar"
              onClick={onRedirect}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.5,
  },
  modalContainer: {
    position: "absolute",
    top: "20%",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignSelf: "center",
    zIndex: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  columnHalf: {
    width: "48%",
  },
  columnThird: {
    width: "32%",
  },
  columnTwoThird: {
    width: "64%",
  },
  columnFull: {
    width: "100%",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlineText: {
    fontWeight: "600",
    marginHorizontal: 8,
  },
  checkboxRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  checkboxContainer: {
    margin: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#707070",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonContainer: {
    width: "48%",
  },
});

export default NovaProgModal;
