import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { deleteUserRequest, getUsersRequest } from '../../store/users/actions';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import Pagination from '../../components/Pagination';
import { getUserRoles } from '../../data/dummy';

const Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { users, pageCount, currentPage, totalCount } = useSelector(state => state.users);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { currentColor } = useStateContext();
  const { user } = useSelector(state => state.auth);
  const [payload, setPayload] = useState({
    search: '',
    page: 0,
    role: 0,
  });

  useEffect(() => {
    if (user?.role < 3) {
      dispatch(getUsersRequest(payload));
    }
  }, [payload, dispatch, user.role]);
    
  const handleDeleteUser = () => {
    dispatch(deleteUserRequest(selectedUserId));
    setConfirmModal(false);
  }

  const onPageChange = (page) => {
    if (page.selected !== (currentPage + 1)) {
      setPayload({ ...payload, page: page.selected });
    }
  }

  if (user?.role > 2) {
    return <NotAuthorized />
  }

  return (
    <div className="m-2 md:m-6 p-2 md:p-6">
      <div className="flex justify-between items-center mt-20 sm:mt-0">
        <p className="text-3xl font-extrabold tracking-tight dark:text-white text-slate-600	" 
            style={{ color: currentColor }}>
              {totalCount && <b>{totalCount}</b>} Users
        </p>
        <AiOutlineUserAdd className="text-3xl	cursor-cell"
                          style={{ color: currentColor }}
                          onClick={() => navigate("/users/add")} />
      </div>
      <div className='w-full flex justify-end items-center py-4'>
        <select className="ml-4 w-1/4 px-2 sm:px-4 py-3 bg-gray-100 focus:outline-none" value={payload.role} onChange={(e) => setPayload({ ...payload, role: e.target.value })}>
          <option value="">All Roles</option>
          {getUserRoles.map(role => (
            <option key={role.id} value={role.id}>{role.name}</option>
          ))}
        </select>
      </div>
      <div className='table_container'>
        <table className='w-full rounded-md table-auto'>
          <thead className='border border-gray-100 bg-gray-100'>
            <tr>
              <th className='px-2 sm:px-4 py-3 text-sm text-center'>Avatar</th>
              <th className='px-2 sm:px-4 py-3 text-sm text-left'>Name</th>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-left'>Phone</th>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-left'>Email</th>
              <th className='hidden sm:table-cell px-2 sm:px-4 py-3 text-sm text-left'>Role</th>
              <th className='px-2 sm:px-4 py-3 text-sm text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <tr key={user._id} style={user?.is_actif ? { backgroundColor: "transparent" } : { backgroundColor: "rgba(88, 169, 169, 0.6)" }}>
                <td className='border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1'>
                  <img src={user.avatar || '/images/user.png'} alt="Avatar" className='block mx-auto w-12 h-12 rounded-full border-2 border-slate-200 object-cover'/>
                </td>
                <td className='text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-white'>{user.name}</td>
                <td className='hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-white'>{user.phone}</td>
                <td className='hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-white'>{user.email}</td>
                <td className='hidden sm:table-cell text-sm border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 dark:text-white'>{getUserRoles?.find(item => item.id === user?.role)?.name}</td>
                <td className='border border-gray-100 dark:border-gray-500 px-2 sm:px-4 py-1 flex h-full'>
                  <AiOutlineEdit className="mx-1 my-4 text-2xl text-green-500 hover:text-green-800 cursor-pointer"
                                  onClick={() => {
                                    navigate(`/users/edit/${user._id}`);
                                  }} />
                  <AiOutlineDelete className="mx-1 my-4 text-2xl text-red-500 hover:text-red-800 cursor-pointer"
                                  onClick={() => {
                                    setSelectedUserId(user._id);
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
          <p className='text-lg text-bold mb-6'>Confirm Delete?</p>
          <div className="flex justify-end">
            <button className="mx-1 bg-transparent border border-blue-500 hover:border-blue-700 text-blue-500 hover:text-blue-700 font-bold py-2 px-6 rounded-md" onClick={() => setConfirmModal(false)}>
              Cancel
            </button>
            <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md" onClick={() => handleDeleteUser()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Users;
