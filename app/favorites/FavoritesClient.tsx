import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeUser } from "@/types";
import { Listing } from "@prisma/client";
import React from "react";
import ListingCard from "../../components/ListingCard";

interface FavoritesClientProps {
  listings: Listing[];
  currentUser: SafeUser | null;
}

const FavoritesClient: React.FC<FavoritesClientProps> = ({
  listings,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={{
              ...listing,
              createdAt: listing.createdAt.toISOString(),
            }}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
