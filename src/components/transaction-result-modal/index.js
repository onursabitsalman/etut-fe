import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { green, red } from '@material-ui/core/colors';
import HighlightOffTwoToneIcon from '@material-ui/icons/HighlightOffTwoTone';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';

import Button from 'src/components/formElement/button';
import Enums from 'src/libraries/enums';

import './assets/index.scss';

const TransactionResultModal = (props) => {
  const {
    modalType,
    alertType,
    content,
    title,
    open,
    onClickClose,
    size,
    children,
    rejectButtonText,
    approveButtonText,
    onClickApprove,
    onClickReject
  } = props;

  const buttonGroup = (
    <Box className="button-group" display="flex" justifyContent="flex-end">
      {rejectButtonText && (
        <Button
          size="small"
          className="mR5"
          text={rejectButtonText}
          variant="outlined"
          onClick={onClickReject}
        />
      )}
      {approveButtonText && (
        <Button
          size="small"
          text={<Button size="small" text={approveButtonText} />}
          onClick={onClickApprove}
        />
      )}
    </Box>
  );

  return (
    <Modal className={size} open={open} onClose={() => onClickClose && onClickClose()}>
      {modalType === Enums.ALERT_MODAL ? (
        <Grid className={`modal-wrapper ${size}`} container>
          <Grid className="p20" item xs={8} height="100%">
            <Typography variant="h2" gutterBottom>
              {title}
            </Typography>
            <Box classsName="content-wrapper">{content || children}</Box>
            {buttonGroup}
          </Grid>
          <Grid
            item
            xs={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
            backgroundColor={alertType === Enums.SUCCESS ? green[400] : red[400]}
          >
            {alertType === Enums.SUCCESS ? (
              <CheckCircleOutlineOutlinedIcon sx={{ fontSize: '120px' }} />
            ) : alertType === Enums.ERROR ? (
              <HighlightOffTwoToneIcon sx={{ fontSize: '120px' }} />
            ) : null}
          </Grid>
        </Grid>
      ) : modalType === Enums.CONTENT_MODAL ? (
        <Grid className={`modal-wrapper ${size}`} container>
          <Grid className="p20" xs={12}>
            <Typography textAlign="center" variant="h2" gutterBottom>
              {title}
            </Typography>
            <Box classsName="content-wrapper">{content || children}</Box>
            {buttonGroup}
          </Grid>
        </Grid>
      ) : null}
    </Modal>
  );
};

TransactionResultModal.defaultProps = {
  size: 'md' /* sm , md , lg, xl */,
  alertType: Enums.SUCCESS /* SUCCESS , ERROR */,
  modalType: Enums.ALERT_MODAL /* ALERT_MODAL, CONTENT_MODAL */
};

export default TransactionResultModal;
