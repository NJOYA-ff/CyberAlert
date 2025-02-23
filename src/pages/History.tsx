import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonContent,
} from "@ionic/react";
import React from "react";
import { useHistory } from "react-router";

const History: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButton fill="clear" slot="start">
            <IonBackButton color={"dark"} defaultHref="/Home"></IonBackButton>
          </IonButton>
          <IonTitle>
            <IonLabel>History</IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default History;
