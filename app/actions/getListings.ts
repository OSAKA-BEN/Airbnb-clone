import { Listing } from "@prisma/client";
import prisma from "../libs/prismadb";

export interface IListingParams {
  userId?: string;
}

export async function getListings(params: IListingParams) {
  try {
    const { userId } = params;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing: Listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.log(error);
  }
}
