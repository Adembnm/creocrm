import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { GiTakeMyMoney } from 'react-icons/gi';
import { createPaymentRequest, getPaymentRequest,  updatePaymentRequest } from '../../store/payments/actions';
import { getCustomerOrdersRequest, getListCustomersRequest } from '../../store/orders/actions';
import { Autocomplete } from '@mui/material';
import { getPaymentMethods, settingsData } from '../../data/dummy';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const PaymentForm = (props) => {
  const location = useLocation();
  const [mode, setMode] = useState('create');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id }  = useParams();
  const { user } = useSelector(state => state.auth);
  const { listCustomers, customerOrders } = useSelector(state => state.orders);
  const { payment } = useSelector(state => state.payments);
  const { currentColor } = useStateContext();
  const [inputValue, setInputValue] = useState('');
  const [totalUnpaid, setTotalUnpaid] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (location?.pathname?.includes('/payments/refund')) {
      setMode('refund');
    } else if (location?.pathname?.includes('/payments/add')) {
      setMode('create');
    }
  }, [location]);

  const [formData, setFormData] = useState({
    id: null,
    date: moment().format('YYYY-MM-DD'),
    customer: '',
    order: '',
    amount: 0,
    paymentMethod: 0,
    notes: '',
    closeProject: false,
    mode: mode,
  });
  
  const clearForm = () => {
    setFormData({
      id: null,
      date: moment().format('YYYY-MM-DD'),
      customer: '',
      order: '',
      amount: 0,
      paymentMethod: 0,
      notes: '',
      closeProject: false,
    });
  };
  
  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, mode: mode }));
  }, [mode]);
  
  useEffect(() => {
    if (id && id.length > 0) {
      dispatch(getPaymentRequest(id));
    }
  }, [dispatch, id]);
  
  useEffect(() => {
    if (payment && payment.customer !== '') {
      setFormData({
        id: payment._id,
        date: moment(payment.date).format('YYYY-MM-DD'),
        customer: payment.customer,
        order: payment.order,
        amount: payment.amount,
        paymentMethod: payment.paymentMethod,
        notes: payment.notes,
        closeProject: payment.closeProject ?? false,
        mode: payment.mode ?? formData.mode,
      });
      setInputValue(listCustomers.find(customer => customer._id === payment.customer)?.name);
    } else {
      clearForm();
    }
  }, [payment, listCustomers]);
  
  useEffect(() => {
    dispatch(getListCustomersRequest());
  }, [dispatch]);
  
  useEffect(() => {
    if (formData.customer && formData.customer.length > 0) {
      dispatch(getCustomerOrdersRequest(formData.customer));
    }
  }, [formData.customer, dispatch]);
  
  useEffect(() => {
    if (customerOrders && formData.order) {
      setTotalUnpaid(
        customerOrders?.find(order => order._id === formData.order)?.total -
        (customerOrders.find(order => order._id === formData.order)?.paid + formData.amount)
      );
    }
  }, [formData.order, customerOrders, formData.amount]);

  const validation = () => {
    let isValid = true;
    let feedback = '';
  
    const order = customerOrders.find(order => order._id === formData.order);
  
    if (!order) {
      isValid = false;
      feedback = 'Order not found';
    } else if (formData.order.length === 0) {
      isValid = false;
      feedback = 'Please select an order';
    } else if (formData.customer.length === 0) {
      isValid = false;
      feedback = 'Please select a customer';
    } else if (formData.date === '') {
      isValid = false;
      feedback = 'Please select a date';
    } else if (formData.amount < 0) {
      isValid = false;
      feedback = 'The amount is greater than the total ';
    } else if (formData.amount <= 0) {
      isValid = false;
      feedback = 'The amount should be greater than 0 ';
    } else if (parseFloat(order.total) - (parseFloat(order.paid) + parseFloat(formData.amount)) < 0) {
      isValid = false;
      feedback = 'The amount is greater than the total amount';
    }
  
    setFeedback(feedback);
    return isValid;
  };
  
  
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      if (id && id.length > 0) {
        dispatch(updatePaymentRequest(formData, navigate));
      } else {
        if (mode === 'create') {
          dispatch(createPaymentRequest(formData, navigate));
        }
      }
    }
  };

  if (user?.role > 1) {
    return <NotAuthorized />
  }

  //console.log(customerOrders?.find(order => order._id === formData.order)?.total - customerOrders?.find(order => order._id === formData.order)?.paid);
    
  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
          <GiTakeMyMoney className='absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl' /> 
          <h3 className='mb-20 mx-auto text-center text-3xl font-bold dark:text-white text-slate-600' 
              style={{ color: currentColor }}>{mode === "create" ? id ? t('edit') : t('add') : "" } {mode === "create" && t("payment")} </h3>

          <div>
            <div className='flex flex-col sm:flex-row w-full mb-4'>
              <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                <label htmlFor="date" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("date")} <span className='text-red-600 ml-2'>*</span></label>
                <input id="date"
                        name="date"
                        type="date"
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.date}
                        onChange={(event) => setFormData({...formData, date: event.target.value})}
                />
              </div>
              <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                <label label htmlFor="paymentMethod" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t('payment_method')}</label>
                <select id="paymentMethod"
                        name="paymentMethod"
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.paymentMethod}
                        onChange={(event) => {
                          setFormData({...formData, paymentMethod: event.target.value, closeProject: false})
                          setFeedback('')
                        }
                        }
                >
                  <option value=''>{t('select_payment_method')}</option>
                  {getPaymentMethods?.map((method, index) => <option key={index} value={method.id}>{t(method.name)}</option>)}
                </select>
                </div>
              </div>
              <div className='flex flex-col sm:flex-row w-full mb-4'>
                <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <label htmlFor="customer" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("customer")} <span className='text-red-600 ml-2'>*</span></label>
                  <Autocomplete
                      id="customer-auto"
                      value={formData.customer}
                      onChange={(event, newValue) => {
                        setFormData({...formData, customer: newValue._id, closeProject: false});
                        setFeedback('')
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
                                  placeholder={t('search_customer')}
                                  className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                                  {...params.inputProps} 
                                />
                          </div>
                      )}
                    />
                </div>
                <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <label htmlFor="orders" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("order")}<span className='text-red-600 ml-2'>*</span></label>
                    <select id="orders"
                            name="orders"
                            required
                            className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                            value={formData.order}
                            onChange={(event) => {
                              setFormData({...formData, order: event.target.value, closeProject: false})
                              setFeedback('')
                            }}
                    >
                      <option value=''>{t('select_order')}</option>
                      {customerOrders?.map((order, index) => <option key={index} value={order._id}>{order.ref} | {order.project?.name}</option>)}
                    </select>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row w-full mb-4'>
                <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <label htmlFor="notes" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("notes")}</label>
                  <textarea id="notes"
                          name="notes"
                          rows={3}
                          className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                          value={formData.notes}
                          onChange={(event) => setFormData({...formData, notes: event.target.value})}
                  />
                </div>
                <div className='w-full sm:w-1/2 px-4 mb-4 sm:mb-0'>
                  <div className='flex w-full'>
                    <div className='relative w-2/3'>
                      <label htmlFor="amount" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">{t("amount")}<span className='text-red-600 ml-2'>*</span></label>
                      <input id="amount"
                              name="amount"
                              type="number"
                              step="0.01"
                              min={0}
                              disabled={formData.order === ''}
                              required
                              className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                              value={formData.amount}
                              onChange={(event) => {
                                setFormData({...formData, amount: event.target.value, closeProject: false})
                                setFeedback('')
                              }}
                      />
                    </div>
                    <div className='w-1/3 h-full flex items-center px-2 pt-8'>
                      {mode === "create" && formData.order?.length > 0 &&  <label htmlFor="limit" className="text-lg dark:text-gray-200 text-gray-600 font-bold">&nbsp;/&nbsp;  
                        {(customerOrders?.find(order => order._id === formData.order)?.total - customerOrders?.find(order => order._id === formData.order)?.paid)?.toFixed(2)} 
                        {t(settingsData.organization_currency)}</label>}
                    </div>
                  </div>
                  {mode === "create" && formData.amount > 0 && formData.amount - totalUnpaid.toFixed(2) === 0 && 
                    <div className='mt-2 flex w-full justify-center'>
                        <div className="w-full flex justify-start">
                          <label htmlFor="close" className="cursor-pointer flex items-center text-md dark:text-gray-200 text-gray-600">
                          <input id="close"
                                  name="close"
                                  type="checkbox"
                                  required
                                  className='mr-4'
                                  checked={formData.closeProject}
                                  onChange={(event) => setFormData({ ...formData, closeProject: event.target.checked })}
                          />
                          <b className='whitespace-nowrap	text-xs sm:text-xl'>Close Project</b></label>
                        </div>
                    </div>
                  }
                </div>
              </div>
          </div>
          <div className='mt-10 mb-4 flex justify-center items-center'>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none'
                    style={{ backgroundColor: currentColor }}
                    type='submit'
                    onClick={(e) => handleSubmit(e)}>
              {mode === "create" ? id ? t('edit') : t('add') : "" } {mode === "create" && t("payment")} 
            </button>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none'
                    style={{ borderColor: currentColor, color: currentColor }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/crm/payments');
                    }}>
              {t("cancel")}
            </button>
          </div>
          <p className='text-center w-full text-red-400 mt-4'>{feedback}</p>
      </form>
    </div>
  );
};
export default PaymentForm;
