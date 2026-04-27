import Editor from './editor';

interface DocumetnsPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumetnsPageProps) => {
  const { documentId } = await params;
  return (
    <div>
   
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
