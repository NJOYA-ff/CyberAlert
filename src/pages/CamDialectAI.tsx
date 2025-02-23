import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonTitle,
  IonLabel,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
  IonItem,
  IonFab,
  IonFabButton,
  IonTextarea,
  IonAvatar,
  IonGrid,
  IonFooter,
  IonNote,
} from "@ionic/react";
import {
  attachSharp,
  cameraOutline,
  checkmarkDoneSharp,
  happyOutline,
  logoIonitron,
  micSharp,
  paperPlaneSharp,
} from "ionicons/icons";
import React, { useEffect, useRef, useState } from "react";
import { generateText } from "../components/openAI-Service";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { div } from "@tensorflow/tfjs";
import { auth } from "../main";
interface outMessage {
  card: JSX.Element;
  message: string;
  createdAt: Date;
}
interface inMessage {
  card1: JSX.Element;
  message: string;
  createdAt1: Date;
}
const CamDialectAI: React.FC = () => {
  const [inputText, setInputText] = useState<string>("");
  const [inputText1, setInputText1] = useState<string>("");
  const [update, setupdate] = useState<outMessage[]>([]);
  const [submessage, setsubmessage] = useState(false);
  const [update1, setupdate1] = useState<inMessage[]>([]);
  const contentRef = useRef<HTMLIonContentElement>(null);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [showmsg, setShowmsg] = useState(true);
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
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollToBottom(300);
    }
  }, [update]);
  const createoutgoingMessage = () => {
    if (inputText.trim() !== "") {
      const currentDate = new Date();
      const text = inputText;
      setShowmsg(false);
      const newupdate = (
        <IonCard id="message1" slot="end" color={"tertiary"}>
          <IonCardContent id="in-coming-message-content">{text}</IonCardContent>
          <IonCardSubtitle
            style={{
              display: "flex",
              color: "#dbdbdb",
              float: "right",
              gap: "3px",
              fontSize: "12px",
              bottom: "5px",
              marginRight: "8px",
            }}
          >
            {currentDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            <IonIcon
              icon={checkmarkDoneSharp}
              style={{ fontSize: "14px", bottom: "2px", color: "#dbdbdb" }}
            ></IonIcon>
          </IonCardSubtitle>
        </IonCard>
      );
      setInputText("");
      setupdate([
        ...update,
        { card: newupdate, message: text, createdAt: currentDate },
      ]);
    }
  };
  const createincomingMessage = async () => {
    const text = inputText1;
    const result = await generateText(text);
    setInputText1(result);
    const currentDate = new Date();
    console.log("AI", result);
    if (text !== "") {
      const newupdate = (
        <div>
          <IonCard id="message" color={"tertiary"}>
            <IonCardContent id="in-coming-message-content">
              {text}
            </IonCardContent>
            <IonCardSubtitle
              style={{
                display: "flex",
                color: "#aeaeae",
                float: "right",
                gap: "3px",
                fontSize: "12px",
                bottom: "5px",
                marginRight: "8px",
              }}
            >
              {currentDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </IonCardSubtitle>
          </IonCard>
        </div>
      );
      setupdate([
        ...update,
        { card: newupdate, message: text, createdAt: currentDate },
      ]);
    }
  };

  const handleSubmit = async () => {
    await createoutgoingMessage();
    setTimeout(() => {
      createincomingMessage();
    }, 1000);
  };
  return (
    <IonPage>
      <IonHeader class="ion-no-border" color="light">
        <IonToolbar color={"light"}>
          <IonButton fill="clear" slot="start">
            <IonBackButton defaultHref="/Home" color={"dark"}></IonBackButton>
          </IonButton>
          <IonIcon
            icon={logoIonitron}
            color="tertiary"
            size="large"
            slot="start"
          />
          <IonTitle>
            <IonLabel>
              CamDialect<IonLabel color={"tertiary"}>_AI</IonLabel>
            </IonLabel>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent color={"light"} ref={contentRef}>
        {showmsg && (
          <IonGrid className="welcomemsg">
            <IonIcon icon={logoIonitron} color="tertiary" size="large" />
            <IonLabel color={"medium"}> Hi {userInfo?.displayName}</IonLabel>
            <br />
            <IonLabel color={"medium"}>
              Welcome to CamDialect<IonLabel color={"tertiary"}>_AI</IonLabel>
            </IonLabel>
            <br />
            <IonLabel color={"medium"}>How can i help you today?</IonLabel>
          </IonGrid>
        )}

        <div style={{ marginTop: "3em", marginBottom: "6.5em" }}>
          <div>
            {" "}
            {update.map(({ card }, index) => (
              <IonItem
                color={"light"}
                key={index}
                lines="none"
                className="display"
                style={{
                  marginLeft: "-16px",
                  marginTop: "-0.5em",
                }}
              >
                {card}
              </IonItem>
            ))}
          </div>
        </div>

        <IonFooter className="footer" color="primary" collapse="fade">
          <IonToolbar className="footer1" color={"light"}>
            <IonItem
              slot="start"
              className={inputText.length > 10 ? "expand-item" : ""}
              style={{
                borderRadius: "30px",
                marginBottom: "15px",
              }}
              lines="none"
            >
              {" "}
              <IonTextarea
                value={inputText}
                clearOnEdit={true}
                onIonChange={(e: CustomEvent) => setInputText(e.detail.value)}
                placeholder="Message "
                className={inputText.length > 10 ? "expand-input" : ""}
                id="input"
                color={"tertiary"}
              ></IonTextarea>
            </IonItem>{" "}
            <IonButton
              className="send"
              color={"tertiary"}
              slot="end"
              onClick={handleSubmit}
            >
              <IonIcon
                style={{ fontSize: "28px" }}
                icon={paperPlaneSharp}
              ></IonIcon>
            </IonButton>
          </IonToolbar>{" "}
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default CamDialectAI;
