import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import Pagination from '../../components/Pagination';
import { deleteCustomerRequest, getCustomersRequest } from '../../store/customers/actions';
import { getCustomerRatingRange, getCustomerStatus } from '../../data/dummy';
import { useTranslation } from 'react-i18next';

const Customers = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customers, pageCount, currentPage, totalFiltredCustomers } = useSelector(state => state.customers);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { currentColor } = useStateContext();
  const { user } = useSelector(state => state.auth);
  const [payload, setPayload] = useState({
    search: '',
    status: 0,
    page: 0,
  });

  useEffect(() => {
    if (user?.role < 4) {
      dispatch(getCustomersRequest(payload));
    }
  }, [payload, dispatch, user.role]);
    
  const handleDeleteCustomer = () => {
    dispatch(deleteCustomerRequest(selectedCustomerId));
    setConfirmModal(false);
  }

  const onPageChange = (page) => {
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  const customerRating = (paid) => {
    let result = 0;
    if (paid) {
      getCustomerRatingRange.forEach(item => {
        if (paid >= item.min && paid < item.max) {
          result = item.value;
        }
      }
      );
      return result;
    } else {
      return 0;
    }
  }

  if (user?.role > 4) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
              {totalFiltredCustomers && <b>{totalFiltredCustomers}</b>} {totalFiltredCustomers === 0 ? 
                t("customers_value_min") : totalFiltredCustomers === 1 ? t("customers_value") : totalFiltredCustomers > 1 && totalFiltredCustomers < 11 ? t("customers_value_min") : t("customers_value")}
        </p>
        <AiOutlineUserAdd className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/crm/customers/add")} />
      </div>
      <div className='flex justify-end items-center py-4'>
        <input type="text" className="w-1/4 px-4 py-3 bg-gray-100 focus:outline-none" placeholder={t("search_by_customer")} value={payload.search} onChange={(e) => setPayload({ ...payload, search: e.target.value })} />
      </div>
     
      <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm'>{t("avatar")}</th>
              <th className={`px-2 sm:px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left' }`}>{t("name")}</th>
              <th className={`hidden sm:table-cell px-2 sm:px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left' }`}>{t("phone")}</th>
              <th className='px-2 sm:px-4 py-3 text-sm'>{t("City")}</th>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm'>{t("Email")}</th>
              <th className='px-2 sm:px-4 py-3 text-sm'>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map(customer => (
              <tr key={customer._id} className="cursor-pointer transition-all duration-800 hover:bg-slate-400 dark:hover:bg-slate-500">
                <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1'>
                  <img src={customer.avatar || "/images/user.png"} alt="Avatar" className='block mx-auto w-12 h-12 rounded-full border-2 border-slate-200 object-cover'/>
                </td>
                <td className='text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100'>{customer.name}</td>
                <td className={`hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100`} style={{direction: "ltr", textAlign: i18n.language === 'ar' ? "right" : "left"}}>{customer.phone}</td>
                <td className={`hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100`} style={{direction: "ltr", textAlign: i18n.language === 'ar' ? "right" : "left"}}>{customer.city}</td>
                <td className={`hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100`} style={{direction: "ltr", textAlign: i18n.language === 'ar' ? "right" : "left"}}>{customer.email}</td>
                <td className='border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 flex justify-center items-center h-full'>
                  <AiOutlineEdit className="mx-1 my-3 text-2xl text-green-500 hover:text-green-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/crm/customers/edit/${customer?._id}`);
                                  }} />
                  <AiOutlineDelete className="mx-1 my-3 text-2xl text-red-500 hover:text-red-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCustomerId(customer?._id);
                                    setConfirmModal(true);
                                  }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
         pageCount={pageCount}
         onPageChange={(page) => onPageChange(page)}
        />

      <div className={`flex justify-center items-center w-screen h-screen fixed top-0 left-0 transition-all bg-black bg-opacity-25 ${confirmModal ? 'opacity-100 pointer-events-auto	' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-400 p-8 bg-white shadow-lg rounded-md">
          <p className='text-lg text-bold mb-6'>{t('confirm delete customer')}</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              {t("cancel")}
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeleteCustomer()}>
              {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Customers;
