'use client';

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';

import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
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
  color: string;
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

  const resolveUsers = useCallback(async ({ userIds }: { userIds: string[] }) => {
    const users = await getUsersByIds(userIds);
    return userIds.map((id) => users.find((user) => user.id === id) ?? undefined);
  }, []);

  const resolveRoomsInfo = useCallback(async ({ roomIds }: { roomIds: string[] }) => {
    const docs = await getDocument(roomIds as Id<'documents'>[]);
    return docs.map((doc) => ({
      id: doc.id,
    }));
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={resolveUsers}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filteredUsers.map((user) => user.id) as string[];
      }}
      resolveRoomsInfo={resolveRoomsInfo}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}
      >
        {children}
      </RoomProvider>
    </LiveblocksProvider>
  );
}
