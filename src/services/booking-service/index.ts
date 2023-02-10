import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingRepository from "@/repositories/booking-repository";
import { notFoundError, unauthorizedErrorBooking } from "@/errors";

async function listBooking(userId: number) {
  const booking = bookingRepository.findBooking(userId);  
  if (!booking) {
    throw notFoundError();
  }

  return booking;
}

async function newBooking(userId: number, roomId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw unauthorizedErrorBooking();
  }

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw unauthorizedErrorBooking();
  }

  const room = await bookingRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity <= room.Booking.length) {
    throw unauthorizedErrorBooking();
  }

  const booking = await bookingRepository.createBooking(userId, roomId);
 
  return booking;
}

async function changeBooking(bookingId: number, roomId: number) {
  const room = await bookingRepository.findRoom(roomId);
  if (!room) {
    throw notFoundError();
  }
  if (room.capacity <= room.Booking.length) {
    throw unauthorizedErrorBooking();
  }

  const booking = await bookingRepository.updateBookingById(bookingId, roomId);

  return booking;
}

const bookingService = {
  listBooking,
  newBooking,
  changeBooking
};

export default bookingService;
