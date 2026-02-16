import { Alert } from "react-native"

export const updateAlert = (title: string, body: string, onPress: () => void) => {
    Alert.alert(title, body, [{
      text: "OK",
      onPress: onPress
    }])
  }