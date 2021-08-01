import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import MomentUtils from '@date-io/moment';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import _cloneDeep from 'lodash/cloneDeep';

import TimeLabel from 'src/components/time-label';
import Button from 'src/components/formElement/button';

import { generateSlots } from 'src/utils/utilFunctions';

import 'moment/locale/tr';

const SetCourse = (props) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);
  const [selectedEtudes, setSelectedEtudes] = useState([]);
  const [teacher, setTeacher] = useState({});
  const [openedPanelIndex, setOpenedPanelIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const params = useParams();

  useEffect(() => {
    setSelectedDate(moment());
    generateDateAndSlots(moment());
    setTeacher(props.teacherListReducer.data.teacherList.find((t) => t.id == params.id));
  }, []);

  const generateDateAndSlots = (date) => {
    const dates = [];
    if (date.day() === 0) dates.push({ date: date, slots: generateSlots(date) });
    else {
      for (let i = 0; i <= 7 - date.day(); i++) {
        const tempDate = moment(date).add(i, 'd');
        dates.push({
          date: tempDate,
          slots: generateSlots(tempDate)
        });
      }
    }
    setSelectedWeekDays(dates);
  };

  const checkDisabledTimeLabel = (slot) => {
    const filtered = selectedEtudes.filter(
      (se) => se.date.format('DD-MM-YYYY') === slot.format('DD-MM-YYYY')
    );
    return (
      filtered.length &&
      filtered[0].time.some((f) => f.format('hh:mm') === slot.format('hh:mm'))
    );
  };

  const handleClickTimeLabel = (selectedSlot, isSelectedSlot) => {
    const clonedSelectedEtudes = _cloneDeep(selectedEtudes);
    let theDate = clonedSelectedEtudes.find(
      (i) => (i.date && i.date.format('DD-MM-YYYY')) === selectedSlot.format('DD-MM-YYYY')
    );

    if (theDate) {
      if (isSelectedSlot) {
        const filteredTimes = theDate.time.filter(
          (i) => i.format('HH:mm') !== selectedSlot.format('HH:mm')
        );
        theDate.time = filteredTimes;
      } else theDate.time.push(selectedSlot);
    } else clonedSelectedEtudes.push({ date: selectedSlot, time: [selectedSlot] });

    setSelectedEtudes(clonedSelectedEtudes);
  };

  const handleChange = (index) => (event, isExpanded) => {
    setOpenedPanelIndex(isExpanded ? index : false);
  };

  const handleDateChange = (date) => {
    setOpenedPanelIndex(0);
    setOpen(false);
    setSelectedDate(date);
    generateDateAndSlots(date);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className="mL5 mB10" variant="h3">
          {`${teacher.name} ${teacher.surname} için etüt saatlerini seçiniz.`}
        </Typography>
        <MuiPickersUtilsProvider utils={MomentUtils} locale="tr">
          <Grid container>
            <Grid xs={12} sm={12} md={6}>
              <KeyboardDatePicker
                open={open}
                onClose={() => setOpen(false)}
                onClick={() => setOpen(true)}
                value={selectedDate}
                onChange={handleDateChange}
                fullWidth
                disablePast
                size="small"
                disableToolbar
                variant="inline"
                format="MM-DD-yyyy - dddd"
                margin="normal"
                id="date-picker-inline"
                label="Tarih"
              />
            </Grid>
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        {selectedWeekDays.map((swDay, index) => {
          return (
            <Accordion
              expanded={openedPanelIndex === index}
              onChange={handleChange(index)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />} id={'panelId' + index}>
                <Typography className="mL5" variant="h5">
                  {swDay.date.format('DD-MM-YYYY - dddd')}
                </Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {swDay.slots.map((slot) => (
                  <TimeLabel
                    label={slot.format('HH:mm')}
                    date={slot}
                    disabled={checkDisabledTimeLabel(slot)}
                    onClick={handleClickTimeLabel}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Grid>
      <Grid xs={12} className="mT10" display="flex" justifyContent="flex-end">
        <Button className="" text="Güncelle" />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  teacherListReducer: state.teacherListReducer
});

export default connect(mapStateToProps)(SetCourse);
