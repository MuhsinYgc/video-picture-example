import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Text, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import { Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import Overlapping from "./overlapping";

const VideoRecord = ({ isRecording, setIsRecording }) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(false);
  const [hasMicrophonePermission, setMicrophonePermission] = useState(null);
  const [readText, setReadText] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);

  const [video, setVideo] = useState(null);
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setMicrophonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (
    hasCameraPermission === undefined ||
    hasMicrophonePermission === undefined
  ) {
    return <Text>Request permissions</Text>;
  } else if (!hasCameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }
  let recordVideo = async () => {
    setIsRecording(true);
    let options = {
      quality: "1080p",
      maxDuration: 60,
      mute: false,
    };
    cameraRef.current.recordAsync(options).then((recordedVideo) => {
      setVideo(recordedVideo);
      setIsRecording(false);
    });
  };
  let stopRecording = async () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };
  let changeType = () => {
    setType(!type);
  };

  const overlap = () => {
    setReadText(!readText);
  };
  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };
    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };
    return (
      <SafeAreaView style={styles.container}>
        <Video
          style={styles.video}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <Button title="Share" onPress={shareVideo} />
        {hasMediaLibraryPermission ? (
          <Button title="Save" onPress={saveVideo} />
        ) : undefined}
        <Button title="Discard" onPress={() => setVideo(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.area}>
      <Camera
        type={type ? "front" : "back"}
        style={styles.container}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <Button
            title={isRecording ? "Stop Recording" : "Record video"}
            onPress={isRecording ? stopRecording : recordVideo}
          />
          <Button title="change" onPress={changeType} />
          <Button
            title={readText ? "Close text" : "Open text"}
            onPress={overlap}
          />
        </View>
        {readText ? <Overlapping style={styles.text} /> : null}
      </Camera>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    display: "flex",
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    justifyContent: "flex-end",
  },

  area: {
    flex: 1,

    width: "100%",
  },
  text: {
    position: "absolute",
  },
});
export default VideoRecord;
