import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
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
  IonList,
  IonMenu,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import {
  logInOutline,
  caretForward,
  documentText,
  link,
  videocam,
  download,
  logoFacebook,
  logoFlickr,
  logoInstagram,
  logoLinkedin,
  logoYoutube,
  callOutline,
  locationOutline,
  logoTwitter,
  mailOutline,
} from "ionicons/icons";
import React, { useState } from "react";
import logo from "../images/logo.png";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";
import flag from "../images/flag.jpg";
interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: "pdf" | "video" | "link" | "presentation";
  category: string;
  url: string;
  date?: string;
  fileSize?: string;
}
const Resources: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Sample data matching cyberalert's resource categories
  const resources: ResourceItem[] = [
    {
      id: "elder-fraud-psa",
      title: "Elder Fraud PSA",
      description: "Public service announcement about elder fraud prevention",
      type: "video",
      category: "psa",
      url: "https://www.cyberalert.gov/Media/Video/",
      date: "2023-01-15",
    },
    {
      id: "cyberalert-annual-report",
      title: "CyberAlert Annual Report",
      description:
        "Latest annual report from the Internet Crime Complaint Center",
      type: "pdf",
      category: "reports",
      url: "https://www.cyberalert.gov/Media/PDF/AnnualReport.pdf",
      date: "2023-03-20",
      fileSize: "2.4 MB",
    },
    {
      id: "tech-support-fraud",
      title: "Tech Support Fraud",
      description: "Information about tech support fraud schemes",
      type: "pdf",
      category: "scams",
      url: "https://www.cyberalert.gov/Media/PDF/techsupport.pdf",
      date: "2022-11-10",
      fileSize: "1.1 MB",
    },
  ];

  const categories = ["All", ...new Set(resources.map((r) => r.category))];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resourcesByCategory = filteredResources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, ResourceItem[]>);

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      psa: "Public Service Announcements",
      reports: "Reports",
      scams: "Common Scams",
      prevention: "Prevention Tips",
    };
    return titles[category] || category;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return documentText;
      case "video":
        return videocam;
      case "link":
        return link;
      default:
        return documentText;
    }
  };
  return (
    <IonPage>
      {" "}
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
            <IonMenuButton />{" "}
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>Resources</IonTitle>
        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            value={searchText}
            onIonChange={(e) => setSearchText(e.detail.value!)}
            placeholder="Search resources..."
          />
        </IonToolbar>

        <IonToolbar>
          <IonSegment
            value={selectedCategory}
            onIonChange={(e) => setSelectedCategory(e.detail.value as string)}
            scrollable
            color={"warning"}
          >
            {categories.map((category) => (
              <IonSegmentButton key={category} value={category}>
                <IonLabel>{getCategoryTitle(category)}</IonLabel>
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent className="resources-content">
        {Object.keys(resourcesByCategory).length === 0 ? (
          <div className="no-results">
            <IonCard>
              <IonCardContent>
                No resources found matching your criteria.
              </IonCardContent>
            </IonCard>
          </div>
        ) : (
          Object.entries(resourcesByCategory).map(([category, items]) => (
            <div key={category} className="resource-category">
              <h2 className="category-title">{getCategoryTitle(category)}</h2>
              <div className="resource-grid">
                {items.map((resource) => (
                  <IonCard key={resource.id} className="resource-card">
                    <IonCardHeader>
                      <IonIcon
                        icon={getIcon(resource.type)}
                        color="primary"
                        className="resource-icon"
                      />
                      <IonCardTitle>{resource.title}</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                      <p>{resource.description}</p>

                      <div className="resource-meta">
                        {resource.date && (
                          <IonItem lines="none">
                            <IonLabel>
                              Date:{" "}
                              {new Date(resource.date).toLocaleDateString()}
                            </IonLabel>
                          </IonItem>
                        )}
                        {resource.fileSize && (
                          <IonItem lines="none">
                            <IonLabel>Size: {resource.fileSize}</IonLabel>
                          </IonItem>
                        )}
                      </div>

                      <IonButton
                        expand="block"
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resource-button"
                      >
                        <IonIcon slot="start" icon={download} />
                        {resource.type === "video" ? "Watch" : "Download"}
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </div>
          ))
        )}

        <IonFooter className="cyber-footer" translucent={false}>
          <IonToolbar className="footer-toolbar">
            <IonGrid>
              {/* Main footer content */}
              <IonRow>
                {/* Quick Links */}
                <IonCol size="12" sizeMd="3">
                  <IonTitle className="footer-title">Liens Rapides</IonTitle>
                  <IonList lines="none" className="footer-list">
                    <IonItem routerLink="/alerts" className="footer-item">
                      <IonLabel>Alerts</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/report" className="footer-item">
                      <IonLabel>Report</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/resources" className="footer-item">
                      <IonLabel>Ressources</IonLabel>
                    </IonItem>
                    <IonItem routerLink="/about" className="footer-item">
                      <IonLabel>About</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>

                {/* Contact Info */}
                <IonCol size="12" sizeMd="4">
                  <IonTitle className="footer-title">Contact Us</IonTitle>
                  <IonList lines="none" className="footer-list">
                    <IonItem className="footer-item">
                      <IonIcon
                        icon={locationOutline}
                        slot="start"
                        color="light"
                      />
                      <IonLabel>MINPOSTEL, Yaoundé, Cameroun</IonLabel>
                    </IonItem>
                    <IonItem className="footer-item">
                      <IonIcon icon={callOutline} slot="start" color="light" />
                      <IonLabel>(+237) 222 22 22 22</IonLabel>
                    </IonItem>
                    <IonItem className="footer-item">
                      <IonIcon icon={mailOutline} slot="start" color="light" />
                      <IonLabel>contact@cyberalert.cm</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>

                {/* Social Media */}
                <IonCol size="12" sizeMd="3">
                  <IonTitle className="footer-title">Follow Us</IonTitle>
                  <IonList lines="none" className="footer-list social-list">
                    <IonItem
                      href="https://facebook.com/cyberalertcm"
                      target="_blank"
                      className="footer-item"
                    >
                      <IonIcon icon={logoFacebook} slot="start" color="light" />
                      <IonLabel>Facebook</IonLabel>
                    </IonItem>
                    <IonItem
                      href="https://twitter.com/cyberalertcm"
                      target="_blank"
                      className="footer-item"
                    >
                      <IonIcon icon={logoTwitter} slot="start" color="light" />
                      <IonLabel>Twitter</IonLabel>
                    </IonItem>
                    <IonItem
                      href="https://linkedin.com/company/cyberalertcm"
                      target="_blank"
                      className="footer-item"
                    >
                      <IonIcon icon={logoLinkedin} slot="start" color="light" />
                      <IonLabel>LinkedIn</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCol>

                {/* Emergency Contact */}
                <IonCol size="12" sizeMd="2">
                  <div className="emergency-box">
                    <IonTitle className="emergency-title">Emergency</IonTitle>
                    <div className="emergency-number">117</div>
                    <p className="emergency-text">
                      Cyber alert emergency number
                    </p>
                  </div>
                </IonCol>
              </IonRow>

              {/* Copyright and bottom bar */}
              <IonRow>
                <IonCol size="12">
                  <div className="footer-bottom">
                    <p>
                      © {new Date().getFullYear()} Cyber Alert center Cameroun.
                      All rights reserved.
                    </p>
                    <div className="footer-links">
                      <a href="/privacy">Confidentiality</a>
                      <a href="/accessibility">Accessibility</a>
                      <a href="/disclaimer">Warning</a>
                    </div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonToolbar>
        </IonFooter>
      </IonContent>
    </IonPage>
  );
};

export default Resources;
