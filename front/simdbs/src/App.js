import './App.css';
import Header from './components/header';
import DBForm from './components/dbform';

function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <DBForm title="Database 1" className="db1"/>
        <DBForm title="Database 2" className="db2" />
      </main>
    </div>
  );
}

export default App;
