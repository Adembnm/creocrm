import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { BsCalendarPlus } from 'react-icons/bs';
import { Autocomplete, TextField } from '@mui/material';
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
  const [formData, setFormData] = useState({
    id: null,
    date: '',
    customer: '',
    duration: 0,
    description: '',
  });
  const [errors, setErrors] = useState({
    date: '',
    customer: '',
    duration: '',
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
    setErrors({
      date: '',
      customer: '',
      duration: '',
    });
  };

  useEffect(() => {
    dispatch(listCustomersRequest());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getAppointmentRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (listCustomers && appointment && appointment.customer) {
      const selectedCustomer = listCustomers.find(cus => cus._id === appointment.customer);
      setFormData({
        id: appointment._id,
        date: moment(appointment.date).format('YYYY-MM-DDTHH:mm'),
        duration: appointment.duration,
        description: appointment.description,
        customer: selectedCustomer ? selectedCustomer._id : '',
      });
      setInputValue(selectedCustomer ? selectedCustomer.name : '');
    } else {
      clearForm();
    }
  }, [appointment, listCustomers]);

  const validateDate = (date) => {
    const selectedDate = moment(date);
    const currentDate = moment();
    if (selectedDate.isBefore(currentDate, 'minute')) {
      setErrors(prevErrors => ({ ...prevErrors, date: "La date du rendez-vous ne peut pas être dans le passé." }));
      return currentDate.format('YYYY-MM-DDTHH:mm');
    }
    setErrors(prevErrors => ({ ...prevErrors, date: '' }));
    return date;
  };

  const validateForm = () => {
    let isValid = true;
    let newErrors = { date: '', customer: '', duration: '' };

    if (formData.date.length === 0) {
      isValid = false;
      newErrors.date = 'La date est requise';
    }

    if (!formData.customer || formData.customer.length === 0) {
      isValid = false;
      newErrors.customer = 'Le client est requis';
    }

    if (formData.duration <= 0) {
      isValid = false;
      newErrors.duration = 'La durée doit être supérieure à 0';
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        dispatch(updateAppointmentRequest(formData, navigate));
      } else {
        dispatch(createAppointmentRequest(formData, navigate));
      }
    }
  };

  if (user?.role > 4) {
    return <NotAuthorized />;
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
        <BsCalendarPlus className='absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl' />
        <h3 className='mb-20 mx-auto text-center text-3xl font-bold dark:text-white text-slate-600'
          style={{ color: currentColor }}>{id ? t('edit') : t('add')} {t("appointment")}</h3>
        <div className='flex flex-col sm:flex-row w-full mb-4'>
          <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
            <label htmlFor="date" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("date")}<span className='text-red-600 ml-2'>*</span></label>
            <input id="date"
              name="date"
              type="datetime-local"
              required
              className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
              value={formData.date}
              onChange={(event) => setFormData({ ...formData, date: validateDate(event.target.value) })}
            />
            {errors.date && <p className="text-red-600">{errors.date}</p>}
          </div>
          <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
            <label htmlFor="customer" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("customer")} <span className='text-red-600 ml-2'>*</span></label>
            <Autocomplete
              id="customer-auto"
              value={listCustomers.find(cus => cus._id === formData.customer) || null}
              onChange={(event, newValue) => {
                setFormData({ ...formData, customer: newValue ? newValue._id : '' });
                setInputValue(newValue ? newValue.name : '');
                setErrors(prevErrors => ({ ...prevErrors, customer: '' }));
              }}
              inputValue={inputValue}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              options={listCustomers || []}
              sx={{ width: "100%" }}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              getOptionLabel={(option) => option.name || ''}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="customer"
                  name="customer"
                  placeholder={t('search_by_customer')}
                  className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                />
              )}
            />
            {errors.customer && <p className="text-red-600">{errors.customer}</p>}
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
              onChange={(event) => setFormData({ ...formData, duration: parseInt(event.target.value) || 0 })}
            />
            {errors.duration && <p className="text-red-600">{errors.duration}</p>}
          </div>
          <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
            <label htmlFor="description" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("description")}</label>
            <textarea id="description"
              name="description"
              rows={4}
              className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
          </div>
        </div>
        <div className='mt-10 mb-4 flex justify-center items-center'>
          <button className='w-auto sm:w-52 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none'
            style={{ backgroundColor: currentColor }}
            type='submit'
            onClick={(e) => handleSubmit(e)}>
            {id ? t('edit') : t('add')} {t("appointment")}
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
      </form>
    </div>
  );
};

export default AppointmentForm;
