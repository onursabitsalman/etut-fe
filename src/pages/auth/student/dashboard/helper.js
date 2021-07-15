import Chip from '@material-ui/core/Chip';

import moment from 'moment';
import Enums from 'src/libraries/enums';

export const getColumns = () => {
  return [
    {
      name: 'ref',
      label: 'Order Ref',
      options: {
        sort: false
      }
    },
    {
      name: 'customer',
      label: 'Customer',
      options: {
        sort: false,
        customBodyRender: (customer) => {
          return customer.name;
        }
      }
    },
    {
      name: 'createdAt',
      label: 'Date',
      options: {
        sort: false,
        customBodyRender: (createdAt) => {
          return moment(createdAt).format(Enums.DATE_FORMAT);
        }
      }
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        sort: false,
        customBodyRender: (status) => {
          return <Chip color="primary" label={status} size="small" />;
        }
      }
    }
  ];
};
