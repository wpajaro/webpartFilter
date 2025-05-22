import * as React from 'react';
import { IRegistroVehiculo } from './IDataFiltrosProps';
import { Dropdown, IDropdownOption } from '@fluentui/react';
import { mergeStyleSets } from '@fluentui/react';

interface Props {
  data: IRegistroVehiculo[];
  onFiltrar: (filtros: { marca?: string }) => void;
  filtrosActivos: { marca?: string };
}

const styles = mergeStyleSets({
  dropdown: {
    marginBottom: '1rem',
    maxWidth: 300
  }
});

const Filtros: React.FC<Props> = ({ data, onFiltrar, filtrosActivos }) => {
  const opcionesMarca: IDropdownOption[] = [
    { key: '', text: '  Todas  ' },
    ...Array.from(new Set(data.map(d => d.marca))).map(marca => ({
      key: marca,
      text: marca
    }))
  ];

  return (
    <div>
      <Dropdown
        label="Marca"
        options={opcionesMarca}
        selectedKey={filtrosActivos.marca || ''}
        onChange={(_, option) => onFiltrar({ marca: option?.key as string })}
        className={styles.dropdown}
        style={{border: 'none'}}
      />
    </div>
  );
};

export default Filtros;
