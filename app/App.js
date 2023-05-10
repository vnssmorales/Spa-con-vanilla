import api from './helpers/wp_ap.js';
import { ajax } from './helpers/ajax.js';
import { Title } from './components/Title.js';

export function App() {
  const d = document,
  $root = d.getElementById("root");
  $root.appendChild(Title());
}
