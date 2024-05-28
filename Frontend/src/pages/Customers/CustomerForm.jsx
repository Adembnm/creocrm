import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import {
  addCustomerRequest,
  editCustomerRequest,
  getCustomerRequest,
} from '../../store/customers/actions';
// import { getCustomerStatus, settingsData } from '../../data/dummy';
// import Rating from '@mui/material/Rating';
// import Satisfaction from '../../components/Satisfaction';
import { RiUserAddLine } from 'react-icons/ri';
import { getCustomerSources } from '../../data/dummy';
import { useTranslation } from 'react-i18next';

const CustomerForm = (props) => {
  const today = new Date().toISOString().substring(0, 10);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { customer } = useSelector((state) => state.customers);
  const { currentColor } = useStateContext();
  const [feedback, setFeedback] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    birthDay: today,
    name: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    city: '',
    avatar: '',
    notes: '',
    source: 0,
  });

  const clearForm = () => {
    setFormData({
      id: null,
      birthDay: today,
      name: '',
      email: '',
      phone: '',
      website: '',
      address: '',
      city: '',
      avatar: '',
      source: 0,
    });
  };

  useEffect(() => {
    if (id) {
      dispatch(getCustomerRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (customer && id) {
      setFormData({
        id: customer._id,
        birthDay: new Date(customer.birthDay).toISOString().substring(0, 10),
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        website: customer.website,
        address: customer.address,
        city: customer.city,
        avatar: customer.avatar,
        notes: customer.notes,
        source: customer.source,
      });
    } else {
      clearForm();
    }
  }, [customer, id]);

  const validation = () => {
    let isValid = true;
    //Date Validation
    if (formData.birthDay.length === 0) {
      setFeedback('Please enter a date');
      isValid = false;
    }

    if (formData.phone.length < 3) {
      setFeedback(t('phone_is_required'));
      isValid = false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      setFeedback(t('invalid email format'));
      isValid = false;
    }
    if (formData.email.length < 3) {
      setFeedback(t('email_is_required'));
      isValid = false;
    }

    if (formData.name.length < 3) {
      setFeedback(t('name_is_required'));
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      if (id) {
        dispatch(editCustomerRequest(formData, navigate));
      } else {
        dispatch(addCustomerRequest(formData, navigate));
      }
    }
  };

  if (user?.role > 4) {
    return <NotAuthorized />;
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
        <RiUserAddLine className="absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl" />
        <h3
          className="mb-20 mx-auto px-2 sm:px-4 text-center text-3xl font-bold dark:text-white text-slate-600"
          style={{ color: currentColor }}
        >
          {id ? t('edit') : t('add')} {t('customer')}
        </h3>
        <div className="flex w-full flex-wrap mb-0 sm:mb-4">
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="name"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('name')} <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                setFeedback('');
              }}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="email"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('email')} <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.email}
              onChange={(event) => {
                setFormData({ ...formData, email: event.target.value });
                setFeedback('');
              }}
            />
          </div>
        </div>
        {/* Check below */}
        <div className="flex w-full flex-wrap mb-0 sm:mb-4">
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="phone"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('phone')} <span className="text-red-600 ml-2">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              style={
                i18n.language === 'ar'
                  ? {
                      direction: 'ltr',
                      textAlign: 'right',
                    }
                  : {
                      direction: 'ltr',
                      textAlign: 'left',
                    }
              }
              value={formData.phone}
              onChange={(event) => {
                setFormData({ ...formData, phone: event.target.value });
                setFeedback('');
              }}
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="website"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('website')}
            </label>
            <input
              id="website"
              name="website"
              type="text"
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.website}
              onChange={(event) =>
                setFormData({ ...formData, website: event.target.value })
              }
            />
          </div>
        </div>
        {/* check above */}
        <div className="flex w-full flex-wrap mb-0 sm:mb-4">
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="address"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('address')}
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.address}
              onChange={(event) =>
                setFormData({ ...formData, address: event.target.value })
              }
            />
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="city"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('city')}
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.city}
              onChange={(event) =>
                setFormData({ ...formData, city: event.target.value })
              }
            />
          </div>
        </div>
        <div className="flex w-full flex-wrap mb-0 sm:mb-4">
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="avatar"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('avatar')}
            </label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.avatar}
              onChange={(event) =>
                setFormData({ ...formData, avatar: event.target.value })
              }
            />
            <div className="mt-4">
              <label
                htmlFor="source"
                className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
              >
                {t('source')}
              </label>
              <select
                id="source"
                name="source"
                className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
                value={formData.source}
                onChange={(event) =>
                  setFormData({ ...formData, source: event.target.value })
                }
              >
                <option value={0}>{t('selectSource')}</option>
                {getCustomerSources.map((source, index) => (
                  <option key={index} value={source.id}>
                    {t(source.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-1/2 px-2 sm:px-4 mb-4 sm:mb-0">
            <label
              htmlFor="notes"
              className="text-sm dark:text-gray-200 text-gray-600 mb-2 block"
            >
              {t('notes')}
            </label>
            <textarea
              id="notes"
              name="notes"
              className="w-full h-32 py-3 px-4 bg-slate-100 focus:outline-none"
              value={formData.notes}
              onChange={(event) =>
                setFormData({ ...formData, notes: event.target.value })
              }
            />
          </div>
        </div>
        <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
          <label
            htmlFor="date"
            className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
          >
            {t('Date de naissance')}{' '}
            <span className="text-red-600 ml-2">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            className="w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none"
            value={formData.date}
            onChange={(event) => {
              setFormData({ ...formData, date: event.target.value });
              setFeedback('');
            }}
          />
        </div>
        <div className="mt-10 mb-4 flex justify-center items-center">
          <button
            className="w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none"
            style={{ backgroundColor: currentColor }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {id ? t('edit') : t('add')} {t('customer')}
          </button>
          <button
            className="w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none"
            style={{ borderColor: currentColor, color: currentColor }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/crm/customers');
            }}
          >
            {t('cancel')}
          </button>
        </div>
        <p className="text-center w-full text-red-400 mt-4">{feedback}</p>
      </form>
    </div>
  );
};
export default CustomerForm;
