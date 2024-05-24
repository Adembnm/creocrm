import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserRequest, editUserRequest, getUserDataRequest } from '../../store/users/actions';
import { useParams } from 'react-router';
import { useStateContext } from '../../contexts/ContextProvider';
import NotAuthorized from '../../components/NotAuthorized';
import { getUserRoles } from '../../data/dummy';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';

const UserForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { userData } = useSelector(state => state.users);
  const { currentColor } = useStateContext();
  const [feedBack, setFeedBack] = useState('');
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 2,
    avatar: '',
    is_actif: true,
  });

  useEffect(() => {
    if (id) {
      dispatch(getUserDataRequest(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (userData && id) {
      setFormData({
        id: userData._id,
        name: userData.name,
        phone: userData.phone,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        avatar: userData.avatar,
        is_actif: userData.is_actif,
      });
    } else {
      setFormData({
        id: null,
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 2,
        avatar: '',
        is_actif: true,
      });
    }
  }, [userData, id]);

  const validation = () => {
    let isValid = true;
    if (formData.name === '') {
      setFeedBack('Please enter a name');
      isValid = false;
    }
    if (formData.phone === '') {
      setFeedBack('Please enter a phone number');
      isValid = false;
    }
    if (formData.email === '') {
      setFeedBack('Please enter an email');
      isValid = false;
    }
    if (formData.password === '' && !id) {
      setFeedBack('Please enter a password');
      isValid = false;
    }
    return isValid;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validation()) {
      if (id) {
        dispatch(editUserRequest(formData, navigate));
      } else {
        dispatch(addUserRequest(formData, navigate));
      }
    }
  }

  if (user?.role !== 1) {
    return <NotAuthorized />
  }
    
  return (
    <div className="m-2 md:m-6 p-2 md:p-4 dark:bg-main-dark-bg bg-transparent">
      <form  className="relative w-full mx-auto py-6 px-4 sm:px-10 mt-20 sm:mt-0">
        <AiOutlineUsergroupAdd className='absolute left-2 top-2 opacity-10 text-slate-400 dark:text-slate-100 text-6xl sm:text-8xl' /> 
        <h3 className='mb-20 mx-auto text-center text-3xl font-bold dark:text-white text-slate-600' 
              style={{ color: currentColor }}>{id ? 'Edit' : 'Add'} User</h3>
        <div className='flex w-full flex-wrap mb-0 sm:mb-4'>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="name" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">User name<span className='text-red-600 ml-2'>*</span></label>
                <input id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete={false}
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.name}
                        onChange={(event) => setFormData({...formData, name: event.target.value})}
                />
            </div>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="phone" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Phone Number<span className='text-red-600 ml-2'>*</span></label>
                <input id="phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete={false}
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.phone}
                        onChange={(event) => setFormData({...formData, phone: event.target.value})}
                />
            </div>
        </div>
        <div className='flex w-full flex-wrap mb-0 sm:mb-4'>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="email" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Email address<span className='text-red-600 ml-2'>*</span></label>
                <input id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete={false}
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.email}
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                />
            </div>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="password" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Password{!id && <span className='text-red-600 ml-2'>*</span>}</label>
                <input id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete={false}
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.password}
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                />
            </div>
        </div>
        <div className='flex w-full flex-wrap mb-0 sm:mb-4'>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="role" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Role</label>
                <select id="role"
                        name="role"
                        required
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.role}
                        onChange={(event) => setFormData({...formData, role: event.target.value})}
                >
                  {
                    getUserRoles?.map(role => {
                      if (role > 2) {
                        return <option key={role.id} value={role.id}>{role.name}</option>
                      } else {
                        if (user?.role === 1) {
                          return <option key={role.id} value={role.id}>{role.name}</option>
                        } else { 
                          return null 
                        }
                      }
                    })
                  }
                </select>
            </div>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="is_actif" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Is Actif</label>
                <select id="is_actif"
                        name="is_actif"
                        required
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.is_actif}
                        onChange={(event) => setFormData({...formData, is_actif: event.target.value})}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
            </div>
        </div>
        <div className='flex w-full flex-wrap mb-0 sm:mb-4'>
            <div className='w-full sm:w-1/2 px-2 mb-4 sm:mb-0'>
                <label htmlFor="avatar" className="block text-sm dark:text-gray-200 text-gray-600 mb-2">Avatar URL</label>
                <input id="avatar"
                        name="avatar"
                        type="text"
                        className='w-full py-3 px-4 bg-slate-100 focus:outline-none rounded-none'
                        value={formData.avatar}
                        onChange={(event) => setFormData({...formData, avatar: event.target.value})}
                />
            </div>
        </div>
        <div className='mt-10 mb-4 flex justify-center items-center'>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md text-white font-bold focus:outline-none'
                    style={{ backgroundColor: currentColor }}
                    type='submit'
                    onClick={(e) => handleSubmit(e)}>
              {id ? 'Edit' : 'Add' } User
            </button>
            <button className='w-auto sm:w-48 mx-3 py-3 px-4 sm:px-6 text-sm rounded-md bg-white borderfont-bold focus:outline-none'
                    style={{ borderColor: currentColor, color: currentColor }}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/users');
                    }}>
              Cancel
            </button>
          </div>
          <p className='text-center w-full text-red-400 mt-4'>{feedBack}</p>
      </form>
    </div>
  );
};
export default UserForm;
