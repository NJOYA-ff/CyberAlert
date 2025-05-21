import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "../pages/Pages.scss";
import {
  logIn,
  mailOutline,
  lockClosedOutline,
  checkmarkCircle,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../firebaseConfig";
import logo from "../images/logo.png";
import flag from "../images/flag.jpg";
const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showSingup, setShowSingup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [showButtons, setShowButtons] = useState(true);
  const [showSingupupbt, setShowSingupupbt] = useState(true);
  const [showSingupupbt1, setShowSingupupbt1] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [message, setMassage] = useState("");
  const [color, setColor] = useState("");

  const [presentToast] = useIonToast();
  useEffect(() => {
    const isanyempty = email.trim() === "" || password.trim() === "";
    setShowSingupupbt(isanyempty);
  }, [email, password]);
  useEffect(() => {
    const isanyempty =
      email1.trim() === "" || password1.trim() === "" || name.trim() === "";
    setShowSingupupbt1(isanyempty);
  }, [email1, password1, name]);

  const handleShowResetPassword = () => {
    setShowLogin(false);
    setShowResetPassword(true);
  };
  const handleCancelResetPassword = () => {
    setShowLogin(true);
    setShowResetPassword(false);
    setMassage("");
    setEmail2("");
  };
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email2);
      setMassage("Password reset email sent. Please check your inbox");
      setColor("success");
    } catch {
      setMassage("Error sending password reset email. Please try again.");
      setColor("danger");
    }
  };
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       history.push("/Home");
  //     }
  //     load({
  //       duration: 500,
  //       spinner: "bubbles",
  //     });
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
      presentToast({
        message: "logged in successfully",
        position: "middle",
        duration: 1000,
        color: "light",
        cssClass: "custom-toast1",
        icon: checkmarkCircle,
      });
      console.log("User logged in successfully:", userCredential);
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      presentToast({
        message: "Error logging in ",
        position: "middle",
        duration: 1000,
        color: "light",
        cssClass: "custom-toast-error1",
      });
      console.error("Error logging in user:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar className="Ttoolbar">
          <IonGrid
            className="Ttoolbar"
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <IonImg src={flag} className="flag" />
            <IonNote className="note">
              An Official Website of Cameroon Government{" "}
              <Link to={"#"}> Here's how you know</Link>{" "}
            </IonNote>
          </IonGrid>
        </IonToolbar>
        <IonToolbar>
          <Link to={"/"} slot="start">
            {" "}
            <IonImg
              src={logo}
              style={{ height: "50px", width: "50px", marginLeft: "30px" }}
              slot="start"
            />
          </Link>
          <IonGrid className="menu">
            {" "}
            <IonButtons
              style={{
                textTransform: "none",
                gap: "10px",
              }}
            >
              <IonButton
                routerLink="/"
                className={location.pathname === "/" ? "active-button" : ""}
              >
                Home
              </IonButton>
              <IonButton
                routerLink="/Report-status"
                className={
                  location.pathname === "/Report-status" ? "active-button" : ""
                }
              >
                Report Status
              </IonButton>
              <IonButton
                routerLink="/File-a-complaint"
                className={
                  location.pathname === "/File-a-complaint"
                    ? "active-button"
                    : ""
                }
              >
                File a Complaint
              </IonButton>
              <IonButton
                routerLink="/Forum"
                className={
                  location.pathname === "/Forum" ? "active-button" : ""
                }
              >
                Forum
              </IonButton>
              <IonButton
                routerLink="/Resources"
                className={
                  location.pathname === "/Resources" ? "active-button" : ""
                }
              >
                Resources
              </IonButton>
            </IonButtons>
            <IonButton fill="outline" routerLink="/SignIn" color={"light"}>
              Singin
            </IonButton>
          </IonGrid>{" "}
          <IonButtons slot="end" className="menubt">
            <IonMenuButton></IonMenuButton>{" "}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid id="back1">
          {showLogin && (
            <IonCard className="Logincard">
              <IonCardHeader
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonIcon
                  icon={logIn}
                  color="primary"
                  style={{ fontSize: "44px" }}
                />{" "}
                <br />
                <IonTitle color={"primary"} style={{ fontWeight: "bold" }}>
                  SignIn
                </IonTitle>{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonIcon icon={mailOutline} color="primary" slot="end" />
                  <IonInput
                    label="Email"
                    labelPlacement="floating"
                    color={"primary"}
                    value={email}
                    onIonChange={(e: CustomEvent) => setEmail(e.detail.value!)}
                    type="email"
                    style={{ marginLeft: "10px" }}
                  ></IonInput>
                </IonItem>
                <br />

                <IonItem>
                  <IonIcon
                    icon={lockClosedOutline}
                    color="primary"
                    slot="end"
                  />
                  <IonInput
                    label="Password"
                    labelPlacement="floating"
                    color={"primary"}
                    value={password}
                    onIonChange={(e: CustomEvent) =>
                      setPassword(e.detail.value!)
                    }
                    type="password"
                    style={{ marginLeft: "10px" }}
                  ></IonInput>
                </IonItem>
                <br />
                <IonItem lines="none" onClick={handleShowResetPassword}>
                  {" "}
                  <IonText color={"primary"}>Forgot Password?</IonText>
                </IonItem>

                <br />

                <IonButton
                  expand="full"
                  style={{ textTransform: "none" }}
                  color={"primary"}
                  onClick={handleLogin}
                  disabled={showSingupupbt}
                  id="login1"
                >
                  SingIn
                </IonButton>
                <br />
                <br />
                <IonGrid style={{ textAlign: "center" }}>
                  {" "}
                  <IonLabel>
                    Not yet register?{" "}
                    <IonLabel color={"primary"}>
                      <Link to={"/SignUp"}>SingUp</Link>
                    </IonLabel>
                  </IonLabel>
                </IonGrid>
              </IonCardContent>{" "}
            </IonCard>
          )}

          {showResetPassword && (
            <IonCard className="Resetcard">
              <IonCardHeader
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonTitle color={"primary"} style={{ fontWeight: "bold" }}>
                  Reset Password
                </IonTitle>{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonIcon icon={mailOutline} color="primary" slot="end" />
                  <IonInput
                    label="Email"
                    labelPlacement="floating"
                    color={"primary"}
                    value={email2}
                    onIonChange={(e: CustomEvent) => setEmail2(e.detail.value!)}
                    type="email"
                    style={{ marginLeft: "10px" }}
                  ></IonInput>
                </IonItem>
                <br />
                <IonItem lines="none">
                  <IonButton
                    color={"primary"}
                    slot="end"
                    style={{ textTransform: "none" }}
                    onClick={handleResetPassword}
                  >
                    Send
                  </IonButton>
                  <IonButton
                    color={"primary"}
                    fill="outline"
                    slot="end"
                    style={{ textTransform: "none" }}
                    onClick={handleCancelResetPassword}
                  >
                    Cancel
                  </IonButton>
                </IonItem>

                <br />
                {message && <IonNote color={color}>{message} </IonNote>}
              </IonCardContent>
            </IonCard>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignIn;
