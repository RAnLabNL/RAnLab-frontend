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

import { Business } from '../../../store/types/business';
import { fade } from '../../../styles/helpers/color';

import BusinessesActionCell from './BusinessesActionCell';
import BusinessesAddCell from './BusinessesAddCell';
import BusinessesBulkRemoveSnackbar from './BusinessesBulkRemoveSnackbar';
import { BusinessEditTransactions, EditTransactionStatus } from '../../../store/types/businessEdit';

type Props = {
  businesses: Business[],
  editingEnabled: boolean,
  industryFilter?: string | null,
  nameFilter?: string | null,
  saving: boolean,
  setTransactions: (transactions: BusinessEditTransactions) => void;
  transactions: BusinessEditTransactions;
  yearFilter?: number | null,
};

const useStyles = makeStyles(
  (theme) => ({
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
    'cellAmendmentDeleted': {
      opacity: 0.5,
    },
    'cellAmendmentAdded': {
      background: fade(theme.palette.success.light, 0.75),
    },
    'cellAmendmentUpdated': {
      background: fade(theme.palette.amend, 0.75),
    },
  }),
  { name: 'RanLabBusinessesTable' },
);

const BusinessesTable = (props: Props): ReactElement => {
  const {
    businesses,
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
  const originalData = JSON.parse(JSON.stringify(businesses));
  const [rowData, setRowData] = useState<Business[]>(businesses);

  const [gridApi, setGridApi] = useState<GridOptions['api']>(null);
  const [columnApi, setColumnApi] = useState<GridOptions['columnApi']>(null);

  /**
   * Initialized grid and colump APIs when ready
   */
  const onGridReady = (
    { api, columnApi } : { api: GridOptions['api'], columnApi: GridOptions['columnApi'] }
  ) => {
    console.log('grid ready', api, columnApi);
    setGridApi(api);
    setColumnApi(columnApi);
    setAmendmentTransactions();
  };

  useEffect(
    () => {
      console.log('grid api change', gridApi);
      if (gridApi) {
        setAmendmentTransactions();
      }
    },
    [gridApi]
  );

  const setAmendmentTransactions = () => {
    if (gridApi) {
      const newRowData = rowData;

      if (transactions.adds.length) {
        transactions.adds.forEach(transaction => {
          newRowData.unshift({
            ...transaction,
            editStatus: EditTransactionStatus.ADDED,
          });
        });
      }

      if (transactions.deletes.length) {
        transactions.deletes.forEach(transaction => {
          rowData.forEach((row, key) => {
            if (row.id === transaction.id) {
              newRowData[key].editStatus = EditTransactionStatus.DELETED;
            }
          });
        });
      }

      if (transactions.updates.length) {
        transactions.updates.forEach(transaction => {
          rowData.forEach((row, key) => {
            if (row.id === transaction.id) {
              newRowData[key] = transaction;
              newRowData[key].editStatus = EditTransactionStatus.UPDATED;
            }
          });
        });
      }

      gridApi.setRowData(newRowData);
    }
  };

  /**
   * Determines if a cell can be edited
   * @param params Column params
   */
  const getEditable = (params: IsColumnFuncParams) => {
    // Default to editing mode
    let editable = editingEnabled;
    // Disable editing for the add data row
    if (params.data.id === 'add') {
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
    if (params.data.id === 'add') {
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
    if (params.data.id === 'add' && params.colDef.field !== 'actions') {
      cellClass = classes.cellAdd;
    }
    // Add row action cell
    if (params.data.id === 'add' && params.colDef.field === 'actions') {
      cellClass = classes.cellActionsAdd;
    }
    // Standard row action cell
    if (params.data.id !== 'add' && params.colDef.field === 'actions') {
      cellClass = classes.cellActions;
    }
    // Amendment classes
    if (params.data.editStatus) {
      if (params.data.editStatus === EditTransactionStatus.ADDED) {
        cellClass = classes.cellAmendmentAdded;
      }
      if (params.data.editStatus === EditTransactionStatus.DELETED) {
        cellClass = classes.cellAmendmentDeleted;
      }
      if (params.data.editStatus === EditTransactionStatus.UPDATED) {
        cellClass = classes.cellAmendmentUpdated;
      }
    }
    return cellClass;
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
      industryPass = node.data.industry === industry;
    }

    if (name !== null && name !== undefined && name !== '') {
      namePass = node.data.name.toLowerCase().includes(name.toLowerCase());
    }

    if (year !== null && year !== undefined && year !== 0) {
      yearPass = node.data.year_added === year;
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
  const addTransaction = (row: Business): BusinessEditTransactions => {
    const adds = transactions.adds;

    adds.push(row as Business);

    return {
      adds,
      deletes: transactions.deletes,
      updates: transactions.updates,
    };
  };

  /**
   * Generates a new transaction record based on a row to be removed
   * @param row Row to be removed
   * @returns New transaction record
   */
  const removeTransaction = (row: Business): BusinessEditTransactions => {
    const deletes = transactions.deletes;

    // Checks if row was updated, and removes row from update record
    const updates = transactions.updates;
    const updateMatchedRow = transactions.updates.filter(
      transRow => transRow.id === row.id
    );
    if (updateMatchedRow.length) {
      const matchedIndex = transactions.updates.indexOf(updateMatchedRow[0]);
      updates.splice(matchedIndex, 1);
    }

    // Checks if row was added, and removes row from add record
    const adds = transactions.adds;
    const addMatchedRow = transactions.adds.filter(
      transRow => transRow.id === row.id
    );
    if (addMatchedRow.length) {
      const matchedIndex = transactions.adds.indexOf(addMatchedRow[0]);
      adds.splice(matchedIndex, 1);
    }

    // Adds row to remove record if it isn't a fresh add
    if (!addMatchedRow.length) {
      // We want to push the original row to the remove array
      const originalRow = originalData.filter(
        (origRow: Business) => origRow.id === row.id
      );
      deletes.push(originalRow[0]);
    }

    return {
      adds,
      deletes,
      updates,
    };
  };

  /**
   * Generates a new transaction record based on a row to be updated
   * @param row Row to be updated
   * @returns New transaction record
   */
  const BusinessEditTransactions = (row: Business): BusinessEditTransactions => {
    const matchedRow = transactions.updates.filter(
      transRow => transRow.id === row.id
    );
    const updates = transactions.updates;

    // No current record of this row being updated
    if (!matchedRow.length) {
      updates.push(row);
    }
    // Row has already been updated
    else {
      const matchedIndex = transactions.updates.indexOf(matchedRow[0]);
      updates[matchedIndex] = row;
    }

    return {
      adds: transactions.adds,
      deletes: transactions.deletes,
      updates,
    };
  };

  /**
   * Updates transaction record on cell changed
   * @param e Cell changed event
   */
  const handleCellValueChanged = (e: CellValueChangedEvent) => {
    const newTransactions = BusinessEditTransactions(e.data);
    setTransactions(newTransactions);
  };

  // Editing

  const defaultAddRow = {
    id: 'add',
    year_added: 0,
    name: 'add',
    industry: 'add',
    employees: 0,
    location: 'add',
    regionId: businesses.length ? businesses[0].regionId : '',
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
      const rowData: Business[] = [];
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
  const handleSingleRowRemove = (row: Business, gridApi: GridOptions['api']) => {
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

  /**
   * Restores a single row
   * @param row Business data
   * @param gridApi Grid API
   */
  const handleSingleRowRestore = (row: Business, gridApi: GridOptions['api']) => {
    console.log(row);
    console.log(gridApi);
    if (gridApi && row.id) {
      const newRowData = rowData;
      rowData.forEach((r, key) => {
        if (r.id === row.id) {
          newRowData[key].editStatus = undefined;
        }
      });
      console.log('new data', newRowData);
      gridApi.setRowData(newRowData);

      const newDeletes = transactions.deletes.filter((deletedRow) => { return deletedRow.id !== row.id; });
      setTransactions({
        adds: transactions.adds,
        updates: transactions.updates,
        deletes: newDeletes,
      });

      setAlertInfo({
        message: 'Business successfully restored.',
        severity: 'success',
      });
      setAlertSnackbarOpen(true);
    }
  };

  // Default values for adding a cell
  const defaultValues: Business = {
    id: 'add',
    year_added: 2020,
    name: '',
    industry: '',
    employees: 0,
    location: [],
    regionId: '',
  };
  const addValuesRef = useRef({
    business: defaultValues,
    valid: false,
  });

  /**
   * Updates values to be added on inner component change
   * @param field Field to be updates
   * @param newValue New value
   */
  const updateAddValues = (field: string, newValue: string | number) => {
    addValuesRef.current.business = {
      ...addValuesRef.current.business,
      [field]: newValue,
    };

    addValuesRef.current.valid = Boolean(
      addValuesRef.current.business.industry
      && addValuesRef.current.business.location
      && addValuesRef.current.business.name
      && addValuesRef.current.business.year_added > 1900
    );
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

  const isLocation = (location: string | number[]) => {
    let valid = true;
    if (!Array.isArray(location)) {
      valid = /^(-?\d+(\.\d+)?),\s*(-?\d+(\.\d+)?)$/.test(location);
    }
    return valid;
  };

  const parseLocation = (location: string | number[]) => { 
    const locationArray: number[] = Array.isArray(location) ? location : [];
    if (!Array.isArray(location)) {
      const locationStringArray = location.split(',');
      locationStringArray.forEach((locationItem) => {
        locationArray.push(parseFloat(locationItem));
      });
    }
    return locationArray;
  };

  /**
   * Adds the current values to the table
   */
  const handleRowAdd = (gridApi: GridOptions['api']) => {
    if (gridApi) {
      const {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id,
        location,
        ...other
      } = addValuesRef.current.business;

      // If no location error
      if (isLocation(location)) {
        const add = [{
          id: 'added-row',
          location: parseLocation(location),
          ...other,
        }];

        const gridResponse = gridApi.applyTransaction({ add });

        // Update ID for next addition and reset values
        addValuesRef.current.business = defaultValues;
        addValuesRef.current.valid = false;
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

      // Show error if location is unparseable
      if (!isLocation(location)) {
        setAlertInfo({
          message: t('businesses-table-location-invalid'),
          severity: 'error',
        });
        setAlertSnackbarOpen(true);
      }
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

    if (params.data.id === 'add') {
      const label = params.columnApi.getDisplayNameForColumn(params.column, null);
      const field: string = params.column.colId;
      renderedValue = (
        <BusinessesAddCell
          defaultValue={addValuesRef.current.business[field]}
          field={field}
          handleChange={updateAddValues}
          label={label}
        />
      );
    }
    else {
      if (params.colDef.field === 'location' && Array.isArray(params.value)) {
        renderedValue = `${params.value[0].toFixed(4)}, ${params.value[1].toFixed(4)}`;
      }
    }

    return renderedValue;
  };

  /**
   * Custom cell renderer for action cell
   * @param params 
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actionsCellRenderer = (params: any) => {
    let type: 'add' | 'restore' | 'default' = params.data.id === 'add' ? 'add' : 'default';
    if (params.data.editStatus === 'deleted') {
      type = 'restore';
    }
    return (
      <BusinessesActionCell
        disabled={!addValuesRef.current.valid}
        handleAddClick={() => handleRowAdd(params.api)}
        handleRemoveClick={() => handleSingleRowRemove(params.data, params.api)}
        handleRestoreClick={() => handleSingleRowRestore(params.data, params.api)}
        rowId={params.data.id}
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
        id="businesses-tour-step-add-business"
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
            cellRendererFramework={addRowRenderer}
            editable={getEditable}
            field="year_added"
            headerName="Year"
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
            field="employees"
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

export default BusinessesTable;
