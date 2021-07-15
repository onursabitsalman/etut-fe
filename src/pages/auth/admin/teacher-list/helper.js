import Box from '@material-ui/core/Box';

import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
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
    { name: 'fullname', label: 'İsim' },
    { name: 'major', label: 'Ders' },
    { name: 'phone', label: 'Telefon Numarası' },
    {
      name: 'transactions',
      label: 'İşlemler',
      options: {
        filter: false,
        sort: false,
        customBodyRender: () => {
          return (
            <Box>
              <IconButtonWithTooltip
                tooltipTitle="Etüt Ayarları"
                icon={<PermDataSettingIcon color={green[300]} />}
                onClick={onClickIcon}
              />
              <IconButtonWithTooltip
                tooltipTitle="Profil"
                icon={<AssignmentIndIcon color="primary" />}
                onClick={onClickIcon}
              />
              <IconButtonWithTooltip
                tooltipTitle="Şifre Sıfırla"
                icon={<LockIcon color="default" />}
                onClick={onClickIcon}
              />
              <IconButtonWithTooltip
                tooltipTitle="Sil"
                icon={<DeleteIcon color="secondary" />}
                onClick={onClickIcon}
              />
            </Box>
          );
        }
      }
    }
  ];
};
