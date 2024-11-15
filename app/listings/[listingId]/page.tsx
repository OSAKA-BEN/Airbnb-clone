import { getCurrentUser } from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import ListingClient from "./ListingClient";

export const dynamic = "force-dynamic";

interface IParams {
  listingId: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      listing={{
        ...listing,
        createdAt: listing.createdAt.toISOString(),
        user: {
          ...listing.user,
          createdAt: listing.user.createdAt.toISOString(),
          updatedAt: listing.user.updatedAt.toISOString(),
          emailVerified: listing.user.emailVerified?.toISOString() || null,
        },
      }}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
};

export default ListingPage;
