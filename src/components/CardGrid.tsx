import React, { useState, useEffect } from 'react';
import { ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Card } from '../types';

interface CardGridProps {
  cards: Card[];
  onUpdateCard: (card: Card) => void;
  onDeleteCard: (id: number) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ cards, onUpdateCard, onDeleteCard }) => {
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const handleEdit = (card: Card) => {
    setEditingCard(card);
  };

  const handleSave = () => {
    if (editingCard) {
      onUpdateCard(editingCard);
      setEditingCard(null);
    }
  };

  const handleCancel = () => {
    setEditingCard(null);
  };

  const LinkPreview: React.FC<{ url: string }> = ({ url }) => {
    const [previewData, setPreviewData] = useState<{ title?: string; image?: string } | null>(null);

    useEffect(() => {
      const fetchPreview = async () => {
        try {
          const response = await fetch(`https://api.linkpreview.net/?key=1add24e7a049aca04c869479d4549bc0&q=${encodeURIComponent(url)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch preview');
          }
          const data = await response.json();
          setPreviewData({ title: data.title, image: data.image });
        } catch (error) {
          console.error('Error fetching link preview:', error);
          setPreviewData(null);
        }
      };

      fetchPreview();
    }, [url]);

    if (!previewData) {
      return <div>Loading preview...</div>;
    }

    return (
      <div>
        {previewData.image && (
          <img src={previewData.image} alt={previewData.title || 'Link preview'} className="w-full h-40 object-cover mb-2 rounded" />
        )}
        <p className="font-semibold">{previewData.title}</p>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.id} className="bg-white p-4 rounded-lg shadow">
          {editingCard && editingCard.id === card.id ? (
            <div>
              <input
                type="text"
                value={editingCard.title}
                onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                className="w-full mb-2 p-2 border rounded"
              />
              {editingCard.type === 'text' ? (
                <textarea
                  value={editingCard.content}
                  onChange={(e) => setEditingCard({ ...editingCard, content: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
              ) : (
                <input
                  type="url"
                  value={editingCard.content}
                  onChange={(e) => setEditingCard({ ...editingCard, content: e.target.value })}
                  className="w-full mb-2 p-2 border rounded"
                />
              )}
              <div className="flex justify-end space-x-2">
                <button onClick={handleSave} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                <button onClick={handleCancel} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="font-semibold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {new Date(card.date).toLocaleDateString()}
              </p>
              {card.type === 'text' ? (
                <p className="text-gray-700">{card.content}</p>
              ) : (
                <div>
                  <LinkPreview url={card.content} />
                  <a
                    href={card.content}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex items-center mt-2"
                  >
                    Visit Link
                    <ExternalLink size={16} className="ml-1" />
                  </a>
                </div>
              )}
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => handleEdit(card)}
                  className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                  title="Edit card"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => onDeleteCard(card.id)}
                  className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                  title="Delete card"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardGrid;