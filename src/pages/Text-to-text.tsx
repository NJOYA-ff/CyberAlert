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
const Texttotext: React.FC = () => {
  const [firstLanguage, setFirstLanguage] = useState("English");
  const [secondLanguage, setSecondLanguage] = useState("French");
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
            <IonInput color={"light"} placeholder="Enter text"></IonInput>
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
      </IonContent>
    </IonPage>
  );
};

export default Texttotext;
