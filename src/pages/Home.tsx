import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  cameraOutline,
  close,
  cloudDoneOutline,
  helpCircleOutline,
  micOutline,
  peopleOutline,
  person,
  personCircle,
  sparkles,
  star,
  swapHorizontal,
  timerOutline,
  volumeHighOutline,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../main";
import logo from "../images/logo3.png";
import "./Pages.scss";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
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
  const [startY, setStartY] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [PhotoURL, setPhotoURL] = useState<string | null>(null);
  const history = useHistory();
  const modal = useRef<HTMLIonModalElement>(null);
  const dismiss = () => {
    modal.current?.dismiss();
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };
  const handleToucheMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - startY;
    if (deltaY > 100) {
      history.push("/History");
    }
  };
  const handleTouchEnd = () => {
    setStartY(null);
  };
  const handleswitch = () => {
    setFirstLanguage(secondLanguage);
    setSecondLanguage(firstLanguage);
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setPhotoURL(user.photoURL);
    }
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      history.push("/");
      dismiss();
      console.log("Sign out successfully");
    } catch (error) {
      console.log("error signing out:", error);
    }
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
          <IonButton
            fill="clear"
            slot="end"
            routerLink="/CamDialectAI"
            shape="round"
          >
            <IonIcon icon={sparkles} slot="icon-only" color="dark" />{" "}
          </IonButton>
          <IonButton slot="end" fill="clear" id="open-modal" shape="round">
            {PhotoURL && (
              <IonImg
                src={PhotoURL}
                alt="profile"
                style={{ width: "30px", height: "30px" }}
              />
            )}
            {!PhotoURL && (
              <IonIcon
                icon={personCircle}
                size="large"
                color="medium"
                style={{ width: "30px", height: "30px" }}
              />
            )}
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard
          className="container"
          color={"light"}
          onTouchStart={handleTouchStart}
          onTouchMove={handleToucheMove}
          onTouchEnd={handleTouchEnd}
        >
          <IonItem
            color={"light"}
            lines="none"
            style={{ marginTop: "1em", fontSize: "2em" }}
            routerLink="/Text-to-text"
          >
            <IonLabel color={"medium"}>Enter a Text</IonLabel>{" "}
          </IonItem>
          <IonGrid className="chip">
            <Link to={"/History"}>
              {" "}
              <div
                style={{
                  width: "4em",
                  height: "0.5em",
                  backgroundColor: "var(--ion-color-medium)",
                  borderRadius: "80px",
                }}
              ></div>
            </Link>
          </IonGrid>
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

        <IonModal id="modal" ref={modal} trigger="open-modal">
          <IonContent>
            <IonToolbar color={"primary"}>
              <IonTitle> CamDialect </IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => dismiss()}>
                  <IonIcon icon={close} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonCard className="profile">
              <IonItem lines="none">
                <IonAvatar>
                  {PhotoURL && <IonImg src={PhotoURL} alt="profile" />}
                  {!PhotoURL && (
                    <IonIcon
                      icon={personCircle}
                      style={{ fontSize: "40px" }}
                      color="medium"
                    />
                  )}
                </IonAvatar>
                <IonLabel style={{ marginLeft: "10px" }}>
                  {userInfo?.displayName}
                  <br />
                  <IonLabel color={"medium"}>{userInfo?.email} </IonLabel>
                </IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={volumeHighOutline} slot="start"></IonIcon>
                <IonLabel color={"medium"}>Saved transcripts</IonLabel>{" "}
              </IonItem>
              <IonItem
                lines="none"
                routerLink="/History"
                onClick={() => dismiss()}
              >
                <IonIcon icon={timerOutline} slot="start"></IonIcon>
                <IonLabel color={"medium"}>History</IonLabel>{" "}
              </IonItem>
              <IonItem lines="none">
                <IonIcon icon={cloudDoneOutline} slot="start"></IonIcon>
                <IonLabel color={"medium"}>Downloaded languages</IonLabel>{" "}
              </IonItem>
              <IonGrid className="signout">
                <IonButton
                  color={"primary"}
                  className="signoutbt"
                  onClick={handleSignOut}
                >
                  Sign out
                </IonButton>
              </IonGrid>
            </IonCard>
            <IonItem lines="none" className="help">
              <IonIcon icon={helpCircleOutline} slot="start"></IonIcon>
              <IonLabel color={"medium"}>Help and feedback</IonLabel>{" "}
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
