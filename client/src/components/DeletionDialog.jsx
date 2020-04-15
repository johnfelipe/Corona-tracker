/* eslint-disable no-console */

import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useBlockstack } from 'react-blockstack';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import actions from '../redux/actions/actions';
import { ReactComponent as TextLogo } from '../img/Logo_CORONATRACKER_Text_Logo.svg';
import { ReactComponent as Logo } from '../img/Logo_CORONATRACKER_Logo.svg';

const useStyles = makeStyles({
  logo: {
    width: '75px',
    height: '60px',
  },
  textLogo: {
    width: '250px',
    height: '50px',
  },
});
const DeletionDialog = props => {
  const { userSession } = useBlockstack();
  const { deleteObservations, deleteDetailData, setShowDeletionDialog } = props;
  const history = useHistory();

  const classes = useStyles();
  return (
    <div>
      <Dialog open aria-describedby="disclaimer">
        <DialogTitle align="center" id="alert-dialog-title">
          <Logo className={classes.logo} />
          <TextLogo className={classes.textLogo} />
        </DialogTitle>
        <DialogContent>
          <DialogContent align="left" id="disclaimer-text">
            <DialogContentText>Are you sure you want to delete all of your observation data?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                deleteObservations(userSession);
                deleteDetailData();
                history.push('/');
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={() => setShowDeletionDialog(false)}>
              No
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

DeletionDialog.propTypes = {
  deleteObservations: PropTypes.func.isRequired,
  deleteDetailData: PropTypes.func.isRequired,
  setShowDeletionDialog: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  return {
    setShowDeletionDialog: ownProps.setShowDeletionDialog,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteObservations: userSession => dispatch(actions.deleteObservations(userSession)),
    deleteDetailData: () => dispatch(actions.deleteDetailData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeletionDialog);