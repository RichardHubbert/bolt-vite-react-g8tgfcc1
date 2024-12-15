import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { QuestionList } from '@/components/survey/QuestionList';
import { SurveyPreview } from '@/components/survey/SurveyPreview';
import { ShareSurvey } from '@/components/survey/ShareSurvey';
import { ActionBar } from '@/components/survey/ActionBar';
import { useSurveyState } from '@/hooks/useSurveyState';
import { getSurvey } from '@/lib/survey';

export function SurveyEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const {
    survey,
    showPreview,
    isSaving,
    setShowPreview,
    addQuestion,
    deleteQuestion,
    updateQuestion,
    updateSurveyMeta,
    saveSurvey,
    resetSurvey,
  } = useSurveyState(id);

  useEffect(() => {
    if (id) {
      loadSurvey(id);
    }
  }, [id]);

  async function loadSurvey(surveyId: string) {
    try {
      const data = await getSurvey(surveyId);
      if (data) {
        updateSurveyMeta(data);
      }
    } catch (error) {
      console.error('Error loading survey:', error);
      navigate('/');
    }
  }

  return (
    <div className="pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Surveys
          </Button>
          <div>
            <Input
              value={survey.title}
              onChange={(e) => updateSurveyMeta({ title: e.target.value })}
              className="text-2xl font-bold border-none px-0 mb-2"
              placeholder="Survey Title"
            />
            <Input
              value={survey.description}
              onChange={(e) => updateSurveyMeta({ description: e.target.value })}
              className="text-gray-500 border-none px-0"
              placeholder="Survey Description"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          {id && (
            <Button
              variant="outline"
              onClick={() => setShowShare(!showShare)}
            >
              {showShare ? 'Hide Share' : 'Share Survey'}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {showPreview ? 'Edit Survey' : 'Preview'}
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {showShare && id ? (
          <ShareSurvey survey={survey} surveyId={id} />
        ) : showPreview ? (
          <SurveyPreview survey={survey} />
        ) : (
          <QuestionList
            questions={survey.questions}
            onAddQuestion={addQuestion}
            onDeleteQuestion={deleteQuestion}
            onUpdateQuestion={updateQuestion}
          />
        )}
      </div>

      <ActionBar
        onSave={saveSurvey}
        onCancel={resetSurvey}
        isSaving={isSaving}
      />
    </div>
  );
}