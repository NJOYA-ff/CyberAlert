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
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import {
  personCircle,
  personOutline,
  mailOutline,
  lockClosedOutline,
  checkmarkCircle,
} from "ionicons/icons";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "../pages/Pages.scss";
import { storage } from "../firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import flag from "../images/flag.jpg";
const SingUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showSingup, setShowSingup] = useState(true);
  const [showSingupupbt, setShowSingupupbt] = useState(true);
  const [showSingupupbt1, setShowSingupupbt1] = useState(true);
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
  const handleSignup = async () => {
    try {
      const auth = getAuth();
      const usercreateCredential = await createUserWithEmailAndPassword(
        auth,
        email1,
        password1
      );
      const user = usercreateCredential.user;
      await updateProfile(user, {
        displayName: name,
      });
      if (photo && user) {
        const storageRef = ref(storage, `profilePhotos/${user.uid}`);
        await uploadBytes(storageRef, photo);
        const photoURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL });
      }
      presentToast({
        message: "Registered successfully",
        position: "middle",
        duration: 1000,
        color: "light",
        cssClass: "custom-toast1",
        icon: checkmarkCircle,
      });
      console.log("User registered successfully", usercreateCredential);
      setEmail1("");
      setPassword1("");
      setName("");
    } catch (error) {
      presentToast({
        message: "Error registering user",
        position: "middle",
        duration: 1000,
        color: "light",
        cssClass: "custom-toast-error1",
      });
      console.error("Error registering user:", error);
    }
  };
  {
  }

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
          {" "}
          {showSingup && (
            <IonCard className="Singupcard">
              {" "}
              <IonCardHeader
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IonIcon
                  icon={personCircle}
                  color="tertiary"
                  style={{ fontSize: "44px" }}
                />{" "}
                <br />
                <IonTitle color={"tertiary"} style={{ fontWeight: "bold" }}>
                  SingUp
                </IonTitle>{" "}
              </IonCardHeader>
              <IonCardContent>
                <IonItem>
                  <IonIcon icon={personOutline} color="tertiary" slot="end" />
                  <IonInput
                    label="Name"
                    labelPlacement="floating"
                    color={"tertiary"}
                    value={name}
                    onIonChange={(e: CustomEvent) => setName(e.detail.value!)}
                    style={{ marginLeft: "10px" }}
                  ></IonInput>
                </IonItem>
                <br />
                <IonItem>
                  <IonIcon icon={mailOutline} color="tertiary" slot="end" />
                  <IonInput
                    label="Email"
                    labelPlacement="floating"
                    color={"tertiary"}
                    value={email1}
                    onIonChange={(e: CustomEvent) => setEmail1(e.detail.value!)}
                    type="email"
                    style={{ marginLeft: "10px" }}
                  ></IonInput>
                </IonItem>
                <br />
                <IonItem>
                  <IonIcon
                    icon={lockClosedOutline}
                    color="tertiary"
                    slot="end"
                  />
                  <IonInput
                    label="Password"
                    labelPlacement="floating"
                    color={"tertiary"}
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
                  expand="full"
                  onClick={handleSignup}
                  style={{ textTransform: "none" }}
                  color={"tertiary"}
                  disabled={showSingupupbt1}
                  id="signup1"
                >
                  SignUp
                </IonButton>
                <br />
                <br />
                <IonGrid style={{ textAlign: "center" }}>
                  {" "}
                  <IonLabel>
                    Already register?{" "}
                    <IonLabel color={"primary"}>
                      <Link to={"/SignIn"}> SignIn</Link>
                    </IonLabel>
                  </IonLabel>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          )}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SingUp;
