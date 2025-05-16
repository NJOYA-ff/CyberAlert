import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenu,
  IonMenuButton,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import {
  logInOutline,
  caretForward,
  alertCircle,
  arrowUndo,
  checkmarkDone,
  closeCircle,
  documentText,
  hourglass,
  people,
  shieldCheckmark,
  statsChart,
  time,
} from "ionicons/icons";
import React, { useState } from "react";
import logo from "../images/logo.png";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";
type ReportStatus =
  | "submitted"
  | "under_review"
  | "resolved"
  | "rejected"
  | "action_taken";

interface Report {
  id: string;
  title: string;
  type: "scam" | "phishing" | "hacking" | "fraud" | "other";
  status: ReportStatus;
  dateSubmitted: string;
  lastUpdated: string;
  description: string;
  referenceNumber: string;
  updates: ReportUpdate[];
  authoritiesNotified?: string[];
}

interface ReportUpdate {
  id: string;
  date: string;
  message: string;
  author: string;
  isSystemUpdate: boolean;
}
const ReportStatus: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<ReportStatus | "all">(
    "all"
  );
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useIonViewWillEnter(() => {
    // Simulate loading data
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 1000);
  });

  const filteredReports =
    selectedStatus === "all"
      ? reports
      : reports.filter((report) => report.status === selectedStatus);

  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return hourglass;
      case "under_review":
        return time;
      case "resolved":
        return checkmarkDone;
      case "rejected":
        return closeCircle;
      case "action_taken":
        return shieldCheckmark;
      default:
        return documentText;
    }
  };

  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return "warning";
      case "under_review":
        return "primary";
      case "resolved":
        return "success";
      case "rejected":
        return "danger";
      case "action_taken":
        return "tertiary";
      default:
        return "medium";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <IonPage>
      <Menu1 />
      <IonPage id="main-content">
        {" "}
        <IonHeader class="ion-no-border">
          <IonToolbar>
            <Link to={"/"} slot="start">
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
              <IonMenuButton></IonMenuButton>{" "}
            </IonButtons>
          </IonToolbar>
          <IonToolbar>
            <IonTitle>Report Status</IonTitle>
            <IonButtons slot="end">
              <IonButton routerLink="/File-a-complaint">
                <IonIcon slot="icon-only" icon={documentText} />
              </IonButton>
            </IonButtons>
          </IonToolbar>

          <IonToolbar>
            <IonSegment
              value={selectedStatus}
              onIonChange={(e) =>
                setSelectedStatus(e.detail.value as ReportStatus | "all")
              }
              scrollable
            >
              <IonSegmentButton value="all">
                <IonLabel>All</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="submitted">
                <IonLabel>Submitted</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="under_review">
                <IonLabel>Review</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="action_taken">
                <IonLabel>Action</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="resolved">
                <IonLabel>Resolved</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="rejected">
                <IonLabel>Rejected</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonLoading isOpen={isLoading} message="Loading your reports..." />

          {selectedReport ? (
            <ReportDetails
              report={selectedReport}
              onBack={() => setSelectedReport(null)}
            />
          ) : (
            <>
              {filteredReports.length === 0 ? (
                <div className="empty-state">
                  <IonIcon icon={documentText} size="large" />
                  <IonText>
                    <h3>No reports found</h3>
                    <p>
                      You haven't submitted any reports yet, or none match your
                      current filter.
                    </p>
                  </IonText>
                  <IonButton routerLink="/File-a-complaint" fill="outline">
                    Submit New Report
                  </IonButton>
                </div>
              ) : (
                <IonList>
                  {filteredReports.map((report) => (
                    <IonItem
                      key={report.id}
                      onClick={() => setSelectedReport(report)}
                      detail
                    >
                      <IonIcon
                        slot="start"
                        icon={getStatusIcon(report.status)}
                        color={getStatusColor(report.status)}
                      />
                      <IonLabel>
                        <h2>{report.title}</h2>
                        <p className="report-meta">
                          <IonText color="medium">
                            {formatDate(report.dateSubmitted)} • {report.type}
                          </IonText>
                        </p>
                      </IonLabel>
                      <IonBadge
                        slot="end"
                        color={getStatusColor(report.status)}
                      >
                        {report.status.replace("_", " ")}
                      </IonBadge>
                    </IonItem>
                  ))}
                </IonList>
              )}
            </>
          )}
        </IonContent>
      </IonPage>
    </IonPage>
  );
};
const ReportDetails: React.FC<{ report: Report; onBack: () => void }> = ({
  report,
  onBack,
}) => {
  const getStatusColor = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return "warning";
      case "under_review":
        return "primary";
      case "resolved":
        return "success";
      case "rejected":
        return "danger";
      case "action_taken":
        return "tertiary";
      default:
        return "medium";
    }
  };
  const getStatusIcon = (status: ReportStatus) => {
    switch (status) {
      case "submitted":
        return hourglass;
      case "under_review":
        return time;
      case "resolved":
        return checkmarkDone;
      case "rejected":
        return closeCircle;
      case "action_taken":
        return shieldCheckmark;
      default:
        return documentText;
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  return (
    <div className="report-details">
      <IonCard>
        <IonCardHeader>
          <IonButtons>
            <IonButton onClick={onBack}>
              <IonIcon slot="start" icon={arrowUndo} />
              Back to reports
            </IonButton>
          </IonButtons>
          <IonCardTitle>{report.title}</IonCardTitle>
          <div className="report-status-header">
            <IonBadge color={getStatusColor(report.status)}>
              <IonIcon icon={getStatusIcon(report.status)} />
              {report.status.replace("_", " ")}
            </IonBadge>
            <IonNote>Reference: {report.referenceNumber}</IonNote>
          </div>
        </IonCardHeader>

        <IonCardContent>
          <div className="report-meta">
            <IonText>
              <strong>Report Type:</strong> {report.type}
            </IonText>
            <IonText>
              <strong>Submitted:</strong> {formatDate(report.dateSubmitted)}
            </IonText>
            <IonText>
              <strong>Last Updated:</strong> {formatDate(report.lastUpdated)}
            </IonText>
          </div>

          <div className="report-description">
            <h3>Description</h3>
            <p>{report.description}</p>
          </div>

          {report.authoritiesNotified &&
            report.authoritiesNotified.length > 0 && (
              <div className="authorities-notified">
                <h3>
                  <IonIcon icon={shieldCheckmark} /> Authorities Notified
                </h3>
                <IonList>
                  {report.authoritiesNotified.map((authority, index) => (
                    <IonItem key={index}>
                      <IonLabel>{authority}</IonLabel>
                    </IonItem>
                  ))}
                </IonList>
              </div>
            )}

          <div className="report-timeline">
            <h3>
              <IonIcon icon={time} /> Updates
            </h3>
            <div className="timeline">
              {report.updates.map((update) => (
                <div key={update.id} className="timeline-item">
                  <div className="timeline-badge">
                    <IonIcon
                      icon={update.isSystemUpdate ? statsChart : people}
                      color={update.isSystemUpdate ? "primary" : "secondary"}
                    />
                  </div>
                  <div className="timeline-content">
                    <IonText>
                      <strong>{update.author}</strong> •{" "}
                      {formatDate(update.date)}
                    </IonText>
                    <p>{update.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="report-actions">
            <IonButton expand="block" fill="outline">
              <IonIcon slot="start" icon={alertCircle} />
              Add Additional Information
            </IonButton>
            <IonButton expand="block" color="danger" fill="outline">
              <IonIcon slot="start" icon={closeCircle} />
              Withdraw Report
            </IonButton>
          </div>
        </IonCardContent>
      </IonCard>
    </div>
  );
};
const mockReports: Report[] = [
  {
    id: "1",
    title: "Phishing Email from Fake Bank",
    type: "phishing",
    status: "action_taken",
    dateSubmitted: "2023-05-15T10:30:00",
    lastUpdated: "2023-05-20T14:45:00",
    description:
      "Received an email pretending to be from my bank asking for login credentials. The email had several spelling mistakes and the sender address looked suspicious.",
    referenceNumber: "CYB-2023-01578",
    authoritiesNotified: [
      "Local Police Cyber Unit",
      "National Cyber Security Center",
    ],
    updates: [
      {
        id: "1-1",
        date: "2023-05-15T10:35:00",
        message:
          "Report submitted successfully. Your reference number is CYB-2023-01578",
        author: "System",
        isSystemUpdate: true,
      },
      {
        id: "1-2",
        date: "2023-05-16T09:15:00",
        message: "Your report has been assigned to a case officer for review.",
        author: "Case Officer Smith",
        isSystemUpdate: false,
      },
      {
        id: "1-3",
        date: "2023-05-18T11:20:00",
        message:
          "We have identified this as part of a larger phishing campaign. Relevant authorities have been notified.",
        author: "Case Officer Smith",
        isSystemUpdate: false,
      },
      {
        id: "1-4",
        date: "2023-05-20T14:45:00",
        message:
          "The fraudulent website has been taken down. Thank you for your report which helped protect others.",
        author: "Cyber Crime Team",
        isSystemUpdate: false,
      },
    ],
  },
  {
    id: "2",
    title: "Tech Support Scam Call",
    type: "scam",
    status: "under_review",
    dateSubmitted: "2023-05-22T16:20:00",
    lastUpdated: "2023-05-23T09:10:00",
    description:
      "Received a call from someone claiming to be from Microsoft support saying my computer was infected. They asked for remote access which I refused.",
    referenceNumber: "CYB-2023-01892",
    updates: [
      {
        id: "2-1",
        date: "2023-05-22T16:25:00",
        message:
          "Report submitted successfully. Your reference number is CYB-2023-01892",
        author: "System",
        isSystemUpdate: true,
      },
      {
        id: "2-2",
        date: "2023-05-23T09:10:00",
        message:
          "Your report is being reviewed by our team. We may contact you for additional information.",
        author: "Support Team",
        isSystemUpdate: false,
      },
    ],
  },
  {
    id: "3",
    title: "Social Media Account Hacked",
    type: "hacking",
    status: "submitted",
    dateSubmitted: "2023-05-25T08:45:00",
    lastUpdated: "2023-05-25T08:45:00",
    description:
      "My Instagram account was compromised yesterday. The hacker changed the password and email associated with the account.",
    referenceNumber: "CYB-2023-02045",
    updates: [
      {
        id: "3-1",
        date: "2023-05-25T08:50:00",
        message:
          "Report submitted successfully. Your reference number is CYB-2023-02045",
        author: "System",
        isSystemUpdate: true,
      },
    ],
  },
];
export default ReportStatus;
