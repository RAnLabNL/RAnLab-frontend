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

import { lighten } from '../../../styles/helpers/color';
import { BusinessRow, UpdateTransaction } from './BusinessesTable';

type Props = {
  transactions: UpdateTransaction;
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
  })
);

const BusinessesSaveConfirm = (props: Props): ReactElement => {
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

  const renderBodyCells = (row: BusinessRow, type?: 'remove') => {
    const bodyCells = [
      'year',
      'name',
      'industry',
      'employment',
      'location',
    ];

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
              {row[cell]}
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
              transactions.add.map((row: BusinessRow) => (
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
              transactions.update.map((row: BusinessRow) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {t('businesses-save-confirm-action-updated')}
                  </TableCell>
                  {renderBodyCells(row)}
                </TableRow>
              ))
            }
            {
              transactions.remove.map((row: BusinessRow) => (
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

export default BusinessesSaveConfirm;
