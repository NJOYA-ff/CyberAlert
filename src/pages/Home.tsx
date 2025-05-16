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
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
} from "@ionic/react";
import {
  alertCircle,
  chatbubbleEllipses,
  documentTextOutline,
  footsteps,
  logoFacebook,
  logoFlickr,
  logoInstagram,
  logoLinkedin,
  logoRss,
  logoYoutube,
  shield,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import logo from "../images/logo.png";
import background from "../images/background1.jpg";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "../pages/Pages.scss";
import chart from "../images/chart.png";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const fileacomplaint = () => {
    const [load] = useIonLoading();
    const history = useHistory();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        history.push("/SignIn");
        load({
          duration: 500,
          spinner: "bubbles",
        });
      } else {
        history.push("/File-a-complaint");
      }
    });
  };
  const date = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(
        collection(db, "CyberAlert-report-info:")
      );
      const dataArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(dataArray);
    };
    fetchData();
  }, []);
  const formatDate = (timestamp: any) => {
    if (!timestamp) return "No date available";
    const date = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
    };
    return date.toLocaleString("en-US", options);
  };
  const formatDate1 = (timestamp: any) => {
    if (!timestamp) return "No date available";
    const date = timestamp.toDate();
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
    };
    return date.toLocaleString("en-US", options);
  };
  return (
    <IonPage>
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
            <IonButton
              fill="outline"
              routerLink="/SignIn"
              className={location.pathname === "/SignIn" ? "active-button" : ""}
            >
              Singin
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
            backgroundImage: `linear-gradient(to top, rgba(21, 21, 21, 0), rgba(21, 21, 21, 0.75),rgba(21, 21, 21, 0.81)),url(${background})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <IonGrid
            style={{
              width: "100%",
              textAlign: "left",
              color: "white",
            }}
            className="infocont"
          >
            <IonText className="wlcmsg">
              Welcome to CyberAlert a Cameroon Internet Crime Complaint Center
            </IonText>
            <br />
            <br />
            <IonText className="info">
              CyberAlert (Cameroon crime complaint center) is a central hub for
              reporting Cyber-enabled crime. <br />
              <br /> It is run by the CuberAlert community, Cameroon Police and
              led by ANTIC (Agence Nationale des Technologies de l'information
              et de la communication)
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
              against children,or any other types of crime such as threats of
              terrorism should be reported to{" "}
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
                onClick={fileacomplaint}
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
                cases where we are able to take action, we will work to provide
                justice.
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
                that your are not alone. Use the resources on this site to learn
                how to protect yourself and others from cybercrime.
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
          <IonLabel
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Protecting Our Digitally-connected World is a Top Priority and Focus
            of CyberAlert
          </IonLabel>

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
                <IonCardTitle style={{ fontSize: "18PX", fontWeight: "bold" }}>
                  We Need You
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Between staying connected with the family and friends, shopping
                and banking online, and working remotly, we all depend on
                security in our interconnected digital world. Criminals from
                every corner of the globe attack our digital systems on a near
                constant basis. They strike targets large and small - from
                corporate networks to personal smart phones. No one - and no
                device - is immune from the threat. The only way forward is
                together. In cyber security, where a single compromise can
                impact millions of people, there can be no weak links. Every
                organization and every individual needs to take smart,
                reasonable steps to protect their own devices and systems and to
                learn how to spot and avoid scams.
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
                  Chart includes loss data for the years 2019 to 2025. Over this
                  time period, over 37billion dallars were reported lost.
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
                <IonCardTitle style={{ fontSize: "18PX", fontWeight: "bold" }}>
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
                strengthening our nation's response both locally and nationally.{" "}
                <br /> Due to the massive number of complaints, we receive each
                year, CyberAlertcannot respond directly to every submission, but
                please know we take each report seriously. With your hepl, we
                can will respond faster, defend cyber networrks better, and more
                effectively protect our nation.
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
          <div className="item-contain">
            <IonGrid className="grids">
              {" "}
              <IonItem style={{ width: "100%" }}>
                <IonLabel slot="start">Public</IonLabel>{" "}
                <IonIcon icon={logoRss} slot="end" size="small" />
              </IonItem>
              {data.map((item) => (
                <IonItem>
                  <IonCard>
                    <IonCardContent>
                      {formatDate1(item.timestamp)}
                    </IonCardContent>
                    <IonCard color={"primary"}>
                      <IonCardContent>
                        {formatDate(item.timestamp)}
                      </IonCardContent>
                    </IonCard>
                  </IonCard>{" "}
                  <IonLabel>
                    <Link to={"#"}>{item.field2}</Link>
                  </IonLabel>
                </IonItem>
              ))}
            </IonGrid>
            <IonGrid className="grids">
              <IonItem style={{ width: "100%" }}>
                <IonLabel slot="start">Industry</IonLabel>{" "}
                <IonIcon icon={logoRss} slot="end" size="small" />
              </IonItem>
              {data.map((item) => (
                <IonItem>
                  <IonCard>
                    <IonCardContent>
                      {formatDate1(item.timestamp)}
                    </IonCardContent>
                    <IonCard color={"primary"}>
                      <IonCardContent>
                        {formatDate(item.timestamp)}
                      </IonCardContent>
                    </IonCard>
                  </IonCard>{" "}
                  <IonLabel>
                    <Link to={"#"}>{item.field2}</Link>
                  </IonLabel>
                </IonItem>
              ))}
            </IonGrid>
          </div>
        </IonGrid>{" "}
        <IonFooter>
          <IonToolbar className="footer">
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
            <IonGrid style={{ gap: "10px", fontSize: "22px", display: "flex" }}>
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
  );
};

export default Home;
