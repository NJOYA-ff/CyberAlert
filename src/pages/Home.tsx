import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
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
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import {
  alertCircle,
  chatbubbleEllipses,
  checkmarkCircle,
  documentTextOutline,
  footsteps,
  lockClosedOutline,
  logIn,
  logoFacebook,
  logoFlickr,
  logoInstagram,
  logoLinkedin,
  logoRss,
  logoYoutube,
  mailOutline,
  personCircle,
  personOutline,
  shield,
  wifi,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import background from "../images/background1.jpg";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import "../pages/Pages.scss";
import chart from "../images/chart.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router";
import { auth, storage } from "../firebaseConfig";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
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
  const [showWelcome, setShowWelcome] = useState(true);
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
    setShowWelcome(false);
  };
  const handleShowLogingoback = () => {
    setShowLogin(false);
    setShowButtons(true);
    setShowWelcome(true);
  };
  const handleShowSingup = () => {
    setShowSingup(true);
    setShowButtons(false);
    setShowWelcome(false);
  };
  const handleShowSingupgoback = () => {
    setShowSingup(false);
    setShowButtons(true);
    setShowWelcome(true);
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
  }
  return (
    <IonPage>
      <IonPage id="main-content">
        <IonHeader class="ion-no-border">
          <IonToolbar>
            <Link to="/" slot="start">
              <IonImg
                src={logo}
                style={{
                  height: "50px",
                  width: "50px",
                  marginLeft: "30px",
                  marginTop: "15px",
                }}
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
                <IonButton routerLink="/">Home</IonButton>
                <IonButton routerLink="/Report-status">Report Status</IonButton>
                <IonButton routerLink="/File-a-complaint">
                  File a Complaint
                </IonButton>
                <IonButton routerLink="/Forum">Forum</IonButton>
                <IonButton routerLink="/Resources">Resources</IonButton>
              </IonButtons>
              <IonButton fill="outline" onClick={handleShowLogin}>
                Sing in
              </IonButton>
            </IonGrid>{" "}
            <IonButtons slot="end" className="menubt">
              <IonMenuButton></IonMenuButton>{" "}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {" "}
          <IonGrid
            id="back"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(21, 21, 21, 0.7), rgba(21, 21, 21, 0.75),rgba(21, 21, 21, 0.81)),url(${background})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
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
                      onIonChange={(e: CustomEvent) =>
                        setEmail1(e.detail.value!)
                      }
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
                    Sign Up
                  </IonButton>
                  <br />
                  <br />
                  <IonGrid style={{ textAlign: "center" }}>
                    {" "}
                    <IonLabel>
                      Already register?{" "}
                      <IonLabel
                        color={"primary"}
                        onClick={handleShowSingupgoback}
                      >
                        Login
                      </IonLabel>
                    </IonLabel>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            )}
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
                    Sign In
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
                      onIonChange={(e: CustomEvent) =>
                        setEmail(e.detail.value!)
                      }
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
                    Log In
                  </IonButton>
                  <br />
                  <br />
                  <IonGrid style={{ textAlign: "center" }}>
                    {" "}
                    <IonLabel>
                      Not yet register?{" "}
                      <IonLabel
                        color={"primary"}
                        onClick={handleShowLogingoback}
                      >
                        Sing up
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
                      onIonChange={(e: CustomEvent) =>
                        setEmail2(e.detail.value!)
                      }
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
            {showWelcome && (
              <IonGrid
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: "white",
                }}
                className="infocont"
              >
                <IonText className="wlcmsg">
                  Welcome to CyberAlert a Cameroon Internet Crime Complaint
                  Center
                </IonText>
                <br />
                <br />
                <IonText className="info">
                  CyberAlert (Cameroon crime complaint center) is a central hub
                  for reporting Cyber-enabled crime. <br />
                  <br /> It is run by the CuberAlert community, Cameroon Police
                  and led by ANTIC (Agence Nationale des Technologies de
                  l'information et de la communication)
                </IonText>
                <br />
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      backgroundColor: "white",
                      width: "85%",
                      height: "2px",
                    }}
                  ></div>
                </div>
                <br />
                <br />
                <IonTitle style={{ fontSize: "22PX", fontWeight: "bold" }}>
                  File a Complaint with Us
                </IonTitle>
                <br />
                <div className="msg">
                  <IonIcon icon={alertCircle} /> If you or someone else is in
                  danger, please contact your local police.
                </div>
                <br />
                <IonText className="info">
                  CyberAlert focuses on collecting cyber-enabled crime. Crimes
                  against children,or any other types of crime such as threats
                  of terrorism should be reported to{" "}
                  <IonText color={"secondary"}>your locale police</IonText>
                </IonText>
                <br />
                <br />
                <br />
                <div
                  style={{
                    justifyContent: "center",
                    justifyItems: "center",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <IonButton
                    id="signup"
                    style={{
                      textTransform: "none",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                    routerLink="/File-a-complaint"
                  >
                    <IonIcon
                      icon={documentTextOutline}
                      style={{ marginRight: "5px" }}
                    />
                    File A Complaint
                  </IonButton>
                </div>
                <br />
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <div
                    style={{
                      backgroundColor: "var(--ion-color-dark)",
                      width: "85%",
                      height: "2px",
                    }}
                  ></div>
                </div>
              </IonGrid>
            )}
          </IonGrid>
          <br />
          <br />
          <IonGrid className="back">
            {" "}
            <IonTitle style={{ fontSize: "22PX", fontWeight: "bold" }}>
              How You Can Help
            </IonTitle>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <IonCard className="cards">
                <IonIcon
                  color="primary"
                  size="large"
                  icon={chatbubbleEllipses}
                  style={{ margin: "10px" }}
                />{" "}
                <IonCardTitle style={{ fontSize: "18PX", fontWeight: "bold" }}>
                  Tell us what happened.
                </IonCardTitle>
                <br />
                <IonCardContent>
                  File a report share information with the police. CyberAlert is
                  the main intake form for a variety of complaints -- everything
                  from cyber-enabled frauds and scams to cybercrime -- so file a
                  report even if you are unsure of whether your complaint
                  qualifies.
                </IonCardContent>
              </IonCard>
              <IonCard className="cards">
                <IonIcon
                  color="primary"
                  size="large"
                  icon={footsteps}
                  style={{ margin: "10px" }}
                />{" "}
                <IonCardTitle style={{ fontSize: "18PX", fontWeight: "bold" }}>
                  Your contribution and our mission.
                </IonCardTitle>
                <br />
                <IonCardContent>
                  Your report helps us fulfill our mission of protecting the
                  Cameroonian people. While we cannot guarantee a response to
                  every complaint, your report is still valuable. It helps us
                  understand the broader threat landscape. Futhermore, in those
                  cases where we are able to take action, we will work to
                  provide justice.
                </IonCardContent>
              </IonCard>
              <IonCard className="cards">
                <IonIcon
                  color="primary"
                  size="large"
                  icon={shield}
                  style={{ margin: "10px" }}
                />{" "}
                <IonCardTitle style={{ fontSize: "18PX", fontWeight: "bold" }}>
                  Protect yourself and others.
                </IonCardTitle>
                <br />
                <IonCardContent>
                  If you have suffered from a cyber-enabled crime, please know
                  that your are not alone. Use the resources on this site to
                  learn how to protect yourself and others from cybercrime.
                </IonCardContent>
              </IonCard>
            </div>
            <br />
            <div
              style={{
                backgroundColor: "var(--ion-color-dark)",
                width: "85%",
                height: "2px",
              }}
            ></div>
          </IonGrid>
          <IonGrid className="back">
            {" "}
            <IonTitle
              style={{
                fontSize: "22PX",
                fontWeight: "bold",
              }}
            >
              Protecting Our Digitally-connected World is a Top Priority and
              Focus of CyberAlert
            </IonTitle>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              <IonCard
                className="cards1"
                style={{
                  textAlign: "left",
                }}
              >
                <IonCardHeader>
                  {" "}
                  <IonCardTitle
                    style={{ fontSize: "18PX", fontWeight: "bold" }}
                  >
                    We Need You
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Between staying connected with the family and friends,
                  shopping and banking online, and working remotly, we all
                  depend on security in our interconnected digital world.
                  Criminals from every corner of the globe attack our digital
                  systems on a near constant basis. They strike targets large
                  and small - from corporate networks to personal smart phones.
                  No one - and no device - is immune from the threat. The only
                  way forward is together. In cyber security, where a single
                  compromise can impact millions of people, there can be no weak
                  links. Every organization and every individual needs to take
                  smart, reasonable steps to protect their own devices and
                  systems and to learn how to spot and avoid scams.
                </IonCardContent>
              </IonCard>
              <IonCard className="cards1">
                {" "}
                <IonImg src={chart} style={{ height: "20em" }} />
                <IonCardContent>
                  {" "}
                  <IonCardSubtitle
                    style={{ fontSize: "16PX", color: "var(--ion-color-dark)" }}
                  >
                    Chart includes loss data for the years 2019 to 2025. Over
                    this time period, over 37billion dallars were reported lost.
                  </IonCardSubtitle>
                </IonCardContent>
              </IonCard>
              <IonCard
                style={{
                  textAlign: "left",
                  fontSize: "16PX",
                  color: "var(--ion-color-dark)",
                }}
              >
                <IonCardHeader>
                  <IonCardTitle
                    style={{ fontSize: "18PX", fontWeight: "bold" }}
                  >
                    The Information You Submit to CyberAlert Alert Makes All the
                    difference
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  Combined with the other data, it allows the police to
                  investigate reported crimes, track trends and threats, and, in
                  some cases, even freeze stolen funds. Just as importantly,
                  CyberAlert shares reports of crime throughout its vast network
                  of Cameroon police field offices and law enforcement partners,
                  strengthening our nation's response both locally and
                  nationally. <br /> Due to the massive number of complaints, we
                  receive each year, CyberAlertcannot respond directly to every
                  submission, but please know we take each report seriously.
                  With your hepl, we can will respond faster, defend cyber
                  networrks better, and more effectively protect our nation.
                </IonCardContent>
              </IonCard>
            </div>
            <br />
            <div
              style={{
                backgroundColor: "var(--ion-color-dark)",
                width: "85%",
                height: "2px",
              }}
            ></div>
            <br />
            <IonTitle
              style={{
                fontSize: "22PX",
                fontWeight: "bold",
              }}
            >
              Recent CyberAlert Report
            </IonTitle>
            <br />
            <div
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              <IonGrid className="grids">
                {" "}
                <IonItem style={{ width: "100%" }}>
                  <IonLabel slot="start">Public</IonLabel>{" "}
                  <IonIcon icon={logoRss} slot="end" size="small" />
                </IonItem>
              </IonGrid>
              <IonGrid className="grids">
                <IonItem style={{ width: "100%" }}>
                  <IonLabel slot="start">Industry</IonLabel>{" "}
                  <IonIcon icon={logoRss} slot="end" size="small" />
                </IonItem>
              </IonGrid>
            </div>
          </IonGrid>{" "}
          <IonFooter>
            <IonToolbar>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <strong>CyberAlert</strong>
                    <br />
                    <a href="/">Home Page</a>
                    <br />
                    <a href="#">Privacy Policy</a>
                    <br />
                    <a href="#">About CyberAlert</a>
                  </IonCol>
                  <IonCol>
                    <strong>Cameroon Police</strong>
                    <br />
                    <a href="#">Home Page</a>
                    <br />
                    <a href="#">Privacy Policy</a>
                    <br />
                    <a href="#">About Cameroon</a>
                  </IonCol>
                  <IonCol>
                    <strong>ANTIC</strong>
                    <br />
                    <a href="#">Home Page</a>
                    <br />
                    <a href="#">Privacy Policy</a>
                    <br />
                    <a href="#">About ANTIC</a>
                  </IonCol>
                  <IonCol>
                    <strong>Contact the Press Office</strong>
                    <br />
                    (+237) 119
                    <br />
                    <a href="#">Accessibility Statement</a>
                    <br />
                    <a href="#">Questions? See the CyberAlert FAQ</a>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonToolbar>
          </IonFooter>
          <IonFooter>
            <IonToolbar
              class="ion-no-border"
              color={"secondary"}
              style={{ paddingLeft: "20%", paddingRight: "20%" }}
            >
              <IonGrid
                style={{ gap: "10px", fontSize: "22px", display: "flex" }}
              >
                {" "}
                <IonIcon icon={logoYoutube} />
                <IonIcon icon={logoFacebook} />
                <IonIcon icon={logoLinkedin} />
                <IonIcon icon={logoInstagram} />
                <IonIcon icon={logoFlickr} />
              </IonGrid>
            </IonToolbar>
          </IonFooter>
        </IonContent>
      </IonPage>
    </IonPage>
  );
};

export default Home;
