import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Favorite: React.FC = () => {
  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButton fill="clear" slot="start">
            <IonBackButton defaultHref="/Home" color={"dark"}></IonBackButton>
          </IonButton>
          <IonTitle>
            <IonLabel>Favorite</IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent></IonContent>
    </IonPage>
  );
};

export default Favorite;
