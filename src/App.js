import logo from './logo.svg';
import './App.css';
import TaskWizard from './components/TaskWizard';

function App() {
  fetch('https://fierce-peak-35449.herokuapp.com');

  return (
    <div className="App">
      <TaskWizard />
      
    </div>
  );
}

export default App;
