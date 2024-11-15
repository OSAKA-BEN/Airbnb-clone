import { getCurrentUser } from "@/actions/getCurrentUser";
import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "@/components/EmptyState";
import FavoritesClient from "./FavoritesClient";

export const dynamic = "force-dynamic";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favorites = await getFavoriteListings();

  if (favorites.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return <FavoritesClient listings={favorites} currentUser={currentUser} />;
};

export default FavoritesPage;
