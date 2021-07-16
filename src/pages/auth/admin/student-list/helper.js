import Box from '@material-ui/core/Box';

import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DeleteIcon from '@material-ui/icons/Delete';

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
                icon={<NoteAddIcon color="primary" />}
                onClick={(e) => onClickIcon(e, '1', id)}
              />
              <IconButtonWithTooltip
                tooltipTitle="Profil"
                icon={<PersonAddIcon color="default" />}
                onClick={(e) => onClickIcon(e, '2', id)}
              />
            </Box>
          );
        }
      }
    }
  ];
};
