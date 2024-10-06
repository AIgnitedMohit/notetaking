import React from 'react';
import { RefreshCw, X } from 'lucide-react';
import { Note, Card } from '../types';

interface TrashBinProps {
  trashedNotes: Note[];
  trashedCards: Card[];
  onRestoreNote: (id: number) => void;
  onDeletePermanentlyNote: (id: number) => void;
  onRestoreCard: (id: number) => void;
  onDeletePermanentlyCard: (id: number) => void;
}

const TrashBin: React.FC<TrashBinProps> = ({
  trashedNotes,
  trashedCards,
  onRestoreNote,
  onDeletePermanentlyNote,
  onRestoreCard,
  onDeletePermanentlyCard
}) => {
  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Trash</h2>
      {trashedNotes.length === 0 && trashedCards.length === 0 ? (
        <p className="text-gray-600">Trash is empty</p>
      ) : (
        <>
          {trashedNotes.map((note) => (
            <div key={note.id} className="p-4 rounded-lg bg-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{note.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(note.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 line-clamp-2 mb-2">{stripHtmlTags(note.content)}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onRestoreNote(note.id)}
                    className="p-1 text-gray-500 hover:text-green-500 transition-colors"
                    title="Restore note"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button
                    onClick={() => onDeletePermanentlyNote(note.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete permanently"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {trashedCards.map((card) => (
            <div key={card.id} className="p-4 rounded-lg bg-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {new Date(card.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-700 line-clamp-2 mb-2">{card.content}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onRestoreCard(card.id)}
                    className="p-1 text-gray-500 hover:text-green-500 transition-colors"
                    title="Restore card"
                  >
                    <RefreshCw size={20} />
                  </button>
                  <button
                    onClick={() => onDeletePermanentlyCard(card.id)}
                    className="p-1 text-gray-500 hover:text-red-500 transition-colors"
                    title="Delete permanently"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TrashBin;