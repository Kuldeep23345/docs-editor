
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Document from "./document";
import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";

interface DocumentIdPageProps{
    params:Promise<{documentId:Id<"documents">}>;
}

const DocumentIdPage = async ({params}:DocumentIdPageProps) => {
    const {documentId}=await params;
    const {getToken} = await auth()
    const token = await getToken({template:"convex"}) ?? undefined

    if(!token){
      throw new Error("Unauthorized")
    }

    const preloadedDocument = await preloadQuery(
      api.document.getById,
      {id:documentId},
      {token}
      
    )
  return (
   <Document preloadedDocument={preloadedDocument}/>
  )
}

export default DocumentIdPage