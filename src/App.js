import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import WheelLottery from './WheelLottery';
import NormalLottery from './NormalLottery';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className='content'>
          <Switch>
            <Route exact path="/">
              <WheelLottery />
            </Route>
            <Route exact path="/normal">
              <NormalLottery />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

/*
<header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="https://reactjs.org"
    target="_blank"
    rel="noopener noreferrer"
  >
    Learn React
  </a>
</header>
*/