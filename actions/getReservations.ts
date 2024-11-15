import prisma from "@/libs/prismadb";
import { getCurrentUser } from "./getCurrentUser";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const { listingId, userId, authorId } = params;

    const query: {
      listingId?: string;
      userId?: string;
      listing?: { userId: string };
    } = {};

    if (listingId) query.listingId = listingId;
    if (userId) query.userId = userId;
    if (authorId) query.listing = { userId: authorId };

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error) {
    console.log(error);
    return [];
  }
}
