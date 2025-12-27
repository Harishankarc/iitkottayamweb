import { create } from 'zustand';

const useHomePageController = create((set) => ({
  data: null,
  loading: false,

}));

export default useHomePageController;
