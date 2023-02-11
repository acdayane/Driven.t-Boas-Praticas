import { prisma } from "@/config";

async function findBooking(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      Room: true
    }    
  });
}

async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }  
  });
}

async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId,
      roomId
    }
  });
}

async function updateBookingById(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId,
    }
  });
}

async function findRoom(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId
    },
    include: {
      Booking: true
    }
  });
}

const bookingRepository = {
  findBooking,
  findBookingById,
  createBooking,
  updateBookingById,
  findRoom
};

export default bookingRepository;
