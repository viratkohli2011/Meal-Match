'use client';

import { useState } from 'react';
import TemplatesModal from '@/app/components/modals/TemplatesModal';

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([
    { name: 'Vegetarian Protein Bowl', components: ['Quinoa', 'Tofu', 'Spinach', 'Chickpeas'], notes: 'Great high-protein meal.' },
    { name: 'Classic Stir Fry', components: ['Rice', 'Broccoli', 'Bell Peppers', 'Soy Sauce'], notes: 'Quick and easy.' },
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleEditClick = (template) => {
    setSelectedTemplate(template);
    setIsAdding(false);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setSelectedTemplate({ name: '', components: [], notes: '' });
    setIsAdding(true);
    setIsModalOpen(true);
  };

  const handleDeleteTemplate = (templateName) => {
    setTemplates((prev) => prev.filter(template => template.name !== templateName));
    setIsModalOpen(false);
  };

  const handleSaveTemplate = (updatedTemplate) => {
    setTemplates((prev) => {
      if (isAdding) {
        return [...prev, updatedTemplate];
      } else {
        return prev.map(template => template.name === updatedTemplate.name ? updatedTemplate : template);
      }
    });
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Meal Templates</h1>
      <div className="w-3/4 mx-auto my-6">
        <div className="bg-white shadow-md rounded-md">
          {templates.map((template) => (
            <div key={template.name} className="flex justify-between p-2 border-b last:border-none">
              <span>{template.name}</span>
              <button onClick={() => handleEditClick(template)} className="text-gray-600 font-semibold">
                &#x22EE;
              </button>
            </div>
          ))}
          {/* Add Template Button */}
          <div className="flex justify-center p-2 border-t">
            <button onClick={handleAddClick} className="text-blue-600">
              + Add Template
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <TemplatesModal 
          template={selectedTemplate} 
          onSave={handleSaveTemplate} 
          onDelete={handleDeleteTemplate} 
          onClose={() => setIsModalOpen(false)} 
          isAdding={isAdding}
        />
      )}
    </div>
  );
}
