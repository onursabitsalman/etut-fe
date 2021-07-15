import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import MUIDataTable from 'mui-datatables';
import { v4 as uuid } from 'uuid';

import { getColumns } from './helper';

const LatestOrders = () => {
  const orders = [
    {
      id: uuid(),
      ref: 'CDD1049',
      amount: 30.5,
      customer: {
        name: 'Ekaterina Tankova'
      },
      createdAt: 1555016400000,
      status: 'pending'
    },
    {
      id: uuid(),
      ref: 'CDD1048',
      amount: 25.1,
      customer: {
        name: 'Cao Yu'
      },
      createdAt: 1555016400000,
      status: 'delivered'
    },
    {
      id: uuid(),
      ref: 'CDD1047',
      amount: 10.99,
      customer: {
        name: 'Alexa Richardson'
      },
      createdAt: 1554930000000,
      status: 'refunded'
    },
    {
      id: uuid(),
      ref: 'CDD1046',
      amount: 96.43,
      customer: {
        name: 'Anje Keizer'
      },
      createdAt: 1554757200000,
      status: 'pending'
    },
    {
      id: uuid(),
      ref: 'CDD1045',
      amount: 32.54,
      customer: {
        name: 'Clarke Gillebert'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    },
    {
      id: uuid(),
      ref: 'CDD1044',
      amount: 16.76,
      customer: {
        name: 'Adam Denisov'
      },
      createdAt: 1554670800000,
      status: 'delivered'
    }
  ];

  return (
    <MUIDataTable
      title="Latest Orders"
      data={orders}
      columns={getColumns()}
      options={{
        onRowClick: (e) => console.log('haydar', e),
        print: false,
        viewColumns: false,
        filter: false,
        download: false,
        search: false,
        selectableRows: false,
        customFooter: () => {
          return (
            <Box className="p10" display="flex" justifyContent="flex-end">
              <Button
                color="primary"
                endIcon={<ArrowRightIcon />}
                size="small"
                variant="text"
              >
                View all
              </Button>
            </Box>
          );
        }
      }}
    />
  );
};

export default LatestOrders;
