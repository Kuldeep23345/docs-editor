'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';
import FullScreenLoader from '@/components/fullscreen-loader';
import { getUser, getUsersByIds } from './actions';
import { toast } from 'sonner';

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
      authEndpoint="/api/liveblocks-auth"
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
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Loading Doc..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
