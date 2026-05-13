'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullScreenLoader from '@/components/fullscreen-loader';
import { getDocument, getUser, getUsersByIds } from './actions';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);
  const fetchUsers = useMemo(
    () => async () => {
      try {
        const list = await getUser();
        setUsers(list);
      } catch (error) {
        toast.error('Failed to fetch users');
      }
    },
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endpoint = '/api/liveblocks-auth';
        const room = params.documentId as string;

        const response = await fetch(endpoint,{
          method:"POST",
          body:JSON.stringify({room})
        })
        return await response.json();
      }}
      resolveUsers={async ({ userIds }) => {
        const users = await getUsersByIds(userIds);
        return userIds.map((id) => users.find((user) => user.id === id) ?? undefined);
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()));
        }
        return filteredUsers.map((user) => user.id) as string[];
      }}
      resolveRoomsInfo={async ({roomIds})=>{
        const docs = await getDocument(roomIds as Id<"documents">[]);
        return docs.map((doc) => ({
          id: doc.id,
          name: doc.name,
        }));
      }}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Loading Doc..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
