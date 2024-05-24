import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { Button } from '.';
import { useStateContext } from '../contexts/ContextProvider';
import i18n from '../i18n';

const Language = () => {
  const { setLang, setIsClicked, initialState } = useStateContext();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    setIsClicked(initialState);
  }
 
  return (
    <div className={`nav-item absolute ${i18n.language === 'ar' ? 'left-5 md:left-40' : 'right-5 md:right-40'} top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96`}>
      <div className={`flex justify-between items-center`}>
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Languages</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-5 ">
         <p className={`py-2 border-b-1 border-slate-100 cursor-pointer transition-all duration-700 ${i18n.language === 'en' ? 'text-pink-500' : 'text-slate-700'} hover:text-pink-700 font-bold text-lg`}
            onClick={() => changeLanguage('en')}>
          English
         </p>
         <p className={`py-2 border-b-1 border-slate-100 cursor-pointer transition-all duration-700 ${i18n.language === 'fr' ? 'text-pink-500' : 'text-slate-700'} hover:text-pink-700 font-bold text-lg`}
            onClick={() => changeLanguage('fr')}>
          Français
        </p>
        <p className={`py-2 cursor-pointer transition-all duration-700 ${i18n.language === 'ar' ? 'text-pink-500' : 'text-slate-700'} hover:text-pink-700 font-bold text-lg`}
            onClick={() => changeLanguage('ar')}> 
         عربي
         </p>
      </div>
    </div>
  );
};

export default Language;
