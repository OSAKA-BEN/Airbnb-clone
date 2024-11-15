import { getCurrentUser } from "@/actions/getCurrentUser";
import { getListings } from "@/actions/getListings";
import EmptyState from "@/components/EmptyState";
import PropertiesClient from "./PropertiesClient";

export const dynamic = "force-dynamic";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = (await getListings({ userId: currentUser?.id })) || [];

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Properties found"
        subtitle="Looks like you haven't reserved any properties."
      />
    );
  }

  return <PropertiesClient listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
