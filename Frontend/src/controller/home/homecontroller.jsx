import { create } from 'zustand';

const useHomePageController = create(() => ({
  data: null,
  loading: false,

}));

export default useHomePageController;
