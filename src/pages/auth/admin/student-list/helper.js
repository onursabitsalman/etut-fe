import Box from '@material-ui/core/Box';

import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import LockIcon from '@material-ui/icons/Lock';

import IconButtonWithTooltip from 'src/components/icon-button-with-tooltip';

export const getColumns = (onClickIcon) => {
  return [
    {
      name: 'username',
      label: 'Kullanıcı Adı',
      options: {
        sort: false,
        filter: true
      }
    },
    { name: 'name', label: 'İsim' },
    { name: 'surname', label: 'Soyisim' },
    { name: 'classCode', label: 'Sınıf' },
    { name: 'phoneNumber', label: 'Telefon Numarası' },
    {
      name: 'id',
      label: 'İşlemler',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (id, row) => {
          return (
            <Box>
              <IconButtonWithTooltip
                tooltipTitle="Şifre sıfırla"
                icon={<LockIcon color="primary" />}
                onClick={(e) => onClickIcon(e, '1', id)}
              />
              <IconButtonWithTooltip
                tooltipTitle="Profil"
                icon={<AssignmentIndIcon color="default" />}
                onClick={(e) => onClickIcon(e, '2', id)}
              />
            </Box>
          );
        }
      }
    }
  ];
};
