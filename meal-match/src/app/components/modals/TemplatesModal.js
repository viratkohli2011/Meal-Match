'use client';
import { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

export default function TemplatesModal({ template, onSave, onDelete, onClose, isAdding }) {
  const [editedTemplate, setEditedTemplate] = useState({ ...template });
  const [isEditing, setIsEditing] = useState(isAdding);

  const handleChange = (e, field) => {
    setEditedTemplate({ ...editedTemplate, [field]: e.target.value });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          {isEditing ? (
            <input
              type="text"
              value={editedTemplate.name}
              placeholder="Template Name"
              onChange={(e) => handleChange(e, 'name')}
              className="text-xl font-bold border-b-2 border-gray-300 w-full focus:outline-none focus:border-blue-500"
            />
          ) : (
            <h2 className="text-xl font-bold">{editedTemplate.name}</h2>
          )}
          <div className="flex items-center gap-3">
            {!isEditing && <Pencil className="w-5 h-5 cursor-pointer text-gray-600 hover:text-black" onClick={() => setIsEditing(true)} />}
            <X className="w-6 h-6 cursor-pointer text-gray-600 hover:text-black" onClick={onClose} />
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-grow mt-3 pr-2 max-h-[50vh] space-y-4">
          {/* Components */}
          <div>
            <h3 className="text-sm font-semibold">Components</h3>
            {isEditing ? (
              <div className="space-y-2">
                {editedTemplate.components.map((component, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={component}
                      onChange={(e) => {
                        const updatedComponents = [...editedTemplate.components];
                        updatedComponents[index] = e.target.value;
                        setEditedTemplate({ ...editedTemplate, components: updatedComponents });
                      }}
                      className="border p-1 w-full rounded-md"
                    />
                    <button onClick={() => setEditedTemplate({
                      ...editedTemplate,
                      components: editedTemplate.components.filter((_, i) => i !== index)
                    })} className="text-red-500 hover:text-red-700">
                      ✕
                    </button>
                  </div>
                ))}
                <button onClick={() => setEditedTemplate({
                  ...editedTemplate,
                  components: [...editedTemplate.components, '']
                })} className="text-blue-600 hover:underline mt-2">
                  + Add Component
                </button>
              </div>
            ) : (
              <ul className="list-disc pl-5 text-sm">
                {editedTemplate.components.map((component, index) => (
                  <li key={index}>{component}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Notes */}
          <div>
            <h3 className="text-sm font-semibold">Notes</h3>
            {isEditing ? (
              <textarea
                value={editedTemplate.notes}
                onChange={(e) => handleChange(e, 'notes')}
                className="border p-1 w-full rounded-md"
              />
            ) : (
              <p className="text-sm">{editedTemplate.notes || 'No notes added.'}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
            <button onClick={() => onDelete(editedTemplate.name)} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition flex items-center gap-1">
                <Trash2 className="w-4 h-4" /> Delete
            </button>
            {isEditing && (
                <>
                <button onClick={() => setIsEditing(false)} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition">
                    Cancel
                </button>
                <button onClick={() => { onSave(editedTemplate); setIsEditing(false); }} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition">
                    Save
                </button>
                </>
            )}
          
        </div>
      </div>
    </div>
  );
}