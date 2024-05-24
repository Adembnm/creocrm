import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
//import { VscFilePdf, VscGithubAction } from 'react-icons/vsc';
import { MdAddShoppingCart } from 'react-icons/md';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import Pagination from '../../components/Pagination';
import moment from 'moment';
import {  settingsData } from '../../data/dummy';
import { deleteOrderRequest, getOrdersRequest } from '../../store/orders/actions';
//import { Tooltip } from '@mui/material';
//import OrderAction from '../../components/OrderAction';

import { useTranslation } from 'react-i18next';

const Orders = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, pageCount, currentPage, totalCount } = useSelector(state => state.orders);
  const [confirmModal, setConfirmModal] = useState(false);
  //const [showPrintModal, setShowPrintModal] = useState(false);//
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const { currentColor } = useStateContext();
  const { user } = useSelector(state => state.auth);
  const [actionModal, setActionModal] = useState(false);
  const [printType, setPrintType] = useState(null);
  const [payload, setPayload] = useState({
    search: '',
    status: 0,
    page: 0,
  });

  useEffect(() => {
    if (user?.role < 3) {
      dispatch(getOrdersRequest(payload));
    }
  }, [payload, dispatch, user.role]);
    
  const handleDeleteOrder = () => {
    dispatch(deleteOrderRequest(selectedOrderId));
    setConfirmModal(false);
  }

  const onPageChange = (page) => {
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  if (user?.role > 1) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
              {totalCount && <b>{totalCount}</b>} {totalCount === 0 ? 
                t("orders_value_min") : totalCount === 1 ? t("orders_value") : totalCount > 1 && totalCount < 11 ? t("orders_value_min") : t("orders_value")}
        </p>
        <MdAddShoppingCart className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/crm/orders/add")} />
      </div>
      
      <div className="table_container">
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className={`hidden sm:table-cell px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("ref")}</th>
              <th className='hidden sm:table-cell px-4 py-3 text-sm text-center'>{t("date")}</th>
              <th className={`px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left'}`}>{t("customer")}</th>
              <th className='px-4 py-3 text-sm text-right'>{t("total")}</th>
              
              
            </tr>
          </thead>
          <tbody>
            {orders?.map(order => (
              <tr key={order._id} className="cursor-pointer transition-all duration-800 hover:bg-slate-400 dark:hover:bg-slate-500" >
                <td className='relative hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100'>
                  {settingsData.order_reference_prefix}{order.ref}
                  { parseFloat(order.total) - parseFloat(order.paid) === 0 && <img src='/images/paid.png' alt='paid' className={`w-6 h-6 rounded-full shadow-lg absolute ${i18n.language === 'ar' ? 'left-2' : 'right-2'} top-2`} />}
                  { order.status > 3 && parseFloat(order.total) - parseFloat(order.paid) > 0 && <img src='/images/no-money.png' alt='paid' className={`w-6 h-6 rounded-full shadow-lg absolute ${i18n.language === 'ar' ? 'left-2' : 'right-2'} top-2`} />}
                </td>
                <td className='hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100 text-center'>{moment(order.date).format('DD/MM/YYYY')}</td>
                <td className='border text-sm border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100'>{order.customer?.name}</td>
                <td className='border text-sm border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100 text-right font-bold'>{order.total?.toFixed(2)}&nbsp;{t(settingsData.organization_currency)}</td>
                
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
         pageCount={pageCount}
         onPageChange={(page) => onPageChange(page)}
        />

      

      <div className={`noprint flex justify-center items-center w-screen h-screen fixed top-0 left-0 transition-all bg-black bg-opacity-25 ${confirmModal ? 'opacity-100 pointer-events-auto	' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-400 p-8 bg-white shadow-lg rounded-md">
          <p className='text-lg text-bold mb-6'>{t("confirm_archive_order")}</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              {t("cancel")}
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeleteOrder()}>
              {t('archive')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Orders;