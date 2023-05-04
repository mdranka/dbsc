import './App.css';
import Header from './components/header';
import DBForm from './components/dbform';
const form = document.querySelector('.form');

const getTables = async (event) => {
  event.preventDefault();

  const object = {
    host1: "tcc-data.postgres.database.azure.com",
    user1: "marcos",
    pass1: "JPsiqKsGTcvmW4w",
    db1: "clinica",
    host2: "tcc-data.postgres.database.azure.com",
    user2: "marcos",
    pass2: "JPsiqKsGTcvmW4w",
    db2: "consultorio"
  };
  
  const response = await fetch('http://localhost:3001/tab01', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object),
  });
  const tab01 = await response.json();
  return tab01;

}

function App() {
  return (
    <div className="App">
      <Header />

      <div className="content">
        
        <DBForm title="Database 1" className="db1"/>
        {form.addEventListener('submit', getTables())}
        <DBForm title="Database 2" className="db2" />
      </div>
    </div>
  );
}




export default App;
