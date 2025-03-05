import React, { useState } from 'react';
import './MonumentsGallery.css';

function MonumentsGallery() {
  const [monuments, setMonuments] = useState([
    {
      id: 1,
      name: 'Eiffel Tower',
      description: 'Iconic iron lattice tower in Paris',
      city: 'Paris',
      category: 'Architectural',
      image: 'https://th.bing.com/th/id/OIP.Dfxh1aL7GUVsUVXXgVn-8wHaLG?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    {
      id: 2,
      name: 'Statue of Liberty',
      description: 'Colossal neoclassical sculpture on Liberty Island',
      city: 'New York',
      category: 'Historical',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg'
    },
    {
      id: 3,
      name: 'Grand Canyon',
      description: 'Spectacular canyon carved by the Colorado River',
      city: 'Arizona',
      category: 'Natural Wonder',
      image: 'https://th.bing.com/th?id=OIP.wftUwJqm0a7_FGZ0O2cceQHaEo&w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentMonument, setCurrentMonument] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const openAddModal = () => {
    setCurrentMonument({
      name: '',
      description: '',
      city: '',
      category: '',
      image: ''
    });
    setShowModal(true);
  };

  const openEditModal = (monument) => {
    setCurrentMonument({...monument});
    setShowModal(true);
  };

  const handleSave = () => {
    if (!currentMonument.name || !currentMonument.description) {
      alert('Please fill in all required fields');
      return;
    }

    if (currentMonument.id) {
      setMonuments(monuments.map(m => 
        m.id === currentMonument.id ? currentMonument : m
      ));
    } else {
      setMonuments([
        ...monuments, 
        {...currentMonument, id: Date.now()}
      ]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this monument?')) {
      setMonuments(monuments.filter(m => m.id !== id));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentMonument({
        ...currentMonument,
        image: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  const filteredMonuments = monuments.filter(monument => 
    (categoryFilter === 'All' || monument.category === categoryFilter) &&
    monument.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="monuments-container">
      <div className="header">
        <h1>Monument Explorer</h1>
        
        <div className="controls">
          <div className="search-wrapper">
            <input 
              type="text" 
              placeholder="Search monuments..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              <option>Architectural</option>
              <option>Historical</option>
              <option>Natural Wonder</option>
            </select>
          </div>
          
          <button 
            className="add-btn" 
            onClick={openAddModal}
          >
            + Add Monument
          </button>
        </div>
      </div>

      <div className="monuments-grid">
        {filteredMonuments.map((monument) => (
          <div key={monument.id} className="monument-card">
            <div className="monument-image">
              <img 
                src={monument.image} 
                alt={monument.name} 
                onClick={() => openEditModal(monument)}
              />
              <button 
                className="delete-btn"
                onClick={() => handleDelete(monument.id)}
              >
                ✕
              </button>
            </div>
            
            <div className="monument-info">
              <h2>{monument.name}</h2>
              <p>{monument.description}</p>
              
              <div className="monument-meta">
                <span>{monument.city}</span>
                <span className="category">{monument.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>{currentMonument.id ? 'Edit Monument' : 'Add New Monument'}</h2>
            
            <div className="modal-content">
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              
              {currentMonument.image && (
                <img 
                  src={currentMonument.image} 
                  alt="Preview" 
                  className="image-preview"
                />
              )}
              
              <input 
                type="text" 
                placeholder="Monument Name"
                value={currentMonument.name}
                onChange={(e) => setCurrentMonument({
                  ...currentMonument, 
                  name: e.target.value
                })}
              />
              
              <textarea 
                placeholder="Description"
                value={currentMonument.description}
                onChange={(e) => setCurrentMonument({
                  ...currentMonument, 
                  description: e.target.value
                })}
              />
              
              <input 
                type="text" 
                placeholder="City"
                value={currentMonument.city}
                onChange={(e) => setCurrentMonument({
                  ...currentMonument, 
                  city: e.target.value
                })}
              />
              
              <select
                value={currentMonument.category}
                onChange={(e) => setCurrentMonument({
                  ...currentMonument, 
                  category: e.target.value
                })}
              >
                <option value="">Select Category</option>
                <option>Architectural</option>
                <option>Historical</option>
                <option>Natural Wonder</option>
              </select>
              
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="save-btn"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonumentsGallery;