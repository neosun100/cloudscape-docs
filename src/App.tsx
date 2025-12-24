import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import ModuleList from './pages/ModuleList';
import DocumentView from './pages/DocumentView';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModuleList />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}