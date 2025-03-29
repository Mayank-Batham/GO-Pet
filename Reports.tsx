import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { MapPin, Upload, AlertTriangle } from 'lucide-react';

interface Report {
  id: string;
  type: 'lost' | 'stray';
  pet_name?: string;
  species: string;
  description: string;
  location: string;
  last_seen: string;
  image_url?: string;
  contact: string;
  status: 'open' | 'resolved';
  created_at: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'lost',
    pet_name: '',
    species: '',
    description: '',
    location: '',
    last_seen: '',
    contact: '',
    image: null as File | null,
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let image_url = null;

      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `reports/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('pet-images')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('pet-images')
          .getPublicUrl(filePath);

        image_url = publicUrl;
      }

      const { error } = await supabase.from('reports').insert([
        {
          type: formData.type,
          pet_name: formData.pet_name || null,
          species: formData.species,
          description: formData.description,
          location: formData.location,
          last_seen: formData.last_seen,
          contact: formData.contact,
          image_url,
          status: 'open',
        },
      ]);

      if (error) throw error;

      // Reset form and refresh reports
      setFormData({
        type: 'lost',
        pet_name: '',
        species: '',
        description: '',
        location: '',
        last_seen: '',
        contact: '',
        image: null,
      });
      fetchReports();
    } catch (error) {
      console.error('Error submitting report:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading reports...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Report Lost or Stray Animals</h1>
        <p className="text-gray-600">Help us reunite lost pets with their families or rescue strays in need</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit a Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Report Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'lost' | 'stray' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
              >
                <option value="lost">Lost Pet</option>
                <option value="stray">Stray Animal</option>
              </select>
            </div>

            {formData.type === 'lost' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet's Name
                </label>
                <input
                  type="text"
                  value={formData.pet_name}
                  onChange={(e) => setFormData({ ...formData, pet_name: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species
              </label>
              <input
                type="text"
                value={formData.species}
                onChange={(e) => setFormData({ ...formData, species: e.target.value })}
                placeholder="e.g., Dog, Cat"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location Last Seen
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Last Seen
              </label>
              <input
                type="date"
                value={formData.last_seen}
                onChange={(e) => setFormData({ ...formData, last_seen: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Information
              </label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Phone number or email"
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">Recent Reports</h2>
        {reports.map((report) => (
          <div
            key={report.id}
            className={`bg-white rounded-lg shadow-md p-6 ${
              report.type === 'lost' ? 'border-l-4 border-red-500' : 'border-l-4 border-yellow-500'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <AlertTriangle className={`h-5 w-5 ${
                    report.type === 'lost' ? 'text-red-500' : 'text-yellow-500'
                  } mr-2`} />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {report.type === 'lost' ? 'Lost Pet' : 'Stray Animal'}
                    {report.pet_name && ` - ${report.pet_name}`}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{report.description}</p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Last seen at {report.location} on {new Date(report.last_seen).toLocaleDateString()}
                  </p>
                  <p>📞 Contact: {report.contact}</p>
                </div>
              </div>
              {report.image_url && (
                <img
                  src={report.image_url}
                  alt="Reported animal"
                  className="w-32 h-32 object-cover rounded-lg ml-4"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;