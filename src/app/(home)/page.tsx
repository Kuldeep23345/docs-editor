'use client';
import { api } from '../../../convex/_generated/api';
import Navbar from './navbar';
import TemplateGallery from './template-gallery';
import { useQuery } from 'convex/react';

const page = () => {
  const documetns = useQuery(api.document.getDocuments);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {JSON.stringify(documetns)}
      </div>
    </div>
  );
};

export default page;
