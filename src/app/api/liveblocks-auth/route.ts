import { auth, currentUser } from '@clerk/nextjs/server';
import { Liveblocks } from '@liveblocks/node';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  try {
    const { userId, orgId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { room } = await request.json();

    const name =
      user.fullName ??
      (`${user.firstName} ${user.lastName}`.trim() ||
        user.emailAddresses[0]?.emailAddress ||
        'Anonymous');

       
        const nameToNumber = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
        const hue = Math.abs(nameToNumber) % 360
        const color =`hsl(${hue}, 80%, 60%)`

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name,
        avatar: user.imageUrl,
        color,

      },
    });

    if (room) {
      // Room-specific auth: verify document access
      const document = await convex.query(api.document.getById, { id: room }).catch((err) => {
        console.error('Convex query error:', err);
        return null;
      });

      if (!document) {
        return new Response(JSON.stringify({ error: 'Document not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      const isOwner = document.ownerId === userId;
      const isOrganizationMember = !!(document.organizationId && document.organizationId === orgId);

      if (!isOwner && !isOrganizationMember) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      session.allow(room, session.FULL_ACCESS);
    } else {
      // Provider-level auth (e.g. inbox notifications) — allow all rooms
      session.allow('*', session.FULL_ACCESS);
    }

    const { body, status } = await session.authorize();

    return new Response(body, {
      status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Liveblocks Auth Error:', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
