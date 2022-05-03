
import * as ReactDOMClient from 'react-dom/client';
import WeatherApp from "./WeatherApp";
import * as serviceWorker from './serviceWorkerRegistration.js';
import "./styles.css";
function App() {
  return <WeatherApp />;
}
const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(<App/>);
serviceWorker.register()