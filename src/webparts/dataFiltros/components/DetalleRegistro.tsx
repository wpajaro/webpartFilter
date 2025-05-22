import * as React from 'react';
import { IRegistroVehiculo } from './IDataFiltrosProps';
import { useState } from 'react';
import styles from './DataFiltros.module.scss';

interface Props {
  registro: IRegistroVehiculo;
}

const DetalleRegistro: React.FC<Props> = ({ registro }) => {
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);
  return (
    <div>
      <h3>Detalle del Vehículo</h3>

      <p><strong>Placa:</strong> {registro.placa}</p>
      <p><strong>Marca:</strong> {registro.marca}</p>
      <p><strong>Propietario:</strong> {registro.propietario}</p>
      <p><strong>Hora de Entrada:</strong> {registro.hora_entrada}</p>
      <p><strong>Hora de Salida:</strong> {registro.hora_salida}</p>
      <p><strong>Duración:</strong> {registro.duracion}</p>

      <h4>Archivos adjuntos</h4>
      {registro.attachments.length > 0 ? (
        <div className={styles.galeria}>
          {registro.attachments.map((img, idx) => (
          <img
            key={idx}
            src={img.serverRelativeUrl} 
            alt={`Imagen ${idx + 1}`} 
            className={styles.imagenAdjunta}
            onClick={() => setImagenAmpliada(img.serverRelativeUrl)}
            style={{ cursor: 'pointer'}}
          />
          ))}
        </div>
        ) : (
          <p>No hay imagen disponible</p>
        )}

        {imagenAmpliada && (
          <div className= {styles.overlay} onClick={() => setImagenAmpliada(null)}>
            <img src={imagenAmpliada} alt="Ampliada" className={styles.imagenAmpliada}/>
          </div>
        )}
    </div>
  );
};

export default DetalleRegistro;
