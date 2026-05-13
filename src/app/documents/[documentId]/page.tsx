
import { Id } from "../../../../convex/_generated/dataModel";
import Document from "./document";

interface DocumentIdPageProps{
    params:Promise<{documentId:Id<"documents">}>;
}

const DocumentIdPage = async ({params}:DocumentIdPageProps) => {
    const {documentId}=await params;
    
  return (
   <Document id={documentId}/>
  )
}

export default DocumentIdPage