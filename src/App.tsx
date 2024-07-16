import { ConfirmDialog } from 'primereact/confirmdialog';
import './App.css';
import Header from './components/Header';
import  "./index.css"

function App() {
  return (
    <main className='bg-slate-300 h-screen flex justify-center'>
      <div className='mt-40'>
        <Header />
        <ConfirmDialog />
      </div>
    </main>
  );
}

export default App;
