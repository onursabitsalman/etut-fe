import Box from '@material-ui/core/Box';

import LockIcon from '@material-ui/icons/Lock';

import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import { green } from '@material-ui/core/colors';

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
    { name: 'majorType', label: 'Ders' },
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
                tooltipTitle="Etüt Ayarları"
                icon={<PermDataSettingIcon color={green[300]} />}
                onClick={(e) => onClickIcon(e, '1', id)}
              />
              <IconButtonWithTooltip
                tooltipTitle="Şifre Sıfırla"
                icon={<LockIcon color="default" color="primary" />}
                onClick={(e) => onClickIcon(e, '2', id)}
              />
              <IconButtonWithTooltip
                tooltipTitle="Profil"
                icon={<AssignmentIndIcon />}
                onClick={(e) => onClickIcon(e, '3', id)}
              />
            </Box>
          );
        }
      }
    }
  ];
};
