import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3 shadow-lg animate-fadeIn">
      <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
      <p className="text-red-800 font-medium flex-1">{message}</p>
      <button
        onClick={onDismiss}
        className="p-1 hover:bg-red-100 rounded-lg transition-colors"
      >
        <X className="w-5 h-5 text-red-500" />
      </button>
    </div>
  );
}
