import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  description: string;
  image_url: string;
  status: string;
}

const Adoption = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPets();
  }, []);

  const fetchPets = async () => {
    try {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('status', 'available')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPets(data || []);
    } catch (error) {
      console.error('Error fetching pets:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading pets...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Pet Adoption</h1>
        <p className="text-gray-600">Find your perfect companion or help a pet find their forever home</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <div key={pet.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {pet.image_url && (
              <img 
                src={pet.image_url} 
                alt={pet.name}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{pet.name}</h2>
              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Species:</span> {pet.species}
                </p>
                {pet.breed && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Breed:</span> {pet.breed}
                  </p>
                )}
                {pet.age && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Age:</span> {pet.age} years
                  </p>
                )}
              </div>
              {pet.description && (
                <p className="text-gray-600 text-sm">{pet.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adoption;