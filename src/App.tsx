import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import ModuleList from './pages/ModuleList';
import DocumentView from './pages/DocumentView';
import ComponentIndex from './pages/ComponentIndex';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/modules" element={<ModuleList />} />
          <Route path="/components" element={<ComponentIndex />} />
          <Route path="/document/:id" element={<DocumentView />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}