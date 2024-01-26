export default interface IRent {
  id?: number;
  carId?: number;
  customerId?: number;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  unitPrice?: number;
  isPaid?: boolean;
  paymentMethod?: string;
  createdAt?: string;
  updatedAt?: string;
}
