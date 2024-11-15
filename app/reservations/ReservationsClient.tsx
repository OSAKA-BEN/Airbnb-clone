"use client";

import { useCallback, useState } from "react";

import { Listing, Reservation } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import toast from "react-hot-toast";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import ListingCard from "../../components/ListingCard";
import { SafeUser } from "../../types";

interface ReservationsClientProps {
  reservations: (Reservation & {
    listing: Listing;
  })[];
  currentUser?: SafeUser | null;
}

const RservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled successfully");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error || "An error occurred");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={{
              ...reservation.listing,
              createdAt: reservation.listing.createdAt.toISOString(),
            }}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default RservationsClient;
