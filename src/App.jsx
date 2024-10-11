import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListVehicle from './components/ListVehicle';
import SearchForm from './components/SearchForm'; 
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchForm />} />
        <Route path="/search" element={<ListVehicle />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
