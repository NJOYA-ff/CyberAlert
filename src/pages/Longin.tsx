import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
} from "@ionic/react";
import { arrowBack, lockClosedOutline, mailOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useHistory } from "react-router";

const Longin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [showSign, setShowSign] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowButtons(false);
  };
  const handleShowLogingoback = () => {
    setShowLogin(false);
    setShowButtons(true);
  };
  const handleShowSign = () => {
    setShowSign(true);
    setShowButtons(false);
  };
  const handleShowSigngoback = () => {
    setShowSign(false);
    setShowButtons(true);
  };

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       history.push("/Home");
  //     }
  //   });
  // }, []);

  const history = useHistory();

  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in successfully:", userCredential);
      history.push("/Home");
    } catch (error) {
      console.error("Errorlogging in user:", error);
    }
  };

  const handleSignin = async () => {
    try {
      const auth = getAuth();
      const usercreateCredential = await createUserWithEmailAndPassword(
        auth,
        email1,
        password1
      );
      console.log("User registered successfully", usercreateCredential);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <IonPage>
      <IonContent>
        <br />
        <IonTitle style={{ fontSize: "1.5em" }}>
          Welcome to{" "}
          <IonTitle
            color={"primary"}
            style={{ fontSize: "3em", fontFamily: "Freestyle Script Regular" }}
          >
            {" "}
            CamDialect
          </IonTitle>
        </IonTitle>
        <br />

        {showSign && (
          <IonCard>
            <IonButton fill="clear" onClick={handleShowSigngoback}>
              {" "}
              <IonIcon icon={arrowBack} slot="icon-only" color="tertiary" />
            </IonButton>
            <IonCardHeader>
              <IonTitle color={"tertiary"}>Sing Up</IonTitle>{" "}
            </IonCardHeader>
            <IonCardContent>
              <IonLabel position="floating" color={"tertiary"}>
                Email
              </IonLabel>
              <IonItem>
                <IonIcon icon={mailOutline} color="tertiary" />
                <IonInput
                  value={email1}
                  onIonChange={(e: CustomEvent) => setEmail1(e.detail.value!)}
                  type="email"
                  style={{ marginLeft: "10px" }}
                ></IonInput>
              </IonItem>
              <br />

              <IonLabel position="floating" color={"tertiary"}>
                Password
              </IonLabel>
              <IonItem>
                <IonIcon icon={lockClosedOutline} color="tertiary" />
                <IonInput
                  value={password1}
                  onIonChange={(e: CustomEvent) =>
                    setPassword1(e.detail.value!)
                  }
                  type="password"
                  style={{ marginLeft: "10px" }}
                ></IonInput>
              </IonItem>
              <br />
              <br />
              <IonButton
                onClick={handleSignin}
                style={{ width: "95%", textTransform: "none" }}
                color={"tertiary"}
              >
                Sign Up
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
        {showLogin && (
          <IonCard>
            <IonCardHeader>
              <IonTitle color={"primary"}>Log In</IonTitle>{" "}
            </IonCardHeader>
            <IonCardContent>
              <IonLabel position="floating" color={"primary"}>
                Email
              </IonLabel>
              <IonItem>
                <IonIcon icon={mailOutline} color="primary" />
                <IonInput
                  value={email}
                  onIonChange={(e: CustomEvent) => setEmail(e.detail.value!)}
                  type="email"
                  style={{ marginLeft: "10px" }}
                ></IonInput>
              </IonItem>
              <br />
              <IonLabel position="floating" color={"primary"}>
                Password
              </IonLabel>
              <IonItem>
                <IonIcon icon={lockClosedOutline} color="primary" />
                <IonInput
                  value={password}
                  onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
                  type="password"
                  style={{ marginLeft: "10px" }}
                ></IonInput>
              </IonItem>
              <br />
              <IonLabel>
                Not yet register?{" "}
                <IonLabel color={"success"} onClick={handleShowLogingoback}>
                  Sing in
                </IonLabel>
              </IonLabel>
              <br />
              <br />
              <IonButton
                style={{ width: "95%", textTransform: "none" }}
                color={"primary"}
                onClick={handleLogin}
              >
                Log In
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
        {showButtons && (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "18px",
            }}
          >
            {" "}
            <IonButton
              onClick={handleShowLogin}
              color={"primary"}
              style={{ width: "95%", textTransform: "none" }}
            >
              Log In
            </IonButton>
            <br />
            <br />
            <IonButton
              onClick={handleShowSign}
              style={{ width: "95%", textTransform: "none" }}
              color={"tertiary"}
            >
              Sign Up
            </IonButton>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Longin;
