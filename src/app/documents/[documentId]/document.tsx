import { Preloaded } from 'convex/react';
import Editor from './editor';
import Navbar from './navbar';
import { Room } from './room';
import Toolbar from './toolbar';
import { api } from '../../../../convex/_generated/api';

interface DocumentPageProps {
 preloadedDocument:Preloaded<typeof api.document.getById>
}

const Document= async ({ preloadedDocument }: DocumentPageProps) => {

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden ">
          <Navbar />
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
