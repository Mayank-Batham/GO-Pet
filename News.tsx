import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  location: string;
  emergency: boolean;
  created_at: string;
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Animal News</h1>
        <p className="text-gray-600">Stay updated with the latest animal news and emergencies in your area</p>
      </div>

      <div className="space-y-6">
        {news.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white rounded-lg shadow-md p-6 ${
              item.emergency ? 'border-l-4 border-red-500' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.emergency && (
                    <AlertTriangle className="inline-block text-red-500 mr-2 h-5 w-5" />
                  )}
                  {item.title}
                </h2>
                <p className="text-gray-600 mb-4">{item.content}</p>
                {item.location && (
                  <p className="text-sm text-gray-500">📍 {item.location}</p>
                )}
              </div>
              <span className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;