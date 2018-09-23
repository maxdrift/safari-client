// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import { subjectsList } from '../reducers/subjects';

const styles = () => ({
  root: {},
  dialogPaper: {
    minHeight: '80vh',
    maxHeight: '80vh'
  },
  formContainer: {}
});

class SCSubjectsModal extends Component {
  state = {
    subjects: subjectsList,
    searchStr: ''
  };

  handleSearchFieldChange = event => {
    const searchStr = event.target.value.toLowerCase().trim();
    if (searchStr !== '') {
      this.setState({
        subjects: subjectsList.filter(
          subject =>
            subject.name.toLowerCase().includes(searchStr) ||
            subject.sci_name.toLowerCase().includes(searchStr)
        ),
        searchStr: event.target.value
      });
    } else {
      this.setState({
        subjects: subjectsList,
        searchStr: event.target.value
      });
    }
  };

  handleDialogClose = (action, subject) => {
    switch (action) {
      case 'confirm':
        this.props.onConfirmedSubject(this.props.selectedSlides, subject.id);
        break;
      case 'abort': {
        this.props.onAbortedSubject();
        break;
      }
      default:
        this.props.onAbortedSubject();
        break;
    }
    this.setState({
      subjects: subjectsList,
      searchStr: ''
    });
  };

  render() {
    const { classes, open, selectedSubject } = this.props;
    return (
      <div className={classes.root}>
        <Dialog
          classes={{ paper: classes.dialogPaper }}
          open={open}
          onClose={() => this.handleDialogClose('abort')}
          scroll="paper"
          aria-labelledby="subjects-dialog-title"
        >
          <DialogTitle id="subjects-dialog-title">
            <span>Seleziona una specie dalla lista</span>
            <div className={classes.formContainer}>
              <TextField
                autoFocus
                margin="normal"
                id="subject"
                label="Cerca"
                type="search"
                value={this.state.searchStr}
                fullWidth
                onChange={this.handleSearchFieldChange}
              />
            </div>
          </DialogTitle>
          <DialogContent>
            <List>
              {this.state.subjects.map(subject => (
                <ListItem
                  button
                  key={subject.id}
                  selected={subject.id === selectedSubject}
                  onClick={() => this.handleDialogClose('confirm', subject)}
                >
                  <ListItemText
                    primary={subject.name}
                    secondary={
                      subject.coeff && subject.sci_name ? (
                        <span>
                          Coeff: {subject.coeff} – <i>{subject.sci_name}</i>
                        </span>
                      ) : (
                        ''
                      )
                    }
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

SCSubjectsModal.defaultProps = {
  selectedSlides: [],
  selectedSubject: null
};

SCSubjectsModal.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  selectedSlides: PropTypes.arrayOf(PropTypes.string),
  selectedSubject: PropTypes.number,
  onConfirmedSubject: PropTypes.func.isRequired,
  onAbortedSubject: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(SCSubjectsModal);
