import * as React from 'react';
import { useEffect, useState } from 'react';
import { getSP } from '../../pnpjsConfig';
import Filtros from './Filtros';
import DetalleRegistro from './DetalleRegistro';
import { IRegistroVehiculo } from './IDataFiltrosProps';

import styles from './DataFiltros.module.scss';

const DataFiltros: React.FC = () => {
  const [registros, setRegistros] = useState<IRegistroVehiculo[]>([]);
  const [filtros, setFiltros] = useState<{ marca?: string }>({});
  const [registroSeleccionado, setRegistroSeleccionado] = useState<IRegistroVehiculo | null>(null);

  const cargarDatos = async (): Promise<void> => {
    try {
      const sp = getSP();

      const items = await sp.web.lists.getByTitle("tabla_v_prueba").items
        .select("ID", "placa", "marca", "propietario", "hora_entrada", "hora_salida", "duracion")
        .top(100)();

      const registrosConAdjuntos = await Promise.all(
        items.map(async (item) => {
          const attachments = await sp.web.lists
            .getByTitle("tabla_v_prueba")
            .items.getById(item.ID)
            .attachmentFiles();

          return {
            ...item,
            attachments: attachments.map((file) => ({
              fileName: file.FileName,
              serverRelativeUrl: file.ServerRelativeUrl,
            })),
          };
        })
      );

      setRegistros(registrosConAdjuntos);
    } catch (error) {
      console.error("Error al cargar los registros:", error);
    }
  };

  useEffect(() => {
    void cargarDatos();
  }, []);

  const registrosFiltrados = registros.filter(r =>
    !filtros.marca || r.marca === filtros.marca
  );

  return (
    <div className={styles.panelContainer}>
      <div className={styles.filtros}>
        <h3>Filtros</h3>
        <Filtros data={registros} filtrosActivos={filtros} onFiltrar={setFiltros} />
        <div>
          {registrosFiltrados.map(item => (
            <div
              key={item.ID}
              className={styles.card}
              onClick={() => setRegistroSeleccionado(item)}
            >
              <h4>{item.placa}</h4>
              <p>Marca: {item.marca}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.detalle}>
        {registroSeleccionado ? (
          <DetalleRegistro registro={registroSeleccionado} />
        ) : (
          <p>Selecciona un registro para ver el detalle.</p>
        )}
      </div>
    </div>
  );
};

export default DataFiltros;
