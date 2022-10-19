import { React, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import Picture from "./components/Camera";
import VideoRecord from "./components/Video";

export default function App() {
  const [type, setType] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  // }
  const change = () => {
    setType(!type);
  };
  return (
    <SafeAreaView style={styles.container}>
      {isRecording ? null : (
        <Button
          style={styles.buttonContainer}
          title={type ? "Change Video" : "Change Foto"}
          onPress={change}
        />
      )}

      {type ? (
        <Picture />
      ) : (
        <VideoRecord
          isRecording={isRecording}
          setIsRecording={setIsRecording}
        />
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 26,
  },
});
