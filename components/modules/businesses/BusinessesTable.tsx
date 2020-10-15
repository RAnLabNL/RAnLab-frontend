import classNames from 'classnames';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from '@material-ui/core/styles';
import {
  MouseEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import {
  CellClassParams,
  CellValueChangedEvent,
  GridOptions,
  IsColumnFuncParams,
  RowNode,
  SelectionChangedEvent,
} from 'ag-grid-community';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import fixtureData from '../../../fixtures/businesses.json';

import BusinessesActionCell from './BusinessesActionCell';
import BusinessesAddCell from './BusinessesAddCell';
import BusinessesBulkRemoveSnackbar from './BusinessesBulkRemoveSnackbar';

type Props = {
  editingEnabled: boolean,
  industryFilter?: string | null,
  nameFilter?: string | null,
  saving: boolean,
  setTransactions: (transactions: UpdateTransaction) => void;
  transactions: UpdateTransaction;
  yearFilter?: number | null,
};

const useStyles = makeStyles(
  () => ({
    root: {
      width: '100%',
      height: '100%',
      '& .ag-body-viewport': {
        paddingBottom: '1.75rem',
      },
    },
    saving: {
      display: 'none',
    },
    cellAdd: {
      paddingTop: 12,
    },
    cellActionsAdd: {
      paddingTop: 5,
    },
    cellActions: {
      textAlign: 'right',
    },
  })
);

const BusinessesTable = (props: Props): ReactElement => {
  const {
    editingEnabled,
    industryFilter,
    nameFilter,
    saving,
    setTransactions,
    transactions,
    yearFilter,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation('components');

  // Grid Config

  // Clone original data so it can be accessed when creating transaction records
  const originalData = JSON.parse(JSON.stringify(fixtureData));
  const [rowData] = useState<BusinessRow[]>(fixtureData);

  const [gridApi, setGridApi] = useState<GridOptions['api']>(null);
  const [columnApi, setColumnApi] = useState<GridOptions['columnApi']>(null);

  /**
   * Initialized grid and colump APIs when ready
   */
  const onGridReady = (
    { api, columnApi } : { api: GridOptions['api'], columnApi: GridOptions['columnApi'] }
  ) => {
    setGridApi(api);
    setColumnApi(columnApi);
  };

  /**
   * Determines if a cell can be edited
   * @param params Column params
   */
  const getEditable = (params: IsColumnFuncParams) => {
    // Default to editing mode
    let editable = editingEnabled;
    // Disable editing for the add data row
    if (params.data.year === 0) {
      editable = false;
    }
    return editable;
  };

  /**
   * Determines height of a given row
   * @param params Column params
   */
  const getRowHeight = (params: IsColumnFuncParams) => {
    // Make the add row taller than default
    if (params.data.year === 0) {
      return 55;
    }
  };

  /**
   * Determines custom class name for a given cell
   * @param params Cell params
   */
  const getCellClass = (params: CellClassParams) => {
    let cellClass = '';
    // Add row that isn't the action cell
    if (params.data.year === 0 && params.colDef.field !== 'actions') {
      cellClass = classes.cellAdd;
    }
    // Add row action cell
    if (params.data.year === 0 && params.colDef.field === 'actions') {
      cellClass = classes.cellActionsAdd;
    }
    // Standard row action cell
    if (params.data.year !== 0 && params.colDef.field === 'actions') {
      cellClass = classes.cellActions;
    }
    return cellClass;
  };

  // Filtering

  // TODO this needs to be fed in from API
  const editYearParams = {
    values: [2019, 2020],
  };

  // TODO this needs to be fed in from API
  const editIndustryParams = {
    values: [
      'Air transportation',
      'Building material and garden equipment and supplies dealers',
      'Construction',
    ],
  };

  // Refs needed for accessing props in filters
  const industryRef = useRef(industryFilter);
  const nameRef = useRef(nameFilter);
  const yearRef = useRef(yearFilter);

  /**
   * Determines if a filter has been applied to the table
   */
  const isExternalFilterPresent = (): boolean => {
    const flag = (industryRef.current !== null && industryRef.current !== undefined)
      || (nameRef.current !== null && nameRef.current !== undefined)
      || (yearRef.current !== null && yearRef.current !== undefined);
    return flag;
  };

  /**
   * Checks if a given row passes the current filters
   * @param node Row
   */
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

  /**
   * Update filter refs on prop change
   */
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

  // Transaction records

  /**
   * Generates a new transaction record based on a row to be added
   * @param row Row to be added
   * @returns New transaction record
   */
  const addTransaction = (row: BusinessRow): UpdateTransaction => {
    const add = transactions.add;
    add.push(row);

    return {
      add,
      remove: transactions.remove,
      update: transactions.update,
    };
  };

  /**
   * Generates a new transaction record based on a row to be removed
   * @param row Row to be removed
   * @returns New transaction record
   */
  const removeTransaction = (row: BusinessRow): UpdateTransaction => {
    const remove = transactions.remove;

    // Checks if row was updated, and removes row from update record
    const update = transactions.update;
    const updateMatchedRow = transactions.update.filter(
      transRow => transRow.id === row.id
    );
    if (updateMatchedRow.length) {
      const matchedIndex = transactions.update.indexOf(updateMatchedRow[0]);
      update.splice(matchedIndex, 1);
    }

    // Checks if row was added, and removes row from add record
    const add = transactions.add;
    const addMatchedRow = transactions.add.filter(
      transRow => transRow.id === row.id
    );
    if (addMatchedRow.length) {
      const matchedIndex = transactions.add.indexOf(addMatchedRow[0]);
      add.splice(matchedIndex, 1);
    }

    // Adds row to remove record if it isn't a fresh add
    if (!addMatchedRow.length) {
      // We want to push the original row to the remove array
      const originalRow = originalData.filter(
        (origRow: BusinessRow) => origRow.id === row.id
      );
      remove.push(originalRow[0]);
    }

    return {
      add,
      remove,
      update,
    };
  };

  /**
   * Generates a new transaction record based on a row to be updated
   * @param row Row to be updated
   * @returns New transaction record
   */
  const updateTransaction = (row: BusinessRow): UpdateTransaction => {
    const matchedRow = transactions.update.filter(
      transRow => transRow.id === row.id
    );
    const update = transactions.update;

    // No current record of this row being updated
    if (!matchedRow.length) {
      update.push(row);
    }
    // Row has already been updated
    else {
      const matchedIndex = transactions.update.indexOf(matchedRow[0]);
      update[matchedIndex] = row;
    }

    return {
      add: transactions.add,
      remove: transactions.remove,
      update,
    };
  };

  /**
   * Updates transaction record on cell changed
   * @param e Cell changed event
   */
  const handleCellValueChanged = (e: CellValueChangedEvent) => {
    const newTransactions = updateTransaction(e.data);
    setTransactions(newTransactions);
  };

  // Editing

  const defaultAddRow = {
    year: 0,
    name: 'add',
    industry: 'add',
    employment: 0,
    location: 'add',
  };
  const pinnedAddData = [defaultAddRow];
  const [removeSnackbarOpen, setRemoveSnackbarOpen] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<RowNode[]>([]);

  const [alertInfo, setAlertInfo] = useState<AlertInfo>({});
  const [alertSnackbarOpen, setAlertSnackbarOpen] = useState<boolean>(false);

  const handleAlertSnackbarClose = () => {
    setAlertSnackbarOpen(false);
  };

  /**
   * Toggle bulk remove snackbar on row selection
   * @param event Selection event
   */
  const onSelectionChanged = (event: SelectionChangedEvent) => {
    const newSelection = event.api.getSelectedNodes();
    setSelectedRows(newSelection);
    setRemoveSnackbarOpen(newSelection.length !== 0);
  };

  /**
   * Bulk removes selected rows
   */
  const handleBulkRowRemove = () => {
    if (gridApi) {
      const rowData: BusinessRow[] = [];
      selectedRows.forEach(row => {
        rowData.push(row.data);
      });
      const gridResponse = gridApi.applyTransaction({
        remove: rowData,
      });

      setAlertInfo({
        message: t('businesses-table-remove-success', { count: rowData.length }),
        severity: 'success',
      });
      setAlertSnackbarOpen(true);

      // Update transaction record
      gridResponse.remove.forEach(row => {
        const newTransactions = removeTransaction(row.data);
        setTransactions(newTransactions);
      });
    }
  };

  /**
   * Removes a single row
   * @param row Given row
   * @param e Click event
   */
  const handleSingleRowRemove = (row: BusinessRow, e: MouseEvent) => {
    e.preventDefault();
    if (gridApi) {
      const gridResponse = gridApi.applyTransaction({
        remove: [row],
      });
      setAlertInfo({
        message: t('businesses-table-remove-success', { count: 1 }),
        severity: 'success',
      });
      setAlertSnackbarOpen(true);

      const newTransactions = removeTransaction(gridResponse.remove[0].data);
      setTransactions(newTransactions);
    }
  };

  // Default values for adding a cell
  const defaultValues: BusinessRow = {
    id: -1,
    year: 2020,
    name: '',
    industry: '',
    employment: 0,
    location: '',
  };
  const addValuesRef = useRef(defaultValues);

  /**
   * Updates values to be added on inner component change
   * @param field Field to be updates
   * @param newValue New value
   */
  const updateAddValues = (field: string, newValue: string | number) => {
    addValuesRef.current = {
      ...addValuesRef.current,
      [field]: newValue,
    };
  };

  /**
   * Resets the add data row by simply redrawing
   */
  const resetPinnedRow = () => {
    if (gridApi) {
      const pinnedRow = gridApi.getPinnedTopRow(0);
      gridApi.redrawRows({ rowNodes: [pinnedRow] });
    }
  };

  /**
   * Adds the current values to the table
   */
  const handleRowAdd = () => {
    if (gridApi) {
      const gridResponse = gridApi.applyTransaction({
        add: [addValuesRef.current],
      });

      // Update ID for next addition and reset values
      const addId = addValuesRef.current.id;
      addValuesRef.current = {
        ...defaultValues,
        id: addId - 1,
      };
      resetPinnedRow();

      // Alert user of addition
      setAlertInfo({
        message: t('businesses-table-add-success'),
        severity: 'success',
      });
      setAlertSnackbarOpen(true);

      // Update transaction record
      const newTransactions = addTransaction(gridResponse.add[0].data);
      setTransactions(newTransactions);
    }
  };

  /**
   * Custom row render for add data row
   * @param params 
   */
  // AG Grid cell renderer has explicit type any as params type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addRowRenderer = (params: any) => {
    let renderedValue = params.value;

    if (params.data.year === 0) {
      const label = params.columnApi.getDisplayNameForColumn(params.column, null);
      const field: string = params.column.colId;
      renderedValue = (
        <BusinessesAddCell
          defaultValue={addValuesRef.current[field]}
          field={field}
          handleChange={updateAddValues}
          label={label}
        />
      );
    }

    return renderedValue;
  };

  /**
   * Custom cell renderer for action cell
   * @param params 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionsCellRenderer = (params: any) => {
    const type = params.data.year === 0 ? 'add' : 'default';
    return (
      <BusinessesActionCell
        handleAddClick={handleRowAdd}
        handleRemoveClick={(e) => handleSingleRowRemove(params.data, e)}
        type={type}
      />
    );
  };

  /**
   * Ensures checkbox selection column is always in first position
   */
  useEffect(
    () => {
      if (columnApi && editingEnabled) {
        columnApi.moveColumn('select', 0);
      }
      if (gridApi && !editingEnabled) {
        gridApi.setRowData(originalData);
      }
    },
    [editingEnabled]
  );

  return (
    <>
      <div
        className={classNames(
          'ag-theme-alpine',
          classes.root,
          {
            [classes.saving]: saving,
          }
        )}
      >
        <AgGridReact
          onCellValueChanged={handleCellValueChanged}
          gridOptions={{
            editType: 'fullRow',
            getRowHeight: getRowHeight,
            onSelectionChanged,
            rowSelection: 'multiple',
            suppressRowClickSelection: true,
          }}
          onGridReady={onGridReady}
          pinnedTopRowData={editingEnabled ? pinnedAddData : []}
          rowData={rowData}
          doesExternalFilterPass={doesExternalFilterPass}
          isExternalFilterPresent={isExternalFilterPresent}
        >
          <AgGridColumn
            checkboxSelection={true}
            field="select"
            headerCheckboxSelection={true}
            headerCheckboxSelectionFilteredOnly={true}
            headerName=""
            hide={!editingEnabled}
            width={50}
          />
          <AgGridColumn
            field="id"
            hide
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellEditor="agSelectCellEditor"
            cellEditorParams={editYearParams}
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="year"
            resizable={true}
            sortable={true}
            width={editingEnabled ? 110 : 80}
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="name"
            resizable={true}
            sortable={true}
            width={300}
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellEditor="agSelectCellEditor"
            cellEditorParams={editIndustryParams}
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="industry"
            resizable={true}
            sortable={true}
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="employment"
            resizable={true}
            sortable={true}
            width={editingEnabled ? 150 : 100}
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="location"
            resizable={true}
            sortable={true}
            width={250}
          />
          <AgGridColumn
            cellClass={getCellClass}
            cellRendererFramework={actionsCellRenderer}
            field="actions"
            headerName="Actions"
            hide={!editingEnabled}
            width={100}
          />
        </AgGridReact>
      </div>
      <BusinessesBulkRemoveSnackbar
        onRemove={handleBulkRowRemove}
        open={removeSnackbarOpen}
        rowCount={selectedRows.length}
      />
      <Snackbar
        autoHideDuration={3000}
        open={alertSnackbarOpen}
        onClose={handleAlertSnackbarClose}
      >
        <Alert
          onClose={handleAlertSnackbarClose}
          severity={alertInfo.severity}
          variant="filled"
        >
          {alertInfo.message}
        </Alert>
      </Snackbar>
    </>
  );
};

interface AlertInfo {
  message?: string;
  severity?: 'error' | 'info' | 'success' | 'warning';
}

// Needed to dynamically key in a BusinessRow
interface BusinessField {
  [key: string]: string | number;
}

export interface BusinessRow extends BusinessField {
  id: number;
  year: number;
  name: string;
  industry: string;
  employment: number;
  location: string;
}

export interface UpdateTransaction {
  add: BusinessRow[];
  remove: BusinessRow[];
  update: BusinessRow[];
}

export default BusinessesTable;
