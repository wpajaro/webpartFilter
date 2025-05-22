export interface IRegistroVehiculo {
  ID: number;
  placa: string;
  marca: string;
  propietario: string;
  hora_entrada: string;
  hora_salida: string;
  duracion: string;
  attachments: { fileName: string; serverRelativeUrl: string }[];
}