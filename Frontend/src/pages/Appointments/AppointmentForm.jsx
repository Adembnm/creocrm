import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { BsCalendarPlus } from 'react-icons/bs';
import { Autocomplete } from '@mui/material';
import { createAppointmentRequest, getAppointmentRequest, listCustomersRequest, updateAppointmentRequest } from '../../store/appointments/actions';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const AppointmentForm = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { appointment, listCustomers } = useSelector(state => state.appointments);
  const { currentColor } = useStateContext();
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    customer: '',
    duration: 0,
    description: '',
  });

  const clearForm = () => {
    setFormData({
      id: null,
      date: '',
      customer: '',
      duration: 0,
      description: '',
    });
    setInputValue('');
  }

  useEffect(() => {
      dispatch(listCustomersRequest());
  } , [dispatch]);
  
  useEffect(() => {
    if (id) {
      dispatch(getAppointmentRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (listCustomers && appointment && appointment.customer !== '') {
      setFormData({ 
        id: appointment._id,
        date: moment(appointment.date).format('YYYY-MM-DDTHH:mm'),
        duration: appointment.duration,
        description: appointment.description,
        customer: appointment.customer, 
      });
      setInputValue(listCustomers?.find(cus => cus._id === appointment?.customer)?.name);
    } else {
      clearForm();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointment, listCustomers]);

  const validation = () => {
    let isValid = true;
    if (formData.date.length === 0) {
      isValid = false;
      setFeedback('Date is required');
    }
    if (formData.customer.length === 0) {
      isValid = false;
      setFeedback('Customer is required');
    }
    return isValid;
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      if (id) {
        dispatch(updateAppointmentRequest(formData, navigate));
      } else {
        dispatch(createAppointmentRequest(formData, navigate));
      }
    }
  }

  if (user?.role > 4) {
    return <NotAuthorized />
  }

  console.log(appointment)
    
  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
          <BsCalendarPlus className='absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl' /> 
          <h3 className='mb-20 mx-auto text-center text-3xl font-bold dark:text-white text-slate-600' 
              style={{ color: currentColor }}>{id ? t('edit') : t('add') } {t("appointment")}</h3>
          <div className='flex flex-col sm:flex-row w-full mb-4'>
            <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                <label htmlFor="date" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("date")}<span className='text-red-600 ml-2'>*</span></label>
                <input id="date"
                        name="date"
                        type="datetime-local"
                        required
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.date}
                        onChange={(event) => setFormData({...formData, date: moment(event.target.value).format('YYYY-MM-DDTHH:mm')})}
                />
            </div>
            <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                <label htmlFor="customer" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("customer")} <span className='text-red-600 ml-2'>*</span></label>
                <Autocomplete
                    id="customer-auto"
                    value={formData.customer}
                    onChange={(event, newValue) => {
                      setFormData({...formData, customer: newValue._id});
                      setFeedback('');
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    options={listCustomers}
                    sx={{ width: "100%" }}
                    isOptionEqualToValue={(option) => option._id === formData.customer}
                    getOptionLabel={(option) => option.name || inputValue}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                            <input type="text" 
                                id="customer" 
                                name="customer" 
                                placeholder={t('search_by_customer')}
                                className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                                {...params.inputProps} 
                              />
                        </div>
                    )}
                  />
            </div>
          </div>
          <div className='flex flex-col sm:flex-row w-full mb-4'>
              <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <label htmlFor="duration" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("duration")}</label>
                  <input id="duration"
                          name="duration"
                          type="number"
                          required
                          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                          value={formData.duration}
                          onChange={(event) => setFormData({...formData, duration: event.target.value})}
                  />
              </div>     
              <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <label htmlFor="description" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("description")}</label>
                  <textarea id="description"
                          name="description"
                          rows={4}
                          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                          value={formData.description}
                          onChange={(event) => setFormData({...formData, description: event.target.value})}
                  />
              </div>
          </div>
          <div className='mt-10 mb-4 flex justify-center items-center'>
            <button className='w-auto sm:w-52 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none'
                    style={{ backgroundColor: currentColor }}
                    type='submit'
                    onClick={(e) => handleSubmit(e)}>
              {id ? t('edit') : t('add') } {t("appointment")}
            </button>
            <button className='w-auto sm:w-52 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none'
                    style={{ borderColor: currentColor, color: currentColor }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/crm/appointments');
                    }}>
              {t("cancel")}
            </button>
          </div>
          <p className='text-center w-full text-red-400 mt-4'>{feedback}</p>
      </form>
    </div>
  );
};
export default AppointmentForm;
