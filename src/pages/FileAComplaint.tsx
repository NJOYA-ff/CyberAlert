import {
  IonAlert,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonDatetime,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonNote,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTextarea,
  IonToolbar,
} from "@ionic/react";
import {
  logInOutline,
  caretForward,
  logoFacebook,
  logoFlickr,
  logoInstagram,
  logoLinkedin,
  logoYoutube,
} from "ionicons/icons";
import "../pages/Pages.scss";
import React, { useState } from "react";
import logo from "../images/logo.png";
import Menu1 from "../components/Menu1";
import { Link } from "react-router-dom";
const FileAComplaint: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Complainant Information
    complainantType: "individual",
    firstName: "",
    middleName: "",
    lastName: "",
    title: "",
    email: "",
    confirmEmail: "",
    phone: "",
    phoneType: "cell",
    extension: "",
    preferredContact: "email",

    // Step 2: Complainant Address
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",

    // Step 3: Victim Information
    victimType: "individual",
    victimName: "",
    victimEmail: "",
    victimPhone: "",
    financialLoss: false,
    lossAmount: "",
    lossType: "",

    // Step 4: Incident Information
    incidentDate: "",
    incidentType: "",
    incidentDescription: "",
    additionalInfo: "",

    // Step 5: Review and Submit
    agreement: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = () => {
    // Here you would typically send the data to a backend
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setCurrentStep(1); // Reset form after submission
    setFormData({
      complainantType: "individual",
      firstName: "",
      middleName: "",
      lastName: "",
      title: "",
      email: "",
      confirmEmail: "",
      phone: "",
      phoneType: "cell",
      extension: "",
      preferredContact: "email",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zip: "",
      country: "United States",
      victimType: "individual",
      victimName: "",
      victimEmail: "",
      victimPhone: "",
      financialLoss: false,
      lossAmount: "",
      lossType: "",
      incidentDate: "",
      incidentType: "",
      incidentDescription: "",
      additionalInfo: "",
      agreement: false,
    });
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // List of US states for dropdown
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  // Incident types matching IC3 categories
  const incidentTypes = [
    "Business Email Compromise",
    "Confidence Fraud/Romance",
    "Corporate Data Breach",
    "Crime Against Children",
    "Denial of Service/TDoS",
    "Extortion",
    "Identity Theft",
    "Investment",
    "IPR/Copyright and Counterfeit",
    "Mass Marketing",
    "Non-Payment/Non-Delivery",
    "Personal Data Breach",
    "Real Estate/Rental",
    "Recovery Schemes",
    "Social Media",
    "Tech Support",
    "Terrorism",
    "Threats of Violence",
    "Other",
  ];
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
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>CyberAlert</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>
                Please complete the following complaint form to file a complaint
                with CyberAlert.
              </p>
              <p>
                All fields marked with <IonNote color="danger">*</IonNote> are
                required.
              </p>
            </IonCardContent>
          </IonCard>
          {/* Progress Indicator */}
          <IonGrid className="progress-indicator">
            <IonRow>
              {[1, 2, 3, 4, 5].map((step) => (
                <IonCol key={step} size="auto">
                  <div
                    className={`step-circle ${
                      currentStep === step ? "active" : ""
                    }`}
                  >
                    {step}
                  </div>
                  <div className="step-label">
                    {step === 1 && "Complainant"}
                    {step === 2 && "Address"}
                    {step === 3 && "Victim"}
                    {step === 4 && "Incident"}
                    {step === 5 && "Review"}
                  </div>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
          {/* Step 1: Complainant Information */}
          {currentStep === 1 && (
            <div className="form-step">
              <h2>Complainant Information</h2>
              <IonItem>
                <IonLabel position="stacked">
                  You are filing as: <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.complainantType}
                  onIonChange={(e) =>
                    handleInputChange("complainantType", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  <IonSelectOption value="individual">
                    Individual
                  </IonSelectOption>
                  <IonSelectOption value="business">Business</IonSelectOption>
                  <IonSelectOption value="financialInstitution">
                    Financial Institution
                  </IonSelectOption>
                  <IonSelectOption value="government">
                    Government Entity
                  </IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  First Name <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.firstName}
                  onIonChange={(e) =>
                    handleInputChange("firstName", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Middle Name</IonLabel>
                <IonInput
                  type="text"
                  value={formData.middleName}
                  onIonChange={(e) =>
                    handleInputChange("middleName", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Last Name <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.lastName}
                  onIonChange={(e) =>
                    handleInputChange("lastName", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Title</IonLabel>
                <IonInput
                  type="text"
                  value={formData.title}
                  onIonChange={(e) =>
                    handleInputChange("title", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Email <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="email"
                  value={formData.email}
                  onIonChange={(e) =>
                    handleInputChange("email", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Confirm Email <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="email"
                  value={formData.confirmEmail}
                  onIonChange={(e) =>
                    handleInputChange("confirmEmail", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Phone Number <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="tel"
                  value={formData.phone}
                  onIonChange={(e) =>
                    handleInputChange("phone", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Phone Type <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.phoneType}
                  onIonChange={(e) =>
                    handleInputChange("phoneType", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  <IonSelectOption value="cell">Cell</IonSelectOption>
                  <IonSelectOption value="home">Home</IonSelectOption>
                  <IonSelectOption value="work">Work</IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Extension</IonLabel>
                <IonInput
                  type="text"
                  value={formData.extension}
                  onIonChange={(e) =>
                    handleInputChange("extension", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Preferred Contact Method <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonRadioGroup
                  value={formData.preferredContact}
                  onIonChange={(e) =>
                    handleInputChange("preferredContact", e.detail.value)
                  }
                >
                  <IonItem lines="none">
                    <IonRadio slot="start" value="email" />
                    <IonLabel>Email</IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonRadio slot="start" value="phone" />
                    <IonLabel>Phone</IonLabel>
                  </IonItem>
                </IonRadioGroup>
              </IonItem>

              <div className="navigation-buttons">
                <IonButton expand="block" onClick={nextStep}>
                  Next
                </IonButton>
              </div>
            </div>
          )}
          {/* Step 2: Complainant Address */}
          {currentStep === 2 && (
            <div className="form-step">
              <h2>Complainant Address</h2>
              <IonItem>
                <IonLabel position="stacked">
                  Address Line 1 <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.address1}
                  onIonChange={(e) =>
                    handleInputChange("address1", e.detail.value)
                  }
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Address Line 2</IonLabel>
                <IonInput
                  type="text"
                  value={formData.address2}
                  onIonChange={(e) =>
                    handleInputChange("address2", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  City <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.city}
                  onIonChange={(e) => handleInputChange("city", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  State <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.state}
                  onIonChange={(e) =>
                    handleInputChange("state", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  {usStates.map((state) => (
                    <IonSelectOption key={state} value={state}>
                      {state}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  ZIP Code <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.zip}
                  onIonChange={(e) => handleInputChange("zip", e.detail.value)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Country <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.country}
                  onIonChange={(e) =>
                    handleInputChange("country", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  <IonSelectOption value="United States">
                    United States
                  </IonSelectOption>
                  <IonSelectOption value="Canada">Canada</IonSelectOption>
                  <IonSelectOption value="Other">Other</IonSelectOption>
                </IonSelect>
              </IonItem>

              <div className="navigation-buttons">
                <IonButton fill="outline" onClick={prevStep}>
                  Back
                </IonButton>
                <IonButton onClick={nextStep}>Next</IonButton>
              </div>
            </div>
          )}
          {/* Step 3: Victim Information */}
          {currentStep === 3 && (
            <div className="form-step">
              <h2>Victim Information</h2>
              <IonItem>
                <IonLabel position="stacked">
                  Victim Type <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.victimType}
                  onIonChange={(e) =>
                    handleInputChange("victimType", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  <IonSelectOption value="individual">
                    Individual
                  </IonSelectOption>
                  <IonSelectOption value="business">Business</IonSelectOption>
                  <IonSelectOption value="financialInstitution">
                    Financial Institution
                  </IonSelectOption>
                  <IonSelectOption value="government">
                    Government Entity
                  </IonSelectOption>
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Victim Name (if different from complainant)
                </IonLabel>
                <IonInput
                  type="text"
                  value={formData.victimName}
                  onIonChange={(e) =>
                    handleInputChange("victimName", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Victim Email</IonLabel>
                <IonInput
                  type="email"
                  value={formData.victimEmail}
                  onIonChange={(e) =>
                    handleInputChange("victimEmail", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Victim Phone</IonLabel>
                <IonInput
                  type="tel"
                  value={formData.victimPhone}
                  onIonChange={(e) =>
                    handleInputChange("victimPhone", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel>
                  Did you experience financial loss?{" "}
                  <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonCheckbox
                  slot="start"
                  checked={formData.financialLoss}
                  onIonChange={(e) =>
                    handleInputChange("financialLoss", e.detail.checked)
                  }
                />
              </IonItem>

              {formData.financialLoss && (
                <>
                  <IonItem>
                    <IonLabel position="stacked">
                      Estimated Loss Amount <IonNote color="danger">*</IonNote>
                    </IonLabel>
                    <IonInput
                      type="text"
                      value={formData.lossAmount}
                      onIonChange={(e) =>
                        handleInputChange("lossAmount", e.detail.value)
                      }
                      required
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">
                      Type of Loss <IonNote color="danger">*</IonNote>
                    </IonLabel>
                    <IonInput
                      type="text"
                      value={formData.lossType}
                      onIonChange={(e) =>
                        handleInputChange("lossType", e.detail.value)
                      }
                      required
                    />
                  </IonItem>
                </>
              )}

              <div className="navigation-buttons">
                <IonButton fill="outline" onClick={prevStep}>
                  Back
                </IonButton>
                <IonButton onClick={nextStep}>Next</IonButton>
              </div>
            </div>
          )}
          {/* Step 4: Incident Information */}
          {currentStep === 4 && (
            <div className="form-step">
              <h2>Incident Information</h2>
              <IonItem>
                <IonLabel position="stacked">
                  Incident Date <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonDatetime
                  value={formData.incidentDate}
                  onIonChange={(e) =>
                    handleInputChange("incidentDate", e.detail.value)
                  }
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Incident Type <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonSelect
                  value={formData.incidentType}
                  onIonChange={(e) =>
                    handleInputChange("incidentType", e.detail.value)
                  }
                  interface="action-sheet"
                >
                  {incidentTypes.map((type) => (
                    <IonSelectOption key={type} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">
                  Incident Description <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonTextarea
                  rows={6}
                  value={formData.incidentDescription}
                  onIonChange={(e) =>
                    handleInputChange("incidentDescription", e.detail.value)
                  }
                  required
                  placeholder="Please provide a detailed description of the incident including how you were contacted, what was said, any names used, and any other relevant information."
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Additional Information</IonLabel>
                <IonTextarea
                  rows={4}
                  value={formData.additionalInfo}
                  onIonChange={(e) =>
                    handleInputChange("additionalInfo", e.detail.value)
                  }
                  placeholder="Any other information you think might be helpful to investigators."
                />
              </IonItem>

              <div className="navigation-buttons">
                <IonButton fill="outline" onClick={prevStep}>
                  Back
                </IonButton>
                <IonButton onClick={nextStep}>Next</IonButton>
              </div>
            </div>
          )}
          {/* Step 5: Review and Submit */}
          {currentStep === 5 && (
            <div className="form-step">
              <h2>Review Your Complaint</h2>
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Complainant Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Filing As</IonLabel>
                      <IonLabel slot="end" className="ion-text-capitalize">
                        {formData.complainantType}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Name</IonLabel>
                      <IonLabel slot="end">
                        {formData.firstName} {formData.middleName}{" "}
                        {formData.lastName}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Email</IonLabel>
                      <IonLabel slot="end">{formData.email}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Phone</IonLabel>
                      <IonLabel slot="end">
                        {formData.phone} ({formData.phoneType})
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Preferred Contact</IonLabel>
                      <IonLabel slot="end" className="ion-text-capitalize">
                        {formData.preferredContact}
                      </IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Address Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Address</IonLabel>
                      <IonLabel slot="end">
                        {formData.address1} {formData.address2}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>City/State/ZIP</IonLabel>
                      <IonLabel slot="end">
                        {formData.city}, {formData.state} {formData.zip}
                      </IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Country</IonLabel>
                      <IonLabel slot="end">{formData.country}</IonLabel>
                    </IonItem>
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Victim Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Victim Type</IonLabel>
                      <IonLabel slot="end" className="ion-text-capitalize">
                        {formData.victimType}
                      </IonLabel>
                    </IonItem>
                    {formData.victimName && (
                      <IonItem>
                        <IonLabel>Victim Name</IonLabel>
                        <IonLabel slot="end">{formData.victimName}</IonLabel>
                      </IonItem>
                    )}
                    {formData.financialLoss && (
                      <>
                        <IonItem>
                          <IonLabel>Financial Loss</IonLabel>
                          <IonLabel slot="end">${formData.lossAmount}</IonLabel>
                        </IonItem>
                        <IonItem>
                          <IonLabel>Loss Type</IonLabel>
                          <IonLabel slot="end">{formData.lossType}</IonLabel>
                        </IonItem>
                      </>
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>Incident Information</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonList>
                    <IonItem>
                      <IonLabel>Incident Date</IonLabel>
                      <IonLabel slot="end">{formData.incidentDate}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Incident Type</IonLabel>
                      <IonLabel slot="end">{formData.incidentType}</IonLabel>
                    </IonItem>
                    <IonItem>
                      <IonLabel>Description</IonLabel>
                      <IonLabel slot="end" className="ion-text-wrap">
                        {formData.incidentDescription}
                      </IonLabel>
                    </IonItem>
                    {formData.additionalInfo && (
                      <IonItem>
                        <IonLabel>Additional Info</IonLabel>
                        <IonLabel slot="end" className="ion-text-wrap">
                          {formData.additionalInfo}
                        </IonLabel>
                      </IonItem>
                    )}
                  </IonList>
                </IonCardContent>
              </IonCard>

              <IonItem>
                <IonLabel className="ion-text-wrap">
                  By submitting this complaint, I certify that the information
                  provided is accurate to the best of my knowledge. I understand
                  that false statements are punishable under the provisions of
                  18 U.S.C. § 1001.
                  <IonNote color="danger">*</IonNote>
                </IonLabel>
                <IonCheckbox
                  slot="start"
                  checked={formData.agreement}
                  onIonChange={(e) =>
                    handleInputChange("agreement", e.detail.checked)
                  }
                />
              </IonItem>

              <div className="navigation-buttons">
                <IonButton fill="outline" onClick={prevStep}>
                  Back
                </IonButton>
                <IonButton
                  onClick={handleSubmit}
                  disabled={!formData.agreement}
                >
                  Submit Complaint
                </IonButton>
              </div>
            </div>
          )}
          <IonAlert
            isOpen={showSuccess}
            onDidDismiss={() => setShowSuccess(false)}
            header={"Complaint Submitted Successfully"}
            message={
              "Your complaint has been received. A confirmation has been sent to your email address. Your complaint ID is: IC3-XXXXXX"
            }
            buttons={["OK"]}
          />
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
          </IonFooter>{" "}
        </IonContent>
      </IonPage>
    </IonPage>
  );
};

export default FileAComplaint;
