import { TableCell, TableRow } from '@/components/ui/table';
import { Doc } from '../../../convex/_generated/dataModel';
import { SiGoogledocs } from 'react-icons/si';
import { format } from 'date-fns';
import { Building2Icon, CircleUserIcon, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import DocumentMenu from './document-menu';
import { useRouter } from 'next/navigation';

interface DocumentRowProps {
  document: Doc<'documents'>;
}

export default function DocumentRow({ document }: DocumentRowProps) {
  const router = useRouter();
  return (
    <TableRow onClick={() => router.push(`/documents/${document._id}`)} className="cursor-pointer">
      <TableCell className="w-12.5">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document?.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? 'Organization' : 'Personal'}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(document._creationTime, 'MMM dd, yyyy')}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu documentId={document._id} title={document.title} onNewTab={(id) => window.open(`/documents/${id}`, '_blank')} />
      </TableCell>
    </TableRow>
  );
}
