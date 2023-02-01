import { getAccessHistory, getAccessPages, getMFA } from "@/api/ppanalytic.api";
import { startOfDay } from "date-fns";

const fn = {
  SET_TABLEDATA: "SET_TABLEDATA",
  SET_PAGES: "SET_PAGES",
  SET_MFA: "SET_MFA",
  SET_TOTALDATA: "SET_TOTALDATA",
  SET_ISMFA_NOT_READY: "SET_ISMFA_NOT_READY",
  SET_ISMFA_READY: "SET_ISMFA_READY",
  SET_CURRENTPAGE: "SET_CURRENTPAGE",
  RESET_DATA: "RESET_DATA"
};

const state = {
  tabledata: [],
  totalData: 0,
  currentPage: 1,
  pages: ["All"],
  isMfaReady: false,
  mfa: {}
};

const getters = {
  getTableData: state => state.tabledata,
  getPages: state => state.pages,
  getMFA: state => state.mfa,
  getTotalData: state => state.totalData,
  getIsMFAReady: state => state.isMfaReady,
  getCurrentPage: state => state.currentPage
};

// actions
const actions = {
  async getAccessHistoryData({ commit }, payload) {
    try {
      const resp = await getAccessHistory(payload);
      if (resp.data) {
        commit(fn.SET_TABLEDATA, resp.data.data);
        commit(fn.SET_TOTALDATA, resp.data.data.total);
        commit(fn.SET_CURRENTPAGE, resp.data.data.current_page);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getPagesData({ commit }) {
    try {
      const response = await getAccessPages();
      if (response.data) {
        commit(fn.SET_PAGES, response.data.pages);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async getMfaData({ commit }) {
    try {
      commit(fn.SET_ISMFA_NOT_READY);

      const response = await getMFA();

      if (response.data) {
        commit(fn.SET_MFA, response.data.mfa);
        commit(fn.SET_ISMFA_READY);
      }
    } catch (error) {
      console.log(error);
    }
  },
  async resetData({ commit }) {
    try {
      commit(fn.RESET_DATA);
    } catch (error) {
      console.log(error);
    }
  }
};

// mutations
const mutations = {
  [fn.SET_TABLEDATA](state, payload) {
    state.tabledata = payload;
  },
  [fn.SET_PAGES](state, payload) {
    state.pages = [...state.pages, ...payload];
  },
  [fn.SET_MFA](state, payload) {
    Object.assign(state.mfa, payload);
  },
  [fn.SET_TOTALDATA](state, payload) {
    state.totalData = payload;
  },
  [fn.SET_CURRENTPAGE](state, payload) {
    state.currentPage = payload;
  },
  [fn.SET_ISMFA_NOT_READY](state) {
    state.isMfaReady = false;
  },
  [fn.SET_ISMFA_READY](state) {
    state.isMfaReady = true;
  },
  [fn.RESET_DATA](state) {
    state.tabledata = [];
    state.totalData = 0;
    state.currentPage = 1;
    state.pages = ["All"];
    state.isMfaReady = false;
    state.mfa = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
