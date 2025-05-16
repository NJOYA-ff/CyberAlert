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
  IonMenu,
  IonMenuButton,
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
} from "ionicons/icons";
import React, { useState } from "react";
import logo from "../images/logo.png";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";
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
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  const categories = ["all", ...new Set(resources.map((r) => r.category))];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchText.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
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
      <IonPage id="main-content">
        {" "}
        <IonHeader class="ion-no-border">
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
                <IonButton routerLink="/">Home</IonButton>
                <IonButton routerLink="/Report-status">Report Status</IonButton>
                <IonButton routerLink="/File-a-complaint">
                  File a Complaint
                </IonButton>
                <IonButton routerLink="/Forum">Forum</IonButton>
                <IonButton routerLink="/Resources">Resources</IonButton>
              </IonButtons>
              <IonButton fill="outline">Sing in</IonButton>
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

          <IonFooter style={{ bottom: "0", marginTop: "30em" }}>
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
            </IonToolbar>{" "}
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

export default Resources;
