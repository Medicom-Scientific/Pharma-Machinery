import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/catalog/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import MachineDetail from './pages/MachineDetail';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import { QuoteProvider } from './context/QuoteContext';
import QuoteDrawer from './components/quote/QuoteDrawer';

function PageNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-light text-slate-300">404</h1>
        <h2 className="text-2xl font-medium text-slate-800 mt-4">Page Not Found</h2>
        <button
          onClick={() => window.location.href = '/'}
          className="mt-6 px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QuoteProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<MachineDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <QuoteDrawer />
      </Router>
    </QuoteProvider>
  );
}
