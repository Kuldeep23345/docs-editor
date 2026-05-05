import Editor from './editor';
import Toolbar from './toolbar';

interface DocumetnsPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumetnsPageProps) => {
  const { documentId } = await params;
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
