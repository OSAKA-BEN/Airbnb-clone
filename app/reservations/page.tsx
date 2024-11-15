import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import ReservationsClient from "./ReservationsClient";

export const dynamic = "force-dynamic";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations({ authorId: currentUser?.id });

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );
  }

  return (
    <Container>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </Container>
  );
};

export default ReservationsPage;
