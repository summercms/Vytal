import Github from './Github';
import MainColumn from './MainColumn';
import './App.css';

const App = () => (
  <div className="App">
    <Github />
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
    <div className="background" />
    <MainColumn />
  </div>
);

export default App;
