import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button, View, Text, SafeAreaView } from "react-native";
import { Video } from "expo-av";
import { Camera } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";

export default function App() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(false);
  const [hasMicrophonePermission, setMicrophonePermission] = useState(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);
  const [isRecording, setIsRecording] = useState(false);
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
      </View>
    </Camera>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end",
  },
  video: {},
});

// import { StatusBar } from "expo-status-bar";
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Button,
//   Image,
// } from "react-native";
// import { useEffect, useRef, useState } from "react";
// import { Camera } from "expo-camera";
// import { shareAsync } from "expo-sharing";
// import * as MediaLibrary from "expo-media-library";

// export default function App() {
//   let cameraRef = useRef();
//   const [hasCameraPermission, setHasCameraPermission] = useState();
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
//   const [photo, setPhoto] = useState();

//   useEffect(() => {
//     (async () => {
//       const cameraPermission = await Camera.requestCameraPermissionsAsync();
//       const mediaLibraryPermission =
//         await MediaLibrary.requestPermissionsAsync();
//       setHasCameraPermission(cameraPermission.status === "granted");
//       setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
//     })();
//   }, []);

//   if (hasCameraPermission === undefined) {
//     return <Text>Requesting permissions...</Text>;
//   } else if (!hasCameraPermission) {
//     return (
//       <Text>
//         Permission for camera not granted. Please change this in settings.
//       </Text>
//     );
//   }

//   let takePic = async () => {
//     let options = {
//       quality: 1,
//       base64: true,
//       exif: false,
//     };
//     //foto burda çekiliyor
//     let newPhoto = await cameraRef.current.takePictureAsync(options);
//     setPhoto(newPhoto);
//   };

//   // if (photo) {
//   //   let sharePic = () => {
//   //     shareAsync(photo.uri).then(() => {
//   //       setPhoto(undefined);
//   //     });
//   //   };

//   //   let savePhoto = () => {
//   //     MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
//   //       setPhoto(undefined);
//   //     });
//   //   };

//   //   return (
//   //     <SafeAreaView style={styles.container}>
//   //       <Image
//   //         style={styles.preview}
//   //         source={{ uri: "data:image/jpg;base64," + photo.base64 }}
//   //       />
//   //       <Button title="Share" onPress={sharePic} />
//   //       {hasMediaLibraryPermission ? (
//   //         <Button title="Save" onPress={savePhoto} />
//   //       ) : undefined}
//   //       <Button title="Discard" onPress={() => setPhoto(undefined)} />
//   //     </SafeAreaView>
//   //   );
//   // }

//   return (
//     <Camera style={styles.container} ref={cameraRef}>
//       <View style={styles.buttonContainer}>
//         <Button title="Take Pic" onPress={takePic} />
//       </View>
//       <StatusBar style="auto" />
//     </Camera>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   buttonContainer: {
//     backgroundColor: "#fff",
//     alignSelf: "flex-end",
//   },
//   preview: {
//     alignSelf: "stretch",
//     flex: 1,
//   },
// });
