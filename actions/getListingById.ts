import prisma from "@/libs/prismadb";

export default async function getListingById(params: { listingId: string }) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: unknown) {
    throw new Error((error as Error)?.message || "An error occurred");
  }
}
