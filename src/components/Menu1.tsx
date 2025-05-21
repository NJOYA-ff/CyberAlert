import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonPage,
} from "@ionic/react";
import { logInOutline, caretForward, bookmarkOutline } from "ionicons/icons";
import React from "react";
import { useLocation } from "react-router-dom";
import "../pages/Pages.scss";
interface AppPage {
  url: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/",
    mdIcon: caretForward,
  },
  {
    title: "Report Status",
    url: "/Report-status",
    mdIcon: caretForward,
  },
  {
    title: "File a complaint",
    url: "/File-a-complaint",
    mdIcon: caretForward,
  },
  {
    title: "Forum",
    url: "/Forum",
    mdIcon: caretForward,
  },
  {
    title: "Resources",
    url: "Resources",
    mdIcon: caretForward,
  },
];

const Menu1: React.FC = () => {
  const location = useLocation();
  return (
    <IonMenu contentId="main" type="overlay" side="end" id="menu1">
      <IonContent>
        <IonList id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <br />
            <br />
            <IonButton className="bttm" expand="full" routerLink="/SignIn">
              Sing In
            </IonButton>
            <br />
            <IonButton className="bttm" expand="full" routerLink="/SignUp">
              Sing Up
            </IonButton>
            <br />
          </IonMenuToggle>

          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    aria-hidden="true"
                    slot="start"
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu1;
