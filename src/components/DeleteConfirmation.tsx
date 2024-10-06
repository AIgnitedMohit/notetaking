import React, { useEffect } from 'react';

interface DeleteConfirmationProps {
  itemType: 'note' | 'card';
  onClose: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ itemType, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg p-4 flex items-center">
      <p className="text-gray-800 mr-4">
        {itemType === 'note' ? 'Note' : 'Card'} was deleted. You can recover it anytime from the trash.
      </p>
      <button
        onClick={onClose}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Dismiss
      </button>
    </div>
  );
};

export default DeleteConfirmation;