import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListings, IListingParams } from "@/actions/getListings";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ListingCard from "@/components/ListingCard";
import Loader from "@/components/Loader";
import { SafeListing } from "@/types";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = (await getListings(searchParams)) || [];
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        <Suspense fallback={<Loader />}>
          {listings.map((listing: SafeListing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </Suspense>
      </div>
    </Container>
  );
}
