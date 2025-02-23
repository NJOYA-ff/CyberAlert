import {
  IonBackButton,
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import annyang from "annyang";
import { SpeechRecognition } from "@capacitor-community/speech-recognition";
import {
  swapHorizontal,
  mic,
  micOutline,
  square,
  checkmarkCircle,
  copyOutline,
  volumeHighOutline,
} from "ionicons/icons";
import { Clipboard } from "@capacitor/clipboard";
import React, { useEffect, useState } from "react";
import { Capacitor } from "@capacitor/core";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
const languages = [
  "English",
  "French",
  "Bamoun",
  "Bulu",
  "Bamileke",
  "Bassa",
  "Ewondo",
  "Beti",
  "Bametta",
  "Nweh",
  "Ejakam",
  "Kenyang",
];
const Conversation: React.FC = () => {
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("French");
  const [Square, setSquare] = useState(false);
  const [mic, setMic] = useState(true);
  const [color, setColor] = useState("transparent");
  const [Square1, setSquare1] = useState(false);
  const [mic1, setMic1] = useState(true);
  const [color1, setColor1] = useState("transparent");
  const [transcripts, setTranscripts] = useState("");
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeaking1, setIsSpeaking1] = useState(false);
  const [isRecording, setIsrecording] = useState(false);
  const [placeHolder, setPlaceHolder] = useState("Tap the mic button to start");
  const [presentToast] = useIonToast();
  const listening = () => {
    if (annyang) {
      annyang.start({ autoRestart: false, continuous: true });
      annyang.addCallback("result", (phrases: string[]) => {
        setTranscripts(phrases[0]);
      });
    } else {
      presentToast({
        message: "Error try again",
        position: "middle",
        duration: 500,
        cssClass: "custom-toast-error",
      });
    }
  };
  const stop = () => {
    if (annyang) {
      annyang.abort();
    }
  };
  useEffect(() => {
    requestpermission();
    checkAvailability();
  }, []);
  const requestpermission = async () => {
    if (Capacitor.getPlatform() === "web") {
      //web implementation
    } else {
      const check = await SpeechRecognition.checkPermissions();
      if (!check) {
        presentToast({
          message: "Permission denied.",
          duration: 2000,
          position: "middle",
          color: "danger",
        });
        await SpeechRecognition.requestPermissions();
      } else {
        presentToast({
          message: "Permission granted.",
          duration: 2000,
          position: "middle",
          color: "success",
        });
      }
    }
  };
  const checkAvailability = async () => {
    if (Capacitor.getPlatform() === "web") {
      //web implementation
    } else {
      const { available } = await SpeechRecognition.available();
      console.log("Speech recognition available:", available);
    }
  };
  const startListening = async () => {
    if (Capacitor.getPlatform() === "web") {
      //web implementation
      listening();
      setIsrecording(true);
    } else {
      SpeechRecognition.start({
        language: "en-US",
        maxResults: 10,
        popup: true,
        partialResults: true,
        prompt: "Listening",
      });
      SpeechRecognition.addListener("partialResults", (data: any) => {
        setTranscripts(data.mtches[0]);
      });
    }
  };
  const stopListening = async () => {
    if (Capacitor.getPlatform() === "web") {
      //web implementation
      stop();
      setIsrecording(false);
    } else {
      await SpeechRecognition.stop();
      SpeechRecognition.removeAllListeners();
    }
  };
  const handleIconChange = () => {
    if (Square) {
      setSquare(false);
      setMic(true);
      setColor("transparent");
      setPlaceHolder("Tap the mic button to start");
      stopListening();
    } else {
      setSquare(true);
      setMic(false);
      setColor("rgba(128, 128, 128, 0.2)");
      setPlaceHolder("Speak now...");
      startListening();
    }
  };
  const handleIconChange1 = () => {
    if (Square1) {
      setSquare1(false);
      setMic1(true);
      setColor1("transparent");
      setPlaceHolder("Tap the mic button to start");
      stopListening();
    } else {
      setSquare1(true);
      setMic1(false);
      setColor1("rgba(128, 128, 128, 0.2)");
      setPlaceHolder("Speak now...");
      startListening();
    }
  };
  const handleSpeak = async () => {
    if (isSpeaking) {
      await TextToSpeech.stop();
      setIsSpeaking(false);
      return;
    }
    if (!transcripts.trim()) {
      alert("please enter some text to speak");
      return;
    }
    try {
      setIsSpeaking(true);
      await TextToSpeech.speak({
        text: transcripts,
        lang: "en-US",
        rate: 1.0,
        pitch: 1.0,
      });
    } catch (e: any) {
      console.error("Error during Speech:", e);
    } finally {
      setIsSpeaking(false);
    }
  };
  const handleSpeak1 = async () => {
    if (isSpeaking1) {
      await TextToSpeech.stop();
      setIsSpeaking1(false);
      return;
    }
    if (!text.trim()) {
      alert("please enter some text to speak");
      return;
    }
    try {
      setIsSpeaking1(true);
      await TextToSpeech.speak({
        text: text,
        lang: "en-US",
        rate: 1.0,
        pitch: 1.0,
      });
    } catch (e: any) {
      console.error("Error during Speech:", e);
    } finally {
      setIsSpeaking1(false);
    }
  };
  const handleswitch = () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
  };
  const handleCopytext = async () => {
    try {
      await Clipboard.write({
        string: transcripts,
      });
      presentToast({
        message: "Text copied",
        position: "middle",
        duration: 100,
        color: "light",
        cssClass: "custom-toast",
        icon: checkmarkCircle,
      });
    } catch {
      presentToast({
        message: "error copying text",
        position: "middle",
        duration: 100,
        color: "light",
        cssClass: "custom-toast-error",
      });
    }
  };
  const handleCopytext1 = async () => {
    try {
      await Clipboard.write({
        string: text,
      });
      presentToast({
        message: "Text copied",
        position: "middle",
        duration: 100,
        color: "light",
        cssClass: "custom-toast",
        icon: checkmarkCircle,
      });
    } catch {
      presentToast({
        message: "error copying text",
        position: "middle",
        duration: 100,
        color: "light",
        cssClass: "custom-toast-error",
      });
    }
  };
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar color="light">
          <IonButton fill="clear" slot="start">
            <IonBackButton defaultHref="/Home" color={"dark"}></IonBackButton>
          </IonButton>
          <IonTitle>
            Cam<IonLabel color={"medium"}>Dialect</IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="container" color={"light"}>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
          >
            <IonInput
              value={transcripts}
              onIonChange={(e: CustomEvent) => setTranscripts(e.detail.value!)}
              color={"light"}
              placeholder={placeHolder}
            ></IonInput>
          </IonItem>
          <IonItem color={"light"} lines="none">
            {!isSpeaking && (
              <IonIcon
                onClick={handleSpeak}
                icon={volumeHighOutline}
                slot="start"
                color="medium"
              />
            )}
            {isSpeaking && (
              <IonIcon
                onClick={handleSpeak}
                icon={square}
                slot="start"
                color="medium"
              />
            )}

            <IonIcon
              onClick={handleCopytext}
              icon={copyOutline}
              slot="end"
              color="medium"
            />
          </IonItem>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
          >
            <IonInput
              value={text}
              onIonChange={(e: CustomEvent) => setText(e.detail.value!)}
              color={"light"}
            ></IonInput>
          </IonItem>
          <IonItem color={"light"}>
            {!isSpeaking1 && (
              <IonIcon
                onClick={handleSpeak1}
                icon={volumeHighOutline}
                slot="start"
                color="medium"
              />
            )}
            {isSpeaking1 && (
              <IonIcon
                onClick={handleSpeak1}
                icon={square}
                slot="start"
                color="medium"
              />
            )}

            <IonIcon
              onClick={handleCopytext1}
              icon={copyOutline}
              slot="end"
              color="medium"
            />
          </IonItem>
        </IonCard>
        <IonGrid className="select-button-container">
          {" "}
          <IonButton
            className="select-button"
            color={"light"}
            disabled={isRecording}
          >
            {" "}
            <IonSelect
              interface="action-sheet"
              style={{
                width: "120px",
                height: "50px",
                textTransform: "none",
                color: "var(--ion-color-dark)",
              }}
              value={firstLanguage}
              onIonChange={(e: CustomEvent) =>
                setFirstLanguage(e.detail.value!)
              }
            >
              {languages.map((lang) => (
                <IonSelectOption key={lang} value={lang}>
                  {lang}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonButton>
          <IonButton fill="clear" onClick={handleswitch} disabled={isRecording}>
            <IonIcon icon={swapHorizontal} slot="icon-only" color="dark" />{" "}
          </IonButton>
          <IonButton
            className="select-button"
            color={"light"}
            disabled={isRecording}
          >
            {" "}
            <IonSelect
              interface="action-sheet"
              style={{
                width: "120px",
                height: "50px",
                textTransform: "none",
                color: "var(--ion-color-dark)",
                border: "none",
              }}
              value={secondLanguage}
              onIonChange={(e: CustomEvent) =>
                setSecondLanguage(e.detail.value!)
              }
            >
              {languages.map((lang) => (
                <IonSelectOption key={lang} value={lang} color="light">
                  {lang}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonButton>
        </IonGrid>
        <IonGrid className="round-buttons-container2">
          <div
            className="round-transparent1"
            style={{ backgroundColor: `${color}` }}
          >
            {" "}
            <IonButton
              className="mic-button1"
              onClick={handleIconChange}
              disabled={Square1}
            >
              {mic && (
                <IonIcon
                  icon={micOutline}
                  slot="icon-only"
                  style={{ fontSize: "2.5em" }}
                />
              )}{" "}
              {Square && (
                <IonIcon
                  icon={square}
                  slot="icon-only"
                  style={{ fontSize: "2.5em" }}
                  color="light"
                />
              )}
            </IonButton>
          </div>
          <div
            className="round-transparent1"
            style={{ backgroundColor: `${color1}` }}
          >
            {" "}
            <IonButton
              className="mic-button1"
              onClick={handleIconChange1}
              disabled={Square}
            >
              {mic1 && (
                <IonIcon
                  icon={micOutline}
                  slot="icon-only"
                  style={{ fontSize: "2.5em" }}
                />
              )}{" "}
              {Square1 && (
                <IonIcon
                  icon={square}
                  slot="icon-only"
                  style={{ fontSize: "2.5em" }}
                  color="light"
                />
              )}
            </IonButton>
          </div>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Conversation;
