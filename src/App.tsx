import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import FileAComplaint from "./pages/FileAComplaint";
import ReportStatus from "./pages/ReportStatus";
import Resources from "./pages/Resources";
import Menu1 from "./components/Menu1";
import SignIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";

setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <Menu1 />
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true} render={() => <Home />} />
            <Route path="/Forum" exact={true} render={() => <Forum />} />
            <Route
              path="/Resources"
              exact={true}
              render={() => <Resources />}
            />
            <Route
              path="/Report-status"
              exact={true}
              render={() => <ReportStatus />}
            />
            <Route
              path="/File-a-complaint"
              exact={true}
              render={() => <FileAComplaint />}
            />
            <Route path="/SignIn" exact={true} render={() => <SignIn />} />
            <Route path="/SignUp" exact={true} render={() => <SingUp />} />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
