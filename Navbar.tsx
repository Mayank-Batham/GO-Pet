import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint as Paw } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Paw className="h-8 w-8" />
            <span className="text-xl font-bold">GO Pets</span>
          </Link>
          <div className="flex space-x-6">
            <Link to="/news" className="hover:text-emerald-200 transition-colors">News</Link>
            <Link to="/adoption" className="hover:text-emerald-200 transition-colors">Adoption</Link>
            <Link to="/organizations" className="hover:text-emerald-200 transition-colors">Organizations</Link>
            <Link to="/reports" className="hover:text-emerald-200 transition-colors">Reports</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar