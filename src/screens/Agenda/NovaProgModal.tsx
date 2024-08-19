import React, { useState } from "react";
import { Modal, View, Image, Text } from "react-native";
import { Button, CheckBox } from "@rneui/themed";
import LoginButton from "@/src/components/buttons/LoginButton";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";
import Label from "@/src/components/general/Label";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import { useFazenda } from "@/src/contexts/FazendaContext";
import DatePicker from "@/src/components/inputs/DatePicker";
import TimePicker from "@/src/components/inputs/TimePicker";
import StyledInput from "@/src/components/inputs/StyledInput";
import Icon from "react-native-vector-icons/FontAwesome";
import { AddSquare, ArrowLeft } from "iconsax-react-native";

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
      <View
        className="z-0 absolute top-0 left-0 w-full h-full justify-center items-center bg-black opacity-50"
        onTouchEndCapture={onClose}
      ></View>
      <View className=" w-full justify-center items-center top-56 bg-white rounded-lg p-5 z-10">
        <Text className="text-lg font-bold">Nova Programação</Text>
        <View className="mt-4 w-full justify-between flex-row">
          <View className=" flex-col w-3/6">
            <Label size="md" weight="semibold">
              Fazendas
            </Label>
            <CustomDropdown
              onChange={(value) => onChange(value)}
              value={""}
              list={fazendas.map((fazenda) => ({
                key: fazenda.codigo,
                name: fazenda.nome,
              }))}
              placeholder="Selecione aqui"
            />
          </View>
          <View className="flex-col w-2/5">
            <Label size="md" weight="semibold">
              Tipo de Vistoria
            </Label>
            <CustomDropdown
              onChange={(value) => onChange(value)}
              value={""}
              list={[
                { key: 1, name: "Monitoramento" },
                { key: 0, name: "Técnica" },
              ]}
              placeholder="Selecione"
            />
          </View>
        </View>
        <View className="mt-4 w-full justify-between flex-row">
          <View className=" justify-start items-start flex-col w-2/6">
            <Label size="md" weight="semibold">
              Data
            </Label>
            <DatePicker
              label="Selecionar Data"
              value={new Date()}
              onChange={onChange}
            />
          </View>
          <View className="justify-start items-start flex-col w-3/5">
            <Label size="md" weight="semibold">
              Tipo de Vistoria
            </Label>
            <View className="flex-row w-full items-center justify-start gap-4">
              <TimePicker
                label="Selecionar Data"
                value={new Date()}
                onChange={onChange}
              />
              <Text className=" font-semibold">á</Text>
              <TimePicker
                label="Selecionar Data"
                value={new Date()}
                onChange={onChange}
              />
            </View>
          </View>
        </View>
        <View className="mt-4 w-full justify-between flex-row">
          <View className="flex-col w-1/2">
            <Label size="md" weight="semibold">
              Representante
            </Label>
            <CustomDropdown
              onChange={(value) => onChange(value)}
              value={""}
              list={[
                { key: 1, name: "Representante 1" },
                { key: 0, name: "Representante 2" },
              ]}
              placeholder="Selecione aqui"
            />
          </View>
        </View>
        <View className="mt-4 w-full justify-between flex-row ">
          <View className="flex-col w-full ">
            <Label size="md" weight="semibold">
              Observação
            </Label>
            <StyledInput multiline placeholder="Observação" />
          </View>
        </View>
        <View className="mt-4 w-full justify-between flex-row ">
          <CheckBox
            center
            title="Agenda Recorrente"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={{ margin: 0, padding: 0, gap: 0 }}
            textStyle={{ fontSize: 12, fontWeight: "400", color: "#707070" }}
            checkedIcon={<Icon name="check-square" size={24} color="grey" />}
            uncheckedIcon={<Icon name="square-o" size={24} color="grey" />}
          />
        </View>
        <View className="mt-5 w-full justify-between flex-row">
          <View className="w-1/3">
            <ButtonGeneral color="#C0C0C0" icon={<ArrowLeft color="white"/>} label="Voltar" onClick={onClose} />
          </View>
          <View className="w-1/3">
            <ButtonGeneral icon={<AddSquare color="white"/>} label="Salvar" onClick={onRedirect} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NovaProgModal;
