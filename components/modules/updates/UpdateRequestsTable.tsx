import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { fade } from '../../../styles/helpers/color';

type Props = {
  admin?: boolean,
  dataSet: DataRow[],
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    tableCellHead: {
      fontWeight: theme.typography.fontWeightBold,
    },
    tableRowBody: {
      cursor: 'pointer',
      '&:hover': {
        background: fade(theme.palette.divider, 0.8),
      },
    },
    tableCellBody: {},
    tableCellBodyInProgress: {
      background: fade(theme.palette.highlight.main, 0.9),
    },
    tableCellBodyApproved: {
      background: fade(theme.palette.success.light, 0.8),
    },
    tableCellBodyDeclined: {
      background: fade(theme.palette.error.light, 0.8),
    },
    tableCellBodyAmended: {
      background: fade(theme.palette.warning.light, 0.8),
    },
  })
);

const UpdateRequestTable = ({ admin, dataSet }: Props): ReactElement => {
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = admin ? 5 : 10;

  const adminHeadings = [
    'business-update-request-heading-region',
    'business-update-request-heading-submitted-by',
    'business-update-request-heading-date-submitted',
    'business-update-request-heading-date-reviewed',
    'business-update-request-heading-reviewer',
    'business-update-request-heading-review-status',
  ];

  const regionHeadings = [
    'business-update-request-heading-region',
    'business-update-request-heading-date-submitted',
    'business-update-request-heading-date-updated',
    'business-update-request-heading-review-status',
  ];

  const headings = admin ? adminHeadings : regionHeadings;

  const regionKeys = [
    'region',
    'dateSubmitted',
    'dateUpdated',
    'reviewStatus',
  ];

  const adminKeys = [
    'region',
    'submittedBy',
    'dateSubmitted',
    'dateReviewed',
    'reviewer',
    'reviewStatus',
  ];

  const dataKeys = admin ? adminKeys : regionKeys;

  const handleRowClick = () => {
    // TODO navigate to business update request on row click
    console.log('click');
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement | MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer>
        <Table aria-label="Business Update Requests">
          <TableHead>
            <TableRow>
              {
                headings.map(heading => (
                  <TableCell
                    className={classes.tableCellHead}
                    key={heading}
                  >
                    {t(heading)}
                  </TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              dataSet
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    className={classes.tableRowBody}
                    onClick={handleRowClick}
                    key={index}
                  >
                    {
                      dataKeys.map(key => (
                        <TableCell
                          className={classNames(
                            classes.tableCellBody,
                            {
                              [classes.tableCellBodyInProgress]: row.reviewStatus === 'In Progress',
                              [classes.tableCellBodyApproved]: row.reviewStatus === 'Approved',
                              [classes.tableCellBodyDeclined]: row.reviewStatus === 'Declined',
                              [classes.tableCellBodyAmended]: row.reviewStatus === 'Amended',
                            }
                          )}
                          key={key}
                        >
                          {row[key]}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
            }
            <TableRow>
              <TablePagination
                count={dataSet.length}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
                onChangePage={handleChangePage}
              />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

// Needed to dynamically key in a DataRow
interface DataField {
  [key: string]: string | undefined;
}

export interface DataRow extends DataField {
  region: string;
  submittedBy?: string;
  dateSubmitted: string;
  dateReviewed?: string;
  dateUpdated?: string;
  reviewer?: string;
  reviewStatus: string;
}

export default UpdateRequestTable;
