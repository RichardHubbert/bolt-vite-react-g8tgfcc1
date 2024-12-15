import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/auth/AuthForm';
import { Layout } from '@/components/layout/Layout';
import { SurveyList } from '@/pages/SurveyList';
import { SurveyEditor } from '@/pages/SurveyEditor';
import { SurveyView } from '@/pages/SurveyView';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <AuthForm />
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SurveyList />} />
          <Route path="create" element={<SurveyEditor />} />
          <Route path="edit/:id" element={<SurveyEditor />} />
          <Route path="view/:id" element={<SurveyView />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;