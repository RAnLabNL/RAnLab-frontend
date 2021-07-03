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
import { useRouter } from 'next/router';
import {
  MouseEvent,
  ReactElement,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { RootState } from '../../../store';
import { getRegionNameById } from '../../../store/helpers/region';
import { Business } from '../../../store/types/business';
import { BusinessEdit, Status } from '../../../store/types/businessEdit';
import { fade } from '../../../styles/helpers/color';
import AppLoading from '../../base/AppLoading';

const DATE_FORMAT = 'MMM D, YYYY h:mmA';

type Props = {
  admin?: boolean,
  businessEdits: BusinessEdit[],
};

const useStyles = makeStyles(
  (theme) => ({
    root: {},
    tableCellHead: {
      fontWeight: theme.typography.fontWeightBold,
    },
    tableRowBody: {
      '&:hover': {
        background: fade(theme.palette.divider, 0.8),
      },
    },
    tableCellBody: {
      cursor: 'pointer',
    },
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

const UpdateRequestTable = ({ admin, businessEdits }: Props): ReactElement => {
  const router = useRouter();
  const { t } = useTranslation('components');
  const classes = useStyles();
  const [page, setPage] = useState<number>(0);
  const rowsPerPage = admin ? 5 : 10;
  const regionState = useSelector((state: RootState) => state.region);
  const userState = useSelector((state: RootState) => state.user);

  const adminHeadings = [
    'business-update-request-heading-region',
    'business-update-request-heading-submitted-by',
    'business-update-request-heading-date-submitted',
    'business-update-request-heading-date-reviewed',
    'business-update-request-heading-review-status',
  ];

  const regionHeadings = [
    'business-update-request-heading-region',
    'business-update-request-heading-date-submitted',
    'business-update-request-heading-date-updated',
    'business-update-request-heading-review-status',
  ];

  const headings = admin ? adminHeadings : regionHeadings;

  const regionKeys: string[] = [
    'regionId',
    'dateSubmitted',
    'dateUpdated',
    'status',
  ];

  const adminKeys: string[] = [
    'regionId',
    'submitter',
    'dateSubmitted',
    'dateUpdated',
    'status',
  ];

  const dataKeys: string[] = admin ? adminKeys : regionKeys;

  /**
   * Navigates to edit request page on row click
   * @param event Target event
   */
  const handleRowClick = (event: MouseEvent) => {
    const target = event.target as HTMLTableCellElement;
    const { dataset } = target;
    router.push(`/edits/request?id=${dataset.id}`);
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement | MouseEvent> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const getRowValue = (
    key: string,
    value: string | Business[] | undefined,
    status: Status | undefined
  ) => {
    if (typeof value === 'string') {
      switch (key) {
        case 'regionId':
          if (!regionState.loading && regionState.regions) {
            return getRegionNameById(value, regionState.regions);
          }
          break;
        case 'submitter':
          if (
            value
            && !userState.loading
            && userState.allUsers
            && userState.allUsers[value]
          ) {
            return `${userState.allUsers[value].firstName} ${userState.allUsers[value].lastName}`;
          }
          break;
        case 'dateSubmitted':
          return moment(value).format(DATE_FORMAT);
        case 'dateUpdated':
          return status === Status.PENDING ? null : moment(value).format(DATE_FORMAT);
        default:
          return value;
      }
    }
  };

  if (userState.loading) {
    return <AppLoading />;
  }

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
              businessEdits
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
                              [classes.tableCellBodyInProgress]: row.status === Status.CLAIMED,
                              [classes.tableCellBodyApproved]: row.status === Status.APPROVED,
                              [classes.tableCellBodyDeclined]: row.status === Status.DECLINED,
                              [classes.tableCellBodyAmended]: row.status === Status.AMENDED,
                            }
                          )}
                          data-id={row.id}
                          key={key}
                        >
                          {getRowValue(key, row[key], row.status)}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                ))
            }
            <TableRow>
              <TablePagination
                count={businessEdits.length}
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

export default UpdateRequestTable;
