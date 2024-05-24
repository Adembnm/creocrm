import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
//import { getUsersStatisticsRequest } from '../../store/users/actions';
import { getCustomerStatisticsRequest } from '../../store/customers/actions';
//import Pie from '../Charts/Pie';
import {
  getCustomerStatus,
  getOrderStatus,
  settingsData,
} from '../../data/dummy';
import { getOrdersStatisticsRequest } from '../../store/orders/actions';
import BarChart from '../../components/BarChart';
import moment from 'moment';
import LineChart from '../../components/Charts/LineChart';
import UnpaidCustomers from '../../components/UnpaidCustomers';
import NextAppointment from '../../components/NextAppointment';
import { useTranslation } from 'react-i18next';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getUsersStatisticsRequest } from '../../store/users/actions';


const Home = () => {
  const { currentColor } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useSelector((state) => state.auth);
  const { usersStatistics } = useSelector(state => state.users);
  const { customersStatistics } = useSelector((state) => state.customers);
  const { ordersStatistics } = useSelector((state) => state.orders);
  //const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    if (user?.role < 3) {
      dispatch(getUsersStatisticsRequest());
      dispatch(getCustomerStatisticsRequest());
      dispatch(getOrdersStatisticsRequest());
    }
  }, [dispatch, user?.role]);

  /* useEffect(() => {
    if (customersStatistics) {
      setPieChartData([
        {
          x: 'Pending',
          y: customersStatistics.pending,
          text: `${parseInt(customersStatistics.pending / customersStatistics.total * 100)}%`,
          color: getCustomerStatus.find(stat => stat.id === 1).color,
        },
        {
          x: 'Prospect',
          y: customersStatistics.prospect,
          text: `${parseInt(customersStatistics.prospect / customersStatistics.total * 100)}%`,
          color: getCustomerStatus.find(stat => stat.id === 2).color,
        },
        {
          x: 'Actif',
          y: customersStatistics.actif,
          text: `${parseInt(customersStatistics.actif / customersStatistics.total * 100)}%`,
          color: getCustomerStatus.find(stat => stat.id === 3).color,
        },
        {
          x: 'Suspended',
          y: customersStatistics.suspended,
          text: `${parseInt(customersStatistics.suspended / customersStatistics.total) * 100}%`,
          color: getCustomerStatus.find(stat => stat.id === 4).color,
        },
        {
          x: 'Expired',
          y: customersStatistics.expired,
          text: `${parseInt(customersStatistics.expired / customersStatistics.total) * 100}%`,
          color: getCustomerStatus.find(stat => stat.id === 5).color,
        },
      ]);
    }
  }, [customersStatistics]); */

  return (
    <div className="m-2 md:m-6 p-2 md:p-4">
      <div className="w-full flex flex-col sm:flex-row mt-20 sm:mt-0">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <div
            className={`${
              settingsData.company_type === 'Services'
                ? 'h-36 2xl:h-48'
                : 'h-40 2xl:h-52'
            } relative cursor-pointer mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600`}
            onClick={() => navigate('/crm/customers')}
          >
            <span
              className="block text-3xl font-bold mb-2"
              style={{ color: currentColor }}
            >
              {t('customers')}&nbsp;:&nbsp;{customersStatistics?.total || 0}
            </span>
            <div className="flex items-end">
              <div className="w-4/5">                                             
              </div>
              <div className="w-1/5">
                <img
                  className="w-full h-auto"
                  src="/images/customers.png"
                  alt="Customers"
                />
              </div>
              <MdAddCircleOutline
                className={`absolute top-2 ${
                  i18n.language === 'ar' ? 'left-2' : 'right-2'
                } transition-all duration-700 hover:scale-100 text-3xl`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/crm/customers/add');
                }}
              />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <div
            className={`${
              settingsData.company_type === 'Services'
                ? 'h-36 2xl:h-48'
                : 'h-40 2xl:h-52'
            } relative cursor-pointer mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600`}
            onClick={() => navigate('/crm/orders')}
          >
            <span
              className="block text-3xl font-bold mb-2"
              style={{ color: currentColor }}
            >
              {t('orders')}&nbsp;:&nbsp;{ordersStatistics?.total || 0}
            </span>
            <div className="flex items-end">
              <div className="w-4/5">
              
                
                
              </div>
              <div className="w-1/5">
                <img
                  className="w-full h-auto"
                  src="/images/shopping.png"
                  alt="shopping"
                />
              </div>
              <MdAddCircleOutline
                className={`absolute top-2 ${
                  i18n.language === 'ar' ? 'left-2' : 'right-2'
                } transition-all duration-700 hover:scale-100 text-3xl`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/crm/orders/add');
                }}
              />
            </div>
          </div>
          
        </div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <div
            className={`${
              settingsData.company_type === 'Products'
                ? 'h-36 2xl:h-48'
                : 'h-40 2xl:h-52'
            } cursor-pointer mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600`}
            onClick={() => navigate('/crm/payments')}
          >
            <div className="flex justify-end items-center mb-4">
              <span className="block text-sm mx-2 font-bold">
                {moment().format('MMMM, YYYY')}
              </span>
              <img
                src="/images/calendar.png"
                alt="payment"
                className="w-5 h-5 mr-"
              />
            </div>
            <div className="flex items-center mb-2">
              <img
                src="/images/paid.png"
                alt="payment"
                className="w-6 h-6 mx-2"
              />
              <span className="block text-xs">
                {moment().format('MMMM')}&nbsp;{t('payments')}:&nbsp;
                <b className="text-lg">
                  {ordersStatistics?.totalMonthPayments?.toFixed(2) || 0}
                </b>{' '}
                {settingsData.organization_currency}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <img
                src="/images/no-money.png"
                alt="payment"
                className="w-6 h-6 mx-2"
              />
              <span className="block text-xs">
                {t('total_unpaid')}:&nbsp;
                <b className="text-lg text-red-400">
                  {ordersStatistics?.totalUnpaidAmount?.toFixed(2) || 0}
                </b>{' '}
                {settingsData.organization_currency}
              </span>
            </div>
          </div>
        </div>
      </div>

        
        
      

      <div className="mt-4 w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <div className="home-block mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-920 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600">
            <LineChart ordersStatistics={ordersStatistics} />
          </div>
        </div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <div className="home-block mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600">
            <h3 className="mb-4 font-bold">{t('next_appointment')}</h3>
            <NextAppointment />
          </div>
        </div>
      </div>

      <div className="mt-4 w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0"></div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0"></div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0"></div>
      </div>

      <div className="mt-4 w-full flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
          <div className="home-block mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600">
          <BarChart data={ordersStatistics?.payments} />
          </div>
        </div>
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
          <div className="home-block mx-4 py-6 px-4 rounded-sm shadow-md transition-all duration-800 bg-slate-100 hover:bg-slate-200 dark:bg-slate-500 dark:hover:bg-slate-600">
            <h3 className="mb-4 font-bold">{t('unpaid_customers')}</h3>
            <UnpaidCustomers />
          </div>
        </div>
      </div>

       
    </div> 
  );
};

export default Home;