import {
  IonButton,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  cameraOutline,
  micOutline,
  peopleOutline,
  star,
  swapHorizontal,
} from "ionicons/icons";
import React, { useState } from "react";
import logo from "../images/logo3.png";
import "./Pages.scss";
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
const Home: React.FC = () => {
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
          <IonButton slot="start" fill="clear" routerLink="/Favorite">
            <IonIcon icon={star} slot="icon-only" color="dark"></IonIcon>
          </IonButton>
          <IonTitle>
            Cam<IonLabel color={"medium"}>Dialect</IonLabel>
          </IonTitle>
          <IonButton slot="end" fill="clear">
            <IonImg src={logo} style={{ width: "30px", height: "30px" }} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="container" color={"light"}>
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
            routerLink="/Text-to-text"
          >
            <IonLabel color={"medium"}>Enter a Text</IonLabel>{" "}
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
        <IonGrid className="round-buttons-container">
          <IonButton className="people-button" routerLink="/Conversation">
            <IonIcon
              icon={peopleOutline}
              slot="start"
              style={{ fontSize: "24px", paddingLeft: "10px" }}
              color="dark"
            />
          </IonButton>

          <IonButton className="mic-button" routerLink="/Speech-to-text">
            <IonIcon
              icon={micOutline}
              slot="icon-only"
              style={{ fontSize: "2.5em" }}
            />
          </IonButton>
          <IonButton className="camera-button">
            <IonIcon
              icon={cameraOutline}
              slot="icon-only"
              style={{ fontSize: "24px" }}
              color="dark"
            />
          </IonButton>
        </IonGrid>
        <IonGrid
          style={{
            marginTop: "-2.5em",
            display: "flex",
            justifyContent: "space-between",
            paddingLeft: "15px",
            paddingRight: "27px",
            fontSize: "14px",
          }}
        >
          {" "}
          <IonLabel color={"medium"}>Conversation</IonLabel>{" "}
          <IonLabel color={"medium"}>Camera</IonLabel>{" "}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
