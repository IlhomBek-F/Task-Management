import { ConfirmDialog } from 'primereact/confirmdialog';
import Header from './components/Header';
import  "./styles/index.css"

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
