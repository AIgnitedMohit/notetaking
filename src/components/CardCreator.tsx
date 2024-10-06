import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Card } from '../types';

interface CardCreatorProps {
  onAddCard: (card: Card) => void;
}

const CardCreator: React.FC<CardCreatorProps> = ({ onAddCard }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'text' | 'link'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (title && content) {
      setIsLoading(true);
      setError(null);
      let imageUrl = undefined;

      if (type === 'link') {
        try {
          // Instead of fetching the content directly, we'll just use the link as is
          // and let the CardGrid component handle displaying a preview
          imageUrl = content;
        } catch (error) {
          console.error('Error processing link:', error);
          setError('Failed to process the link. Please check the URL and try again.');
          setIsLoading(false);
          return;
        }
      }

      const newCard: Card = {
        id: Date.now(),
        title,
        content,
        date: new Date().toISOString(),
        type,
        imageUrl,
      };

      onAddCard(newCard);
      setTitle('');
      setContent('');
      setType('text');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">Create New Card</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded focus:outline-none focus:border-blue-500"
        placeholder="Card Title"
      />
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="text"
            checked={type === 'text'}
            onChange={() => setType('text')}
            className="mr-2"
          />
          Text
        </label>
        <label>
          <input
            type="radio"
            value="link"
            checked={type === 'link'}
            onChange={() => setType('link')}
            className="mr-2"
          />
          Link
        </label>
      </div>
      {type === 'text' ? (
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow mb-4 p-2 border rounded focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Card content..."
        />
      ) : (
        <input
          type="url"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 p-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Enter URL"
        />
      )}
      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors flex items-center justify-center ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <Save size={20} className="mr-2" />
        {isLoading ? 'Saving...' : 'Save Card'}
      </button>
    </div>
  );
};

export default CardCreator;