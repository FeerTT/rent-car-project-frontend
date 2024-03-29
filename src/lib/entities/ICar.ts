export default interface ICar {
  id?: number;
  brand: string;
  model: string;
  transmission: string;
  passengers: number;
  air_conditioning: boolean;
  color: string;
  kms: number;
  year: number;
  createdAt?: string;
  modifiedAt?: string;
}
