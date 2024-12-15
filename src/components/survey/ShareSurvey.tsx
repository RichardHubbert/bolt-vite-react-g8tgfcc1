import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sendEmail } from '@/lib/email';
import { auth } from '@/lib/auth';
import type { Survey } from '@/types/survey';

interface ShareSurveyProps {
  survey: Survey;
  surveyId: string;
}

export function ShareSurvey({ survey, surveyId }: ShareSurveyProps) {
  const [emails, setEmails] = useState('');
  const [subject, setSubject] = useState(`Survey: ${survey.title}`);
  const [message, setMessage] = useState(
    `Hello,\n\nI'd like to invite you to participate in a survey: ${survey.title}\n\n` +
    `${survey.description}\n\n` +
    `Click the link below to take the survey:\n` +
    `${window.location.origin}/view/${surveyId}\n\n` +
    `Thank you for your participation!`
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      setSending(true);
      setError(null);
      setSuccess(false);

      const emailList = emails
        .split(',')
        .map(email => email.trim())
        .filter(Boolean);

      await sendEmail({
        to: emailList,
        subject,
        message,
        surveyId,
        senderId: auth.currentUser.uid
      });

      setSuccess(true);
      setEmails('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send survey');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Share Survey</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Recipient Emails
          </label>
          <Input
            type="text"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
            placeholder="Enter email addresses (comma-separated)"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Separate multiple email addresses with commas
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            required
          />
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {success && (
          <div className="text-green-500 text-sm">
            Survey has been sent successfully!
          </div>
        )}

        <Button
          type="submit"
          disabled={sending}
          className="w-full"
        >
          <Send className="w-4 h-4 mr-2" />
          {sending ? 'Sending...' : 'Send Survey'}
        </Button>
      </form>
    </div>
  );
}