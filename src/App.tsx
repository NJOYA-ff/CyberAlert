import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Page from "./pages/Page";

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
import Longin from "./pages/Longin";
import Home from "./pages/Home";
import Conversation from "./pages/Conversation";
import Speechtotext from "./pages/Speech-to-text";
import Texttotext from "./pages/Text-to-text";
import Mictomic from "./pages/Mic-to-mic";
import Favorite from "./pages/Favorite";

setupIonicReact();
const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <Route path="/" exact={true} render={() => <Longin />} />
            <Route path="/Home" exact={true} render={() => <Home />} />
            <Route
              path="/Conversation"
              exact={true}
              render={() => <Conversation />}
            />
            <Route
              path="/Speech-to-text"
              exact={true}
              render={() => <Speechtotext />}
            />
            <Route
              path="/Mic-to-mic"
              exact={true}
              render={() => <Mictomic />}
            />
            <Route
              path="/Text-to-text"
              exact={true}
              render={() => <Texttotext />}
            />
            <Route path="/Favorite" exact={true} render={() => <Favorite />} />

            {/* <Route path="/folder/:name" exact={true}>
              <Page />
            </Route> */}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
