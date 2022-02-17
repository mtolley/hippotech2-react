import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


function createData(address, status, purchasePrice, amountToBorrow) {
  return {
    address,
    status,
    purchasePrice,
    amountToBorrow,
    history: [
      {
        id: '1',
        date: '2020-01-05',
        party: 'Customer',
        event: 'Created',
        details: 'Submitted for approval'
      },
      {
        id: '2',
        date: '2020-01-05',
        party: 'HippoTech',
        event: 'Agreement in Principal',
        details: 'Agreement in principal subject to lender checks and property valuation'
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.address}
        </TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.purchasePrice}</TableCell>
        <TableCell align="right">{row.amountToBorrow}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Party</TableCell>
                    <TableCell align="right">Event</TableCell>
                    <TableCell align="right">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.id}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.party}</TableCell>
                      <TableCell align="right">{historyRow.event}</TableCell>
                      <TableCell align="right">
                        {historyRow.details}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    address: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    purchasePrice: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        event: PropTypes.string.isRequired,
        party: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        details: PropTypes.string
      }),
    ).isRequired,
    amountToBorrow: PropTypes.number.isRequired
  }).isRequired,
};

const rows = [
  createData('1 Funguy Stree, London', "Awaiting Approval", 450000, 400000),
  createData('35 Infinity Square, New York', "Approved", 1250000, 1000000),
];

export default function MyMortgages() {
  return (
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="top"
    style={{ minHeight: '100vh', padding: '50px' }}
  >
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Address</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Purchase Price</TableCell>
            <TableCell align="right">Amount To Borrow</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.address} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}