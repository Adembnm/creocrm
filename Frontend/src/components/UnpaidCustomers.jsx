import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { settingsData } from '../data/dummy';
import { getUnpaidCustomersListRequest } from '../store/customers/actions';

function UnpaidCustomers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { unpaidCustomers } = useSelector(state => state.customers);

    useEffect(() => {
      dispatch(getUnpaidCustomersListRequest());
    } , [dispatch]);
        
    return (
        <div className='w-full h-72 overflow-y-auto'>
            {unpaidCustomers?.map((item, index) => (
                <div key={index} 
                    onClick={() => navigate("/crm/payments")}
                    className='flex justify-between items-center border-b-1 border-slate-200 hover:bg-slate-300 px-2 py-3 cursor-pointer '>
                    <div className='w-1/3 p-2'>
                        <img className='border-2 border-red-200 rounded-full h-16 w-16' src={item.avatar || "/images/user.png"} alt='user-profile' />
                    </div>
                    <div className='w-2/3'>
                        <p className='font-semibold text-sm dark:text-gray-200'>{item.name}</p>
                        <p className='text-gray-500 text-sm dark:text-gray-400'>{item.phone}</p>
                        <p className='text-red-400 text-md font-bold dark:text-red-500'>{item.unpaid.toFixed(3)} {settingsData.organization_currency}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UnpaidCustomers