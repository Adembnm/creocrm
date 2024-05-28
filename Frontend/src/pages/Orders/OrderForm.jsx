import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { settingsData } from '../../data/dummy';
import {
  createOrderRequest,
  getListCustomersRequest,
  getOrderRequest,
  updateOrderRequest,
} from '../../store/orders/actions';
import * as moment from 'moment';

import { Autocomplete } from '@mui/material';
//import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { getServicesRequest } from '../../store/services/actions';

import { useTranslation } from 'react-i18next';

const OrderForm = (props) => {
  const today = new Date().toISOString().substring(0, 10);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { order, listCustomers } = useSelector((state) => state.orders);
  const { services } = useSelector((state) => state.services);
  //const { products } = useSelector(state => state.products);
  const [productList, setProductList] = useState([]);
  const [customer, setCustomer] = useState(null);
  const { currentColor } = useStateContext();
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    date: today,
    customer: '',
    status: 2,
    tax: true,
    discount: 0,
    total: 0,
    totalHT: 0,
    totalTax: 0,
    totalTTC: 0,
    items: [
      {
        inputValue: '',
        serviceId: null,
        productId: null,
        name: '',
        quantity: 1,
        discount: 0,
        price: 0,
        total: 0,
        tax: 0,
        totalTax: 0,
        totalTTC: 0,
      },
    ],
  });

  useEffect(() => {
    if (location) {
      setCustomer(location?.search?.split('=')[1]?.toString());
    }
  }, [location]);

  const clearForm = () => {
    setFormData({
      id: null,
      date: today,
      customer: '',
      status: 2,
      tax: true,
      discount: 0,
      total: 0,
      totalHT: 0,
      totalTax: 0,
      totalTTC: 0,
      items: [
        {
          inputValue: '',
          serviceId: null,
          productId: null,
          name: '',
          quantity: 1,
          discount: 0,
          price: 0,
          total: 0,
          tax: 0,
          totalTax: 0,
          totalTTC: 0,
        },
      ],
      projectName: '',
      projectDeadline: '',
      projectNotes: '',
      rejectionReason: '',
      payment: false,
      paymentDate: today,
      paymentAmount: 0,
      paymentNotes: '',
    });
  };

  useEffect(() => {
    dispatch(getListCustomersRequest());
    if (settingsData.company_type === 'Services') {
      dispatch(getServicesRequest());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (settingsData.company_type === 'Services' && services.length > 0) {
      setProductList(services);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  useEffect(() => {
    if (formData.items) {
      let totalHT = 0;
      let totalTax = 0;
      if (settingsData.discount_details) {
        totalHT = formData.items.reduce((acc, curr) => acc + curr.total, 0);
        totalTax = formData.items.reduce((acc, curr) => acc + curr.totalTax, 0);
      } else {
        totalHT = formData.items.reduce(
          (acc, curr) =>
            acc + (curr.total - (formData.discount * curr.price) / 100),
          0
        );
        totalTax = formData.items.reduce(
          (acc, curr) =>
            acc +
            ((curr.tax *
              (curr.price - (formData.discount * curr.price) / 100)) /
              100) *
              curr.quantity,
          0
        );
      }

      const totalTTC = totalHT + totalTax;
      const total = formData.tax ? totalTTC : totalHT;
      setFormData({ ...formData, total, totalHT, totalTax, totalTTC });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.items, formData.discount, formData.tax]);

  useEffect(() => {
    if (id) {
      dispatch(getOrderRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (order && id && listCustomers?.length) {
      setFormData({
        id: order._id,
        date: order.date,
        customer: listCustomers?.find(
          (customer) => customer._id === order.customer?._id
        ),
        status: order.status,
        tax: order.tax,
        discount: order.discount,
        total: order.total,
        totalHT: order.totalHT,
        totalTax: order.totalTax,
        totalTTC: order.totalTTC,
        items: order.items?.map((item) => ({
          ...item,
          inputValue: item.name,
        })),

        payment: false,
        paymentDate: '',
        paymentAmount: 0,
        paymentNotes: '',
      });
    } else {
      clearForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, id, listCustomers]);

  useEffect(() => {
    if (listCustomers && customer && customer !== '') {
      setFormData({
        ...formData,
        customer: listCustomers?.find((cus) => cus._id === customer)?._id,
      });
      setInputValue(listCustomers?.find((cus) => cus._id === customer)?.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, listCustomers]);

  const validation = () => {
    let isValid = true;
    if (formData.customer && formData.date) {
      const customer = listCustomers.filter(
        (customer) => customer._id === formData.customer
      );
      const condition =
        moment(moment(formData.date)).diff(customer[0].birthDay, 'years') < 20;

      if (condition) {
        setFeedback('Customer should be older then 20');
        isValid = false;
      }
    }
    //Payment Validation
    if (formData.payment) {
      if (formData.paymentDate.length === 0) {
        setFeedback('Please enter a payment date');
        isValid = false;
      }
      if (formData.paymentAmount.length === 0) {
        setFeedback('Please enter a payment amount');
        isValid = false;
      }
      if (formData.paymentAmount > formData.total) {
        setFeedback('Payment amount cannot be greater than total');
        isValid = false;
      }
    }
    //Items Validation
    if (
      formData.items.length === 0 ||
      formData.items[0].inputValue.length === 0
    ) {
      setFeedback('Please enter at least one item');
      isValid = false;
    }

    // Customer Validation
    if (formData.customer.length === 0) {
      setFeedback('Please enter a customer');
      isValid = false;
    }
    //Date Validation
    if (formData.date.length === 0) {
      setFeedback('Please enter a date');
      isValid = false;
    }
    //Status Validation
    if (formData.status < 1) {
      setFeedback('Order cannot be created in this status');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateOrderRequest(formData, navigate));
    } else {
      if (validation()) {
        dispatch(createOrderRequest(formData, navigate));
      }
    }
  };

  if (user?.role > 1) {
    return <NotAuthorized />;
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form className="relative w-full mx-auto py-6 px-4 sm:px-6 mt-20 sm:mt-0">
        <MdOutlineAddShoppingCart className="absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl" />
        <h3
          className="mb-20 mx-auto px-2 sm:px-4 text-center text-3xl font-bold dark:text-white text-slate-600"
          style={{ color: currentColor }}
        >
          {id ? t('edit') : t('add')} {t('order')}
        </h3>
        <div className="block w-full">
          <div className="flex flex-col sm:flex-row w-full mb-4">
            <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
              <label
                htmlFor="date"
                className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
              >
                {t('date')} <span className="text-red-600 ml-2">*</span>
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
            <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
              <label
                htmlFor="customer"
                className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
              >
                {t('customer')} <span className="text-red-600 ml-2">*</span>
              </label>
              <Autocomplete
                id="customer-auto"
                value={formData.customer}
                onChange={(event, newValue) => {
                  setFormData({ ...formData, customer: newValue._id });
                  setFeedback('');
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={listCustomers}
                sx={{ width: '100%' }}
                isOptionEqualToValue={(option) =>
                  option._id === formData.customer
                }
                getOptionLabel={(option) => option.name || inputValue}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      id="customer"
                      name="customer"
                      placeholder={t('search_customer')}
                      className="w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none"
                      {...params.inputProps}
                    />
                  </div>
                )}
              />
            </div>
          </div>

          <h4
            className="mt-3 mb-4 px-2 text-xl font-bold dark:text-white text-slate-600"
            style={{ color: currentColor }}
          >
            {t('items')}
          </h4>
          <div>
            {formData.items?.map((item, itemIndex) => (
              <div
                key={`${item.name}-${itemIndex}`}
                className="py-3 flex flex-col sm:flex-row items-start sm:items-center flex-nowrap w-full mb-0 border-b-2 border-slate-100"
              >
                <div
                  className={`w-full ${
                    settingsData.discount_details ? 'sm:w-4/12' : 'sm:w-6/12'
                  } px-2`}
                >
                  {itemIndex === 0 && (
                    <label
                      htmlFor="product"
                      className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                    >
                      {settingsData.company_type === 'Services'
                        ? t('service_name')
                        : t('product_name')}{' '}
                      <span className="text-red-600 ml-2">*</span>
                    </label>
                  )}
                  <Autocomplete
                    id={`product-auto-${itemIndex}`}
                    value={
                      settingsData.company_type === 'Services'
                        ? formData.items[itemIndex].serviceId
                        : formData.items[itemIndex].productId
                    }
                    onChange={(event, newValue) => {
                      setFormData({
                        ...formData,
                        items: formData.items.map((data, index) => {
                          if (index === itemIndex) {
                            return {
                              ...data,
                              inputValue: newValue.name,
                              serviceId:
                                settingsData.company_type === 'Services'
                                  ? newValue._id
                                  : null,

                              name: newValue.name,
                              price: newValue.price,
                              quantity: 1,
                              discount: 0,
                              total: newValue.price,
                              tax: newValue.tax,
                              totalTax: newValue.price * (newValue.tax / 100),
                              totalTTC:
                                newValue.price +
                                newValue.price * (newValue.tax / 100),
                            };
                          }
                          return formData.items[index];
                        }),
                      });
                      setFeedback('');
                    }}
                    sx={{ width: '100%' }}
                    options={productList}
                    groupBy={(option) => option.category}
                    isOptionEqualToValue={(option) =>
                      option._id === formData.items[itemIndex].serviceId
                    }
                    getOptionLabel={(option) =>
                      option.name || formData.items[itemIndex].inputValue
                    }
                    inputValue={formData.items[itemIndex].inputValue}
                    onInputChange={(event, newInputValue) => {
                      setFormData({
                        ...formData,
                        items: formData.items.map((data, index) => {
                          if (index === itemIndex) {
                            return { ...data, inputValue: newInputValue };
                          }
                          return data;
                        }),
                      });
                    }}
                    renderInput={(params) => (
                      <div ref={params.InputProps.ref}>
                        <input
                          type="text"
                          id="product"
                          name="product-auto"
                          placeholder={
                            settingsData.commerce_type === 'Services'
                              ? t('search_service')
                              : t('search_product')
                          }
                          className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
                          {...params.inputProps}
                        />
                      </div>
                    )}
                  />
                </div>
                <div className="flex justify-start flex-wrap sm:flex-nowrap w-full sm:w-8/12 mt-4 sm:mt-0">
                  <div
                    className={`relative w-1/2 ${
                      settingsData.discount_details ? 'sm:w-1/5' : 'sm:w-2/6'
                    } px-2 mb-3 sm:mb-0`}
                  >
                    {itemIndex === 0 && (
                      <label
                        htmlFor="quantity"
                        className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                      >
                        {t('quantity')}
                      </label>
                    )}
                    <input
                      id="quantity"
                      name="quantity"
                      type="number"
                      required
                      className={`w-full py-3 px-4 bg-slate-100 focus:outline-none ${
                        i18n.language === 'ar' ? 'pl-10' : 'pr-10'
                      }`}
                      value={formData.items[itemIndex].quantity}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          items: formData.items.map((data, index) => {
                            if (index === itemIndex) {
                              return {
                                ...data,
                                quantity: event.target.value,
                                total:
                                  event.target.value * data.price -
                                  (data.discount / 100) *
                                    event.target.value *
                                    data.price,
                                totalTax:
                                  event.target.value *
                                    data.price *
                                    (data.tax / 100) -
                                  ((event.target.value *
                                    data.price *
                                    data.discount) /
                                    100) *
                                    (data.tax / 100),
                                totalTTC:
                                  event.target.value * data.price +
                                  event.target.value *
                                    data.price *
                                    (data.tax / 100) -
                                  ((event.target.value *
                                    data.price *
                                    data.discount) /
                                    100) *
                                    (data.tax / 100),
                              };
                            }
                            return data;
                          }),
                        })
                      }
                    />
                    <span
                      className={`absolute bottom-4 ${
                        i18n.language === 'ar' ? 'left-4' : 'right-4'
                      } text-xs font-bold`}
                    >
                      {settingsData.commerce_type === 'Services'
                        ? t(
                            services?.find(
                              (service) =>
                                service._id ===
                                formData.items[itemIndex].serviceId
                            )?.unit
                          )
                        : null}
                    </span>
                  </div>
                  <div
                    className={`relative w-1/2 ${
                      settingsData.discount_details ? 'sm:w-1/5' : 'sm:w-2/6'
                    } px-2 mb-3 sm:mb-0`}
                  >
                    {itemIndex === 0 && (
                      <label
                        htmlFor="price"
                        className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                      >
                        {t('price')}
                      </label>
                    )}
                    <input
                      id="price"
                      name="price"
                      type="number"
                      step="0.1"
                      required
                      className={`w-full py-3 px-4 bg-slate-100 focus:outline-none ${
                        i18n.language === 'ar' ? 'pl-8' : 'pr-8'
                      }`}
                      value={formData.items[itemIndex].price}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          items: formData.items.map((data, index) => {
                            if (index === itemIndex) {
                              return {
                                ...data,
                                price: event.target.value,
                                total:
                                  event.target.value * data.quantity -
                                  (data.discount / 100) *
                                    event.target.value *
                                    data.quantity,
                                totalTax:
                                  event.target.value *
                                    data.quantity *
                                    (data.tax / 100) -
                                  ((event.target.value *
                                    data.quantity *
                                    data.discount) /
                                    100) *
                                    (data.tax / 100),
                                totalTTC:
                                  event.target.value * data.quantity +
                                  event.target.value *
                                    data.quantity *
                                    (data.tax / 100) -
                                  ((event.target.value *
                                    data.quantity *
                                    data.discount) /
                                    100) *
                                    (data.tax / 100),
                              };
                            }
                            return data;
                          }),
                        })
                      }
                    />
                    <span
                      className={`absolute bottom-4 ${
                        i18n.language === 'ar' ? 'left-4' : 'right-4'
                      } text-xs font-bold`}
                    >
                      {t(settingsData.organization_currency)}
                    </span>
                  </div>
                  {settingsData.discount_details && (
                    <div className="relative w-1/3 sm:w-1/5 px-2">
                      {itemIndex === 0 && (
                        <label
                          htmlFor="discount"
                          className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                        >
                          {t('discount')}
                        </label>
                      )}
                      <input
                        id="discount"
                        name="discount"
                        type="number"
                        required
                        min={0}
                        max={100}
                        className={`w-full py-3 px-4 bg-slate-100 focus:outline-none ${
                          i18n.language === 'ar' ? 'pr-6' : 'pl-6'
                        }`}
                        value={formData.items[itemIndex].discount}
                        onChange={(event) =>
                          setFormData({
                            ...formData,
                            items: formData.items.map((data, index) => {
                              if (index === itemIndex) {
                                return {
                                  ...data,
                                  discount: event.target.value,
                                  total:
                                    data.price * data.quantity -
                                    (event.target.value / 100) *
                                      data.price *
                                      data.quantity,
                                  totalTax:
                                    data.price *
                                      data.quantity *
                                      (data.tax / 100) -
                                    ((data.price *
                                      data.quantity *
                                      event.target.value) /
                                      100) *
                                      (data.tax / 100),
                                  totalTTC:
                                    data.price * data.quantity +
                                    data.price *
                                      data.quantity *
                                      (data.tax / 100) -
                                    ((data.price *
                                      data.quantity *
                                      event.target.value) /
                                      100) *
                                      (data.tax / 100),
                                };
                              }
                              return data;
                            }),
                          })
                        }
                      />
                      <span className="absolute bottom-4 right-4 text-xs font-bold">
                        %
                      </span>
                    </div>
                  )}
                  <div className="w-1/3 sm:w-1/5 px-2">
                    {itemIndex === 0 && (
                      <label
                        htmlFor="total"
                        className="block text-sm text-center dark:text-gray-200 text-gray-600 mb-2"
                      >
                        {t('total')}
                      </label>
                    )}
                    <div className="flex items-start">
                      <span className="block w-2/3 py-3 px-2 text-center font-bold transition-all duration-800 dark:text-slate-100">
                        {formData.items[itemIndex].total}
                      </span>
                      <span className="w-1/3 text-xs font-bold pt-4">
                        {t(settingsData.organization_currency)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          <div className="w-1/2 p-4">
            <div className="flex mb-2">
              {!settingsData.discount_details && (
                <div className="relative w-1/2 px-2">
                  <label
                    htmlFor="discount"
                    className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                  >
                    {t('discount')}
                  </label>
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    required
                    min={0}
                    max={100}
                    className={`w-11/12 py-3 px-4 bg-slate-100 focus:outline-none ${
                      i18n.language === 'ar' ? 'pr-6' : 'pl-6'
                    }`}
                    value={formData.discount}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        discount: event.target.value,
                      })
                    }
                  />
                  <span className="absolute bottom-4 right-4 text-xs font-bold">
                    %
                  </span>
                </div>
              )}
              <div
                className={`w-1/2 px-2 ${
                  !settingsData.discount_details && 'pt-9'
                }`}
              >
                <label
                  htmlFor="tax"
                  className="cursor-pointer flex items-center text-md dark:text-gray-200 text-gray-600"
                >
                  <input
                    id="tax"
                    name="tax"
                    type="checkbox"
                    required
                    className={i18n.language === 'ar' ? 'ml-4' : 'mr-4'}
                    checked={formData.tax}
                    onChange={(event) =>
                      setFormData({ ...formData, tax: event.target.checked })
                    }
                  />
                  <b className="whitespace-nowrap	text-xs sm:text-xl">
                    {t('tax')}
                  </b>
                </label>
              </div>
            </div>
            {/* !id && <div>
                    <label htmlFor="payment" className="cursor-pointer flex items-center text-md dark:text-gray-200 text-gray-600">
                    <input id="payment"
                            name="payment"
                            type="checkbox"
                            required
                            className='mr-4'
                            checked={formData.payment}
                            onChange={(event) => setFormData({ ...formData, payment: event.target.checked })}
                    />
                    <b className='text-xs sm:text-xl'>Add Payment</b></label>
              </div> */}
          </div>
          <div className="w-1/2 p-4 h-24 sm:h-20 flex flex-col items-end">
            <span className="block text-md text-right mb-1 whitespace-nowrap dark:text-slate-100">
              {t('subtotal')} : <b>{formData.totalHT?.toFixed(0)}</b>{' '}
              {t(settingsData.organization_currency)}
            </span>
            {formData.tax && (
              <span className="block text-md text-right mb-1 whitespace-nowrap dark:text-slate-100">
                {t(settingsData.tax_name)} :{' '}
                <b>{formData.totalTax?.toFixed(2)}</b>{' '}
                {t(settingsData.organization_currency)}
              </span>
            )}
            {formData.tax && (
              <span className="block text-md text-right mb-1 whitespace-nowrap dark:text-slate-100">
                {t('total')} : <b>{formData.totalTTC?.toFixed(2)}</b>{' '}
                {t(settingsData.organization_currency)}
              </span>
            )}
          </div>
        </div>
        {formData.payment && (
          <div className="w-full flex flex-col sm:flex-row justify-between items-start mt-4 mb-2">
            <div className="w-full sm:w-1/2 flex justify-between items-start">
              <div className="w-1/2 p-2">
                <label
                  htmlFor="paymentDate"
                  className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                >
                  Payment Date <span className="text-red-600 ml-2">*</span>
                </label>
                <input
                  id="paymentDate"
                  name="paymentDate"
                  type="date"
                  required
                  className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
                  value={formData.paymentDate}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      paymentDate: event.target.value,
                    })
                  }
                />
              </div>
              <div className="w-1/2 p-2">
                <label
                  htmlFor="paymentAmount"
                  className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
                >
                  Payment Amount <span className="text-red-600 ml-2">*</span>
                </label>
                <input
                  id="paymentAmount"
                  name="paymentAmount"
                  type="number"
                  step="0.1"
                  required
                  className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
                  value={formData.paymentAmount}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      paymentAmount: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-2">
              <label
                htmlFor="paymentNotes"
                className="block text-sm dark:text-gray-200 text-gray-600 mb-2"
              >
                Payment Notes
              </label>
              <textarea
                id="paymentNotes"
                name="paymentNotes"
                className="w-full py-3 px-4 bg-slate-100 focus:outline-none"
                value={formData.paymentNotes}
                onChange={(event) =>
                  setFormData({ ...formData, paymentNotes: event.target.value })
                }
              ></textarea>
            </div>
          </div>
        )}
        <div className="mt-10 mb-4 flex justify-center items-center">
          <button
            className="w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none"
            style={{ backgroundColor: currentColor }}
            type="submit"
            onClick={(e) => handleSubmit(e)}
          >
            {id ? t('edit') : t('add')} {t('order')}
          </button>
          <button
            className="w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none"
            style={{ borderColor: currentColor, color: currentColor }}
            onClick={(e) => {
              e.preventDefault();
              navigate('/crm/orders');
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
export default OrderForm;
