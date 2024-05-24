import * as types from './types';

export const handleLoader = (bool)=>{
    return bool ? {
      type: types.SHOW_LOADER,
      data:bool
    }: {
      type: types.HIDE_LOADER,
      data: bool
    }
}