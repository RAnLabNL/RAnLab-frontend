import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { Business } from '../../store/types/business';
import { lighten } from '../../styles/helpers/color';
import { BusinessEditTransactions } from '../../store/types/businessEdit';

type Props = {
  transactions: BusinessEditTransactions;
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    tableCellHead: {
      fontWeight: theme.typography.fontWeightBold,
    },
    tableRowAdd: {
      background: lighten(theme.palette.highlight.light, 0.5),
    },
    tableCellRemove: {
      color: theme.palette.text.disabled,
    },
  }),
  { name: 'RanLabBusinessEditRequestTable' },
);

const BusinessEditRequestTable = (props: Props): ReactElement => {
  const {
    transactions,
  } = props;
  const { t } = useTranslation('components');
  const { t: tCommon } = useTranslation('common');
  const classes = useStyles();

  const tableHeadings = [
    t('businesses-save-confirm-action'),
    tCommon('businesses-year'),
    tCommon('businesses-name'),
    tCommon('businesses-industry'),
    tCommon('businesses-employment'),
    tCommon('businesses-location'),
  ];

  const renderBodyCells = (row: Business, type?: 'remove') => {
    const bodyCells = [
      'year_added',
      'name',
      'industry',
      'employees',
      'location',
    ];

    const renderValue = (cell: string, value: string | number | number[] | undefined) => {
      if (cell === 'location' && value && typeof value !== 'string' && typeof value !== 'number') {
        return value.join(', ');
      }
      else {
        return value;
      }
    };

    return (
      <>
        {
          bodyCells.map((cell) => (
            <TableCell
              className={classNames({
                [classes.tableCellRemove]: type === 'remove',
              })}
              key={cell}
            >
              {renderValue(cell, row[cell])}
            </TableCell>
          ))
        }
      </>
    );
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table aria-label="Confirm Business Updates">
          <TableHead>
            <TableRow>
              {
                tableHeadings.map((heading) => (
                  <TableCell
                    classes={{
                      head: classes.tableCellHead,
                    }}
                    key={heading}
                  >
                    {heading}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              transactions.adds.map((row: Business) => (
                <TableRow
                  className={classes.tableRowAdd}
                  key={row.id}
                >
                  <TableCell>
                    {t('businesses-save-confirm-action-added')}
                  </TableCell>
                  {renderBodyCells(row)}
                </TableRow>
              ))
            }
            {
              transactions.updates.map((row: Business) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {t('businesses-save-confirm-action-updated')}
                  </TableCell>
                  {renderBodyCells(row)}
                </TableRow>
              ))
            }
            {
              transactions.deletes.map((row: Business) => (
                <TableRow key={row.id}>
                  <TableCell className={classes.tableCellRemove}>
                    {t('businesses-save-confirm-action-removed')}
                  </TableCell>
                  {renderBodyCells(row, 'remove')}
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BusinessEditRequestTable;
