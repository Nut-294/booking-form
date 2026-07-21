export const calNights = (checkIn: Date, checkOut: Date): number => {
  return (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
};

export const calTotal = (
  price: number,
  checkIn: Date,
  checkOut: Date,
): { total: number; totalNights: number } => {
  const totalNights = calNights(checkIn, checkOut);
  return {
    total: totalNights * price,
    totalNights,
  };
};
