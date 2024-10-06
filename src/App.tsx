import React, { useState } from 'react';
import { PlusCircle, Search, Trash2, Home, Layers } from 'lucide-react';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import CardCreator from './components/CardCreator';
import CardGrid from './components/CardGrid';
import TrashBin from './components/TrashBin';
import DeleteConfirmation from './components/DeleteConfirmation';
import { Note, Card } from './types';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [trashedNotes, setTrashedNotes] = useState<Note[]>([]);
  const [trashedCards, setTrashedCards] = useState<Card[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTrash, setShowTrash] = useState(false);
  const [currentView, setCurrentView] = useState<'collections' | 'createCard' | 'createNote'>('collections');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deletedItemType, setDeletedItemType] = useState<'note' | 'card' | null>(null);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
    setSelectedNote(null);
  };

  const deleteNote = (id: number) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      setNotes(notes.filter(note => note.id !== id));
      setTrashedNotes([...trashedNotes, noteToDelete]);
      setShowDeleteConfirmation(true);
      setDeletedItemType('note');
    }
  };

  const restoreNote = (id: number) => {
    const noteToRestore = trashedNotes.find(note => note.id === id);
    if (noteToRestore) {
      setTrashedNotes(trashedNotes.filter(note => note.id !== id));
      setNotes([...notes, noteToRestore]);
    }
  };

  const permanentlyDeleteNote = (id: number) => {
    setTrashedNotes(trashedNotes.filter(note => note.id !== id));
  };

  const addCard = (card: Card) => {
    setCards([...cards, card]);
    setCurrentView('collections');
  };

  const updateCard = (updatedCard: Card) => {
    setCards(cards.map(card => card.id === updatedCard.id ? updatedCard : card));
  };

  const deleteCard = (id: number) => {
    const cardToDelete = cards.find(card => card.id === id);
    if (cardToDelete) {
      setCards(cards.filter(card => card.id !== id));
      setTrashedCards([...trashedCards, cardToDelete]);
      setShowDeleteConfirmation(true);
      setDeletedItemType('card');
    }
  };

  const restoreCard = (id: number) => {
    const cardToRestore = trashedCards.find(card => card.id === id);
    if (cardToRestore) {
      setTrashedCards(trashedCards.filter(card => card.id !== id));
      setCards([...cards, cardToRestore]);
    }
  };

  const permanentlyDeleteCard = (id: number) => {
    setTrashedCards(trashedCards.filter(card => card.id !== id));
  };

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now(),
      title: 'New Note',
      content: '',
      date: new Date().toISOString(),
      tags: [],
    };
    addNote(newNote);
    setSelectedNote(newNote);
    setCurrentView('createNote');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow p-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Good Morning, Dimitar!</h1>
        </div>
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 bg-white rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="mb-4 flex items-center">
          <Layers size={24} className="mr-2 text-blue-500" />
          <h2 className="text-xl font-semibold">Collections</h2>
        </div>
        <div className="bg-white rounded-lg shadow p-6 overflow-y-auto">
          {showTrash ? (
            <TrashBin
              trashedNotes={trashedNotes}
              trashedCards={trashedCards}
              onRestoreNote={restoreNote}
              onDeletePermanentlyNote={permanentlyDeleteNote}
              onRestoreCard={restoreCard}
              onDeletePermanentlyCard={permanentlyDeleteCard}
            />
          ) : currentView === 'collections' ? (
            <>
              {notes.length === 0 && cards.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xl text-gray-600 mb-4">Your collection is empty</p>
                  <button
                    onClick={() => setCurrentView('createCard')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Create your first card
                  </button>
                </div>
              ) : (
                <>
                  <NoteList
                    notes={notes}
                    onSelectNote={setSelectedNote}
                    onDeleteNote={deleteNote}
                  />
                  <CardGrid cards={cards} onUpdateCard={updateCard} onDeleteCard={deleteCard} />
                </>
              )}
            </>
          ) : currentView === 'createCard' ? (
            <CardCreator onAddCard={addCard} />
          ) : (selectedNote || currentView === 'createNote') ? (
            <NoteEditor note={selectedNote!} onUpdateNote={updateNote} />
          ) : null}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center p-4 bg-white shadow-lg">
        <button onClick={() => setCurrentView('collections')} className="p-2 text-gray-600 hover:text-blue-500">
          <Home size={24} />
        </button>
        <button onClick={() => setCurrentView('createCard')} className="p-2 bg-blue-500 rounded-full text-white">
          <PlusCircle size={24} />
        </button>
        <button onClick={() => setShowTrash(!showTrash)} className="p-2 text-gray-600 hover:text-blue-500">
          <Trash2 size={24} />
        </button>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmation
          itemType={deletedItemType!}
          onClose={() => setShowDeleteConfirmation(false)}
        />
      )}
    </div>
  );
}

export default App;