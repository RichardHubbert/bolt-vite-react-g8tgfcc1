import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSurvey, getSurveyResponses, submitSurveyResponse } from '@/lib/survey';
import { SurveyResponse } from '@/components/survey/SurveyResponse';
import type { Survey, SurveyResponse as SurveyResponseType } from '@/types/survey';

export function SurveyView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [previousResponses, setPreviousResponses] = useState<SurveyResponseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadSurveyAndResponses(id);
    }
  }, [id]);

  async function loadSurveyAndResponses(surveyId: string) {
    try {
      const [surveyData, responsesData] = await Promise.all([
        getSurvey(surveyId),
        getSurveyResponses(surveyId)
      ]);
      
      if (!surveyData) {
        throw new Error('Survey not found');
      }

      setSurvey(surveyData);
      
      if (responsesData.length > 0) {
        const latestResponse = responsesData[responsesData.length - 1];
        setResponses(latestResponse.responses);
      }
      
      setPreviousResponses(responsesData);
    } catch (error) {
      console.error('Error loading survey:', error);
      setError(error instanceof Error ? error.message : 'Failed to load survey');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!survey || !id) return;

    const missingRequired = survey.questions.find(q => 
      q.required && !responses[q.id]
    );

    if (missingRequired) {
      setError('Please answer all required questions');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await submitSurveyResponse(id, responses);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit survey');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading survey...</div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-gray-900 mb-2">Survey not found</h2>
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Surveys
        </Button>
      </div>
    );
  }

  const hasSubmittedBefore = previousResponses.length > 0;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Surveys
          </Button>
          <h1 className="text-2xl font-bold">{survey.title}</h1>
          <p className="text-gray-500 mt-1">{survey.description}</p>
          {hasSubmittedBefore && (
            <p className="text-blue-500 mt-2">
              You have previously submitted this survey. Your last responses are shown below.
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <SurveyResponse
          survey={survey}
          responses={responses}
          onChange={(questionId, value) => {
            setResponses(prev => ({
              ...prev,
              [questionId]: value
            }));
          }}
        />

        {error && (
          <div className="text-red-500 text-sm mt-4">{error}</div>
        )}

        <div className="mt-8 flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : (hasSubmittedBefore ? 'Update Response' : 'Submit Survey')}
          </Button>
        </div>
      </div>
    </div>
  );
}