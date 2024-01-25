export default interface ICustomer {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: string;
  documentNumber: number;
  nationality: string;
  birthDate: string;
  address: string;
  createdAt?: string;
  updatedAt?: string;
}
