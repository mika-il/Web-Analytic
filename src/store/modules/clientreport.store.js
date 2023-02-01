import FileDownload from "js-file-download";
// import {  } from "@/api/pcp.api";
import {
  getAPICompanyData,
  exportCompanyData,
  getReportByRegion,
  getRegions,
  getCompaniesByRegion,
  exportOfficeData,
  getCompanyInfo
} from "@/api/ppanalytic.api";

const fn = {
  SET_COMPANY: "SET_COMPANY",
  SET_OFFICE: "SET_OFFICE",
  RESET_COMPANY: "RESET_COMPANY",
  RESET_OFFICE: "RESET_OFFICE",
  SET_REGIONS: "SET_REGIONS",
  SET_COMPANIES: "SET_COMPANIES",
};

const state = {
  clientData: {}, // if have data it will store in key name => clients
  officeData: {},
  regions: ["All Regions"],
  companies: [],
};

const getters = {
  getClientData: state => state.clientData,
  getOfficeData: state => state.officeData,
  getRegionData: state => state.regions,
  getCompaniesData: state => state.companies
};

// actions
const actions = {
  async getCompanyData({ commit }, payload) {
    try {
      let resp = await getCompanyInfo(payload);
      if (resp.data) {
        if (typeof resp.data.message !== "undefined") {
          commit(fn.SET_COMPANY, { ...resp.data });
          return;
        }

        const { start_date, end_date, datetime_period } = resp.data;
        let respCompanyData = await getAPICompanyData({
          start_date: start_date,
          end_date: end_date,
          datetime_period: datetime_period
        });

        if (respCompanyData.data) {
          commit(fn.SET_COMPANY, { ...resp.data, ...respCompanyData.data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getOfficeData({ commit }, payload) {
    try {
      let resp = await getReportByRegion(payload);
      if (resp.data) {
        commit(fn.SET_OFFICE, resp.data);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getRegionData({ commit }) {
    try {
      let resp = await getRegions();
      if (resp) {
        commit(fn.SET_REGIONS, resp.data.regions);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async getCompaniesDataByRegion({ commit }, payload) {
    try {
      let resp = await getCompaniesByRegion(payload);
      if (resp) {
        commit(fn.SET_COMPANIES, resp.data.companies);
      }
    } catch (err) {
      console.log(err);
    }
  },
  async exportCompanyData({ state }) {
    try {
      let resp = await exportCompanyData(state.clientData);
      if (resp.data) {
        FileDownload(resp.data, "general_statistics.xlsx");
      }
    } catch (err) {
      console.log(err);
    }
  },
  async exportOfficeData({ state }) {
    try {
      let resp = await exportOfficeData(state.officeData);
      if (resp.data) {
        FileDownload(resp.data, "office_statistics.xlsx");
      }
    } catch (err) {
      console.log(err);
    }
  },
  resetCompany({ commit }) {
    commit(fn.RESET_COMPANY);
  }
};

// mutations
const mutations = {
  [fn.SET_COMPANY](state, payload) {
    state.clientData = payload;
  },
  [fn.SET_OFFICE](state, payload) {
    state.officeData = payload;
  },
  [fn.SET_REGIONS](state, payload) {
    state.regions = [...state.regions, ...payload];
  },
  [fn.SET_COMPANIES](state, payload) {
    state.companies =  [...payload];
  },
  [fn.RESET_COMPANY](state) {
    state.clientData = {};
  },
  [fn.RESET_OFFICE](state) {
    state.officeData = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
