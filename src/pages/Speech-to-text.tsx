import {
  IonBackButton,
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  star,
  swapHorizontal,
  peopleOutline,
  micOutline,
  cameraOutline,
  squareSharp,
  square,
} from "ionicons/icons";
import React, { useState } from "react";
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
const Speechtotext: React.FC = () => {
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("French");
  const [Square, setSquare] = useState(true);
  const [mic, setMic] = useState(false);
  const [color, setColor] = useState("rgba(128, 128, 128, 0.2)");
  const [placeHolder, setPlaceHolder] = useState("Speak now...");
  const handleIconChange = () => {
    if (Square) {
      setSquare(false);
      setMic(true);
      setColor("transparent");
      setPlaceHolder("Tap the mic button to start");
    } else {
      setSquare(true);
      setMic(false);
      setColor("rgba(128, 128, 128, 0.2)");
      setPlaceHolder("Speak now...");
    }
  };
  const handleswitch = () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
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
            <IonInput color={"light"} placeholder={placeHolder}></IonInput>
          </IonItem>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
          >
            <IonInput color={"light"}></IonInput>
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
        <IonGrid className="round-buttons-container1">
          <div
            className="round-transparent"
            style={{ backgroundColor: `${color}` }}
          >
            {" "}
            <IonButton className="mic-button" onClick={handleIconChange}>
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
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Speechtotext;
