import React, { useState, useEffect } from 'react';
import { Save, Tag } from 'lucide-react';
import { Note } from '../types';

interface NoteEditorProps {
  note: Note;
  onUpdateNote: (note: Note) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onUpdateNote }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [tags, setTags] = useState<string[]>(note.tags || []);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setTags(note.tags || []);
  }, [note]);

  const handleSave = () => {
    onUpdateNote({
      ...note,
      title,
      content,
      tags,
      date: new Date().toISOString(),
    });
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="h-full flex flex-col">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-2xl font-semibold mb-4 p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Note Title"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow mb-4 p-2 border rounded focus:outline-none focus:border-blue-500 resize-none"
        placeholder="Write your note here..."
      />
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Tag size={20} className="mr-2 text-gray-500" />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-grow p-2 border rounded focus:outline-none focus:border-blue-500"
            placeholder="Add a tag (optional)"
          />
          <button
            onClick={handleAddTag}
            className="ml-2 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="ml-1 text-blue-800 hover:text-blue-900"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={handleSave}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
      >
        <Save size={20} className="mr-2" />
        Save
      </button>
    </div>
  );
};

export default NoteEditor;