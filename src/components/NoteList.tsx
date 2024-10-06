import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Note } from '../types';

interface NoteListProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: number) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onSelectNote, onDeleteNote }) => {
  const stripHtmlTags = (html: string) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {notes.map((note, index) => (
        <div
          key={note.id}
          className={`note-card p-4 ${index % 4 === 0 ? 'accent-yellow' : index % 4 === 1 ? 'accent-white' : ''}`}
        >
          <h3 className="font-semibold text-lg mb-2">{note.title}</h3>
          <p className="text-sm mb-2 opacity-70">
            {new Date(note.date).toLocaleDateString()}
          </p>
          <p className="mb-2 line-clamp-3">{stripHtmlTags(note.content)}</p>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {note.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-background-dark bg-opacity-20 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-end space-x-2 mt-2">
            <button
              onClick={() => onSelectNote(note)}
              className="p-1 opacity-70 hover:opacity-100 transition-opacity"
              title="Edit note"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="p-1 opacity-70 hover:opacity-100 transition-opacity"
              title="Delete note"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;