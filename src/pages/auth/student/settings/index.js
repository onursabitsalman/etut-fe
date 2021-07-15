import { useState } from 'react';
import { Box } from '@material-ui/core';

import { Helmet } from 'react-helmet';

import NotificationCard from 'src/components/notification-card';
import PasswordCard from 'src/components/password-card';

const notifications = [
  {
    header: 'Notifications',
    options: [
      { label: 'Email', name: 'email', isChecked: true },
      {
        label: 'Push Notification',
        name: 'pushNotification',
        isChecked: true
      },
      { label: 'Text Messages', name: 'textMessage', isChecked: true },
      { label: 'Phone calls', name: 'phoneCall', isChecked: false }
    ]
  },
  {
    header: 'Messages',
    options: [
      { label: 'Email', name: 'email', isChecked: true },
      {
        label: 'Push Notification',
        name: 'pushNotification',
        isChecked: true
      },
      { label: 'Phone calls', name: 'phoneCall', isChecked: false }
    ]
  }
];

const SettingsView = () => {
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChangePassword = (event) => {
    console.log('handlling change password', event);
    setPasswordValues({
      ...passwordValues,
      [event.target.name]: event.target.value
    });
  };

  const handleChangeNotifications = (event) => {
    console.log('handlling notifications', event);
  };

  const handleClickSave = (event) => {
    console.log('handlling click save', event);
  };

  const handleClickUpdate = (event) => {
    console.log('handlling click update', event);
  };

  return (
    <>
      <Helmet>
        <title>Settings | Kurum Adı</title>
      </Helmet>
      <Box minHeight="100%">
        <NotificationCard
          notifications={notifications}
          onChange={handleChangeNotifications}
          onClickSave={handleClickSave}
        />
        <Box className="mT20">
          <PasswordCard
            onChange={handleChangePassword}
            onClickUpdate={handleClickUpdate}
            values={passwordValues}
          />
        </Box>
      </Box>
    </>
  );
};

export default SettingsView;
