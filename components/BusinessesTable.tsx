import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { GridOptions, RowNode } from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import fixtureData from '../fixtures/businesses.json';

type Props = {
  nameFilter?: string | null,
  industryFilter?: string | null,
  yearFilter?: number | null,
};

const useStyles = makeStyles(
  () => ({
    root: {
      width: '100%',
      height: '100%',
    },
  })
);

const BusinessesTable = (props: Props): ReactElement => {
  const {
    industryFilter,
    nameFilter,
    yearFilter,
  } = props;

  // Refs needed for accessing props in filters
  const industryRef = useRef(industryFilter);
  const nameRef = useRef(nameFilter);
  const yearRef = useRef(yearFilter);

  const classes = useStyles();

  const [gridApi, setGridApi] = useState<GridOptions['api']>(null);
  const [rowData] = useState(fixtureData);

  const onGridReady = (
    { api } : { api: GridOptions['api'] }
  ) => {
    setGridApi(api);
  };

  const isExternalFilterPresent = (): boolean => {
    const flag = (industryRef.current !== null && industryRef.current !== undefined)
      || (nameRef.current !== null && nameRef.current !== undefined)
      || (yearRef.current !== null && yearRef.current !== undefined);
    return flag;
  };

  const doesExternalFilterPass = (node: RowNode) => {
    const industry = industryRef.current;
    const name = nameRef.current;
    const year = yearRef.current;

    let industryPass = true;
    let namePass = true;
    let yearPass = true;

    if (industry !== null && industry !== undefined && industry !== '') {
      industryPass = node.data.industry.toLowerCase().includes(industry.toLowerCase());
    }

    if (name !== null && name !== undefined && name !== '') {
      namePass = node.data.name.toLowerCase().includes(name.toLowerCase());
    }

    if (year !== null && year !== undefined && year !== 0) {
      yearPass = node.data.year === year;
    }

    return industryPass && namePass && yearPass;
  };

  useEffect(
    () => {
      if (gridApi) {
        industryRef.current = industryFilter;
        nameRef.current = nameFilter;
        yearRef.current = yearFilter;
        gridApi.onFilterChanged();
      }
    },
    [industryFilter, nameFilter, yearFilter]
  );

  return (
    <div
      className={classNames(
        'ag-theme-alpine',
        classes.root,
      )}
    >
      <AgGridReact
        onGridReady={onGridReady}
        rowData={rowData}
        doesExternalFilterPass={doesExternalFilterPass}
        isExternalFilterPresent={isExternalFilterPresent}
      >
        <AgGridColumn
          field="year"
          resizable={true}
          sortable={true}
        />
        <AgGridColumn
          field="name"
          resizable={true}
          sortable={true}
        />
        <AgGridColumn
          field="industry"
          resizable={true}
          sortable={true}
        />
        <AgGridColumn
          field="employment"
          resizable={true}
          sortable={true}
        />
        <AgGridColumn
          field="location"
          resizable={true}
          sortable={true}
        />
      </AgGridReact>
    </div>
  );
};

export default BusinessesTable;
