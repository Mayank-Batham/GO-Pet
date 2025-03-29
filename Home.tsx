import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Heart, Building2, AlertTriangle } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to GO Pets</h1>
        <p className="text-lg text-gray-600">Connecting pets with loving homes and supporting animal welfare</p>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <Link to="/news" className="transform hover:scale-105 transition-transform">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Newspaper className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
            <h2 className="text-xl font-semibold mb-2">Latest News</h2>
            <p className="text-gray-600">Stay updated with animal news</p>
          </div>
        </Link>

        <Link to="/adoption" className="transform hover:scale-105 transition-transform">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
            <h2 className="text-xl font-semibold mb-2">Pet Adoption</h2>
            <p className="text-gray-600">Find your perfect companion</p>
          </div>
        </Link>

        <Link to="/organizations" className="transform hover:scale-105 transition-transform">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Building2 className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
            <h2 className="text-xl font-semibold mb-2">Organizations</h2>
            <p className="text-gray-600">Connect with animal welfare NGOs</p>
          </div>
        </Link>

        <Link to="/reports" className="transform hover:scale-105 transition-transform">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
            <h2 className="text-xl font-semibold mb-2">Reports</h2>
            <p className="text-gray-600">Report lost or stray animals</p>
          </div>
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
        <img 
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Cat portrait" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Dog portrait" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Cat close-up" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Dog close-up" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Cat playing" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
        <img 
          src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
          alt="Dog playing" 
          className="rounded-xl shadow-lg w-full h-48 object-cover"
        />
      </div>
    </div>
  );
}

export default Home;