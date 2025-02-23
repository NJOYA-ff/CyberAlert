import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  useIonLoading,
  useIonToast,
} from "@ionic/react";
import {
  arrowBack,
  checkmarkCircle,
  lockClosedOutline,
  logIn,
  mailOutline,
  person,
  personCircle,
  personOutline,
} from "ionicons/icons";
import logo from "../images/Artboard 1.png";
import React, { useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router";
import { auth, storage } from "../main";

const Longin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [password1, setPassword1] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [showSingup, setShowSingup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showButtons, setShowButtons] = useState(true);
  const [showSingupupbt, setShowSingupupbt] = useState(true);
  const [showSingupupbt1, setShowSingupupbt1] = useState(true);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [message, setMassage] = useState("");
  const [color, setColor] = useState("");
  const [load] = useIonLoading();
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
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowButtons(false);
  };
  const handleShowLogingoback = () => {
    setShowLogin(false);
    setShowButtons(true);
  };
  const handleShowSingup = () => {
    setShowSingup(true);
    setShowButtons(false);
  };
  const handleShowSingupgoback = () => {
    setShowSingup(false);
    setShowButtons(true);
  };
  const handleShowResetPassword = () => {
    setShowLogin(false);
    setShowResetPassword(true);
  };
  const handleCancelResetPassword = () => {
    setShowLogin(true);
    setShowResetPassword(false);
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
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push("/Home");
      }
      load({
        duration: 500,
        spinner: "bubbles",
      });
    });
  }, []);

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
      history.push("/Home");
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
    /* <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                /> */
  }
  return (
    <IonPage>
      <IonContent class="ion-padding" color={"light"}>
        <IonTitle style={{ fontSize: "1em", alignText: "center" }}>
          Welcome to{" "}
          <IonTitle
            color={"primary"}
            style={{
              fontSize: "2.3em",
              fontFamily: "Freestyle Script Regular",
            }}
          >
            {" "}
            CamDialect
          </IonTitle>
        </IonTitle>
        <br />

        <br />

        {showSingup && (
          <IonCard>
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
                Sing Up
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
                <IonIcon icon={lockClosedOutline} color="tertiary" slot="end" />
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
                Sign Up
              </IonButton>
              <br />
              <br />
              <IonGrid style={{ textAlign: "center" }}>
                {" "}
                <IonLabel>
                  Already register?{" "}
                  <IonLabel color={"success"} onClick={handleShowSingupgoback}>
                    Login
                  </IonLabel>
                </IonLabel>
              </IonGrid>
            </IonCardContent>
          </IonCard>
        )}
        {showLogin && (
          <IonCard>
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
                Log In
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
                <IonIcon icon={lockClosedOutline} color="primary" slot="end" />
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  color={"primary"}
                  value={password}
                  onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
                  type="password"
                  style={{ marginLeft: "10px" }}
                ></IonInput>
              </IonItem>
              <br />
              <IonLabel
                color={"primary"}
                style={{ marginLeft: "20px" }}
                onClick={handleShowResetPassword}
              >
                forgot password?
              </IonLabel>
              <br />
              <br />
              <IonButton
                expand="full"
                style={{ textTransform: "none" }}
                color={"primary"}
                onClick={handleLogin}
                disabled={showSingupupbt}
                id="login1"
              >
                Log In
              </IonButton>
              <br />
              <br />
              <IonGrid style={{ textAlign: "center" }}>
                {" "}
                <IonLabel>
                  Not yet register?{" "}
                  <IonLabel color={"success"} onClick={handleShowLogingoback}>
                    Sing up
                  </IonLabel>
                </IonLabel>
              </IonGrid>
            </IonCardContent>{" "}
          </IonCard>
        )}
        {showResetPassword && (
          <IonCard>
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
        {showButtons && (
          <div
            style={{
              alignItems: "center",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            {" "}
            <IonButton
              id="login"
              expand="full"
              onClick={handleShowLogin}
              color={"primary"}
              style={{ textTransform: "none", borderRadius: "30px" }}
            >
              Log In
            </IonButton>
            <br />
            <br />
            <IonButton
              id="signup"
              expand="full"
              onClick={handleShowSingup}
              style={{ textTransform: "none" }}
              color={"tertiary"}
            >
              Sign Up
            </IonButton>
          </div>
        )}
        <IonGrid className="back" color="primary"></IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Longin;
