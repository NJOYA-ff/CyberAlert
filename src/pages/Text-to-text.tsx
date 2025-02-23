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
import { Clipboard } from "@capacitor/clipboard";
import {
  swapHorizontal,
  volumeHighOutline,
  copyOutline,
  checkmarkCircle,
  square,
  handLeft,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { TextToSpeech } from "@capacitor-community/text-to-speech";
import { translateText } from "../components/TranslationEngine";
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
const Texttotext: React.FC = () => {
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("French");
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeaking1, setIsSpeaking1] = useState(false);
  const [transcripts, setTranscripts] = useState("");
  const [presentToast] = useIonToast();
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
  useEffect(() => {
    const handleTranslate = () => {
      const translation = translateText(transcripts);
      setText(translation);
      console.log(translation);
    };
    handleTranslate();
  }, [transcripts]);

  const handleswitch = () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar color="light">
          <IonButton slot="start" fill="clear">
            <IonBackButton defaultHref="/Home" color={"dark"}></IonBackButton>
          </IonButton>
          <IonTitle>
            Cam<IonLabel color={"medium"}>Dialect</IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="container1" color={"light"}>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
          >
            <IonInput
              color={"light"}
              value={transcripts}
              placeholder="Enter text"
              onIonChange={(e: CustomEvent) => setTranscripts(e.detail.value!)}
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
              icon={copyOutline}
              slot="end"
              color="medium"
              onClick={handleCopytext}
            />
          </IonItem>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
          >
            <IonInput value={text} readonly color={"light"}></IonInput>
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
                onClick={handleSpeak}
                icon={square}
                slot="start"
                color="medium"
              />
            )}

            <IonIcon
              icon={copyOutline}
              slot="end"
              color="medium"
              onClick={handleCopytext1}
            />
          </IonItem>
        </IonCard>
        <IonGrid className="select-button-container">
          {" "}
          <IonButton className="select-button" color={"light"}>
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
          <IonButton fill="clear" onClick={handleswitch}>
            <IonIcon icon={swapHorizontal} slot="icon-only" color="dark" />{" "}
          </IonButton>
          <IonButton className="select-button" color={"light"}>
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
      </IonContent>
    </IonPage>
  );
};

export default Texttotext;
