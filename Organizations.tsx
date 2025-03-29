import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2 } from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  description: string;
  contact: string;
  address: string;
  website: string;
  verified: boolean;
}

const Organizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase
        .from('organizations')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading organizations...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Animal Welfare Organizations</h1>
        <p className="text-gray-600">Connect with trusted organizations working for animal welfare</p>
      </div>

      <div className="space-y-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  {org.name}
                  {org.verified && (
                    <CheckCircle2 className="ml-2 h-5 w-5 text-emerald-500" />
                  )}
                </h2>
                <p className="text-gray-600 mb-4">{org.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  {org.contact && (
                    <p>📞 {org.contact}</p>
                  )}
                  {org.address && (
                    <p>📍 {org.address}</p>
                  )}
                  {org.website && (
                    <a 
                      href={org.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      🌐 Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Organizations;