import AppRoutes from './routes/routes';
import Navbar from './components/Navbar/index';
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <div>
      <Navbar />
      <AppRoutes />
      <ToastContainer></ToastContainer>
    </div>
  );
}
