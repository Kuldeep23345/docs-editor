'use client'
import { Preloaded, usePreloadedQuery } from 'convex/react';
import Editor from './editor';
import Navbar from './navbar';
import { Room } from './room';
import Toolbar from './toolbar';
import { api } from '../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface DocumentPageProps {
 preloadedDocument:Preloaded<typeof api.document.getById>
}

const Document= ({ preloadedDocument }: DocumentPageProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  const router = useRouter();

  useEffect(() => {
    if (!document) {
      router.push('/');
    }
  }, [document, router]);

  if (!document) {
    return null;
  }

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden ">
          <Navbar data={document} />
          <Toolbar />
        </div>
        <div className="pt-28">
          <Editor />
        </div>
      </div>
    </Room>
  );
};

export default Document;
