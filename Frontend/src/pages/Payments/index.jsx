import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import Pagination from '../../components/Pagination';
import { deletePaymentRequest, getPaymentsRequest } from '../../store/payments/actions';
import { settingsData } from '../../data/dummy';
import { BiListMinus, BiListPlus } from 'react-icons/bi';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

const Payments = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payments, pageCount, currentPage, totalCount } = useSelector(state => state.payments);
  const { currentColor } = useStateContext();
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const { user } = useSelector(state => state.auth);
  const [payload, setPayload] = useState({
    search: '',
    date: '',
    page: 0,
  });

  useEffect(() => {
    if (user?.role < 4) {
      dispatch(getPaymentsRequest(payload));
    }
  }, [payload, dispatch, user.role]);

  const onPageChange = (page) => {
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  const handleDeletePayment = () => {
    dispatch(deletePaymentRequest(selectedPaymentId));
    setConfirmModal(false);
  }


  if (user?.role > 1) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
              {totalCount && <b>{totalCount}</b>} {t("payments_value")}
        </p>
        <div className="flex items-center">
          
          <BiListPlus className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/crm/payments/add")} />
        </div>
      </div>
      
      <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className={`hidden sm:table-cell px-2 sm:px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left' }`}>{t("o_ref")}</th>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm'>{t("avatar")}</th>
              <th className={`px-2 sm:px-4 py-3 text-sm ${i18n.language === 'ar' ? 'text-right' : 'text-left' }`}>{t("customer")}</th>
              <th className='px-2 sm:px-4 py-3 text-sm text-center'>{t("date")}</th>
              <th className='px-2 sm:px-4 py-3 text-sm text-right'>{t("amount")}</th>
              <th className='px-4 py-3 text-sm text-center'>{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {payments?.map(payment => (
              <tr key={payment._id}>
                <td className={`hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-2 dark:text-slate-100 ${i18n.language === 'ar' ? 'text-right' : 'text-left' }`}>{payment.order?.ref}</td>
                <td className='hidden sm:table-cell border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-2'>
                  <img src={payment.customer?.avatar || "/images/user.png"} alt="Avatar" className='block mx-auto w-12 h-12 rounded-full border-2 border-slate-200 object-cover'/>
                </td>
                <td className='text-xs sm:text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-2 dark:text-slate-100'>{payment.customer?.name}</td>
                <td className='text-xs sm:text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-2 dark:text-slate-100 text-center'>{payment.date}</td>
                <td className='text-xs sm:text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-2 dark:text-slate-100 text-right relative'><b>{parseFloat(payment.amount)?.toFixed(2)}</b> {t(settingsData.organization_currency)} 
                
                </td>
                <td className='border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-slate-100 flex h-full justify-center items-center'>
                { user?.role === 1 && <AiOutlineEdit className="mx-1 my-3 text-2xl text-green-500 hover:text-green-800 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/crm/payments/edit/${payment._id}`);
                                  }} />}
                 {user?.role === 1 &&  <AiOutlineDelete className="mx-1 my-5 text-2xl text-red-500 hover:text-red-800 cursor-pointer"
                                  onClick={(e) => {
                                    setSelectedPaymentId(payment._id);
                                    setConfirmModal(true);
                                  }} /> }
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
      <div className={`noprint flex justify-center items-center w-screen h-screen fixed top-0 left-0 transition-all bg-black bg-opacity-25 ${confirmModal ? 'opacity-100 pointer-events-auto	' : 'opacity-0 pointer-events-none'}`}>
        <div className="w-400 p-8 bg-white shadow-lg rounded-md">
          <p className='text-lg text-bold mb-6'>Confirm Delete?</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              {t("cancel")}
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeletePayment()}>
              {t("delete")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payments;
