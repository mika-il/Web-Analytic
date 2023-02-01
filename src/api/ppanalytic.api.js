import { httpClient_ANALYTIC, httpClient_ANALYTIC_FILE } from "./httpClient";
import { encodeURL } from "@/utils/utils";
// const END_POINT = "/users";
import store from "../store/store";

const getAnalyticData = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_stat`, payload);
};

const getHRActivity = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/hr_activity`, payload);
};

const getHRActivityAlloverview = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/hr_activity_alloverview`, payload);
};

const getCompanyAccess = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_company_access`, payload);
};

const getAnalyticDataAll = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_stat_all_overview`, payload);
};

const getAnalyticDataExcel = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC_FILE.post(`/post/${dataVersion}/get_stat_excel`, payload);
};

const getAnalyticDataExcelAll = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC_FILE.post(`/post/${dataVersion}/get_stat_excel_all`, payload);
};

const getHRActivityAlloverviewExcel = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC_FILE.post(`/post/${dataVersion}/hr_activity_excel_all`, payload);
};

const getAccessHistory = payload => {
  const isPage = typeof payload.page !== "undefined";
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_hr_access${isPage ? `?page=${payload.page}` : ""}`, payload);
};

const getAccessPages = () => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_pages`);
};

const getAPICompanyData = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/company_data`, payload);
};

const exportCompanyData = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC_FILE.post(`/post/${dataVersion}/export_company`, payload);
};

const getReportByRegion = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/report_region`, payload);
};

const getRegions = () => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/regions`);
}

const exportOfficeData = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC_FILE.post(`/post/${dataVersion}/export_region`, payload);
};

const getMFA = () => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_mfa`);
};

const getCompanyAndPolicy = () => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/company`);
};

const getResourceLog = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/resources_log`, payload);
};

const getUserViewed = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/resources_userviewed`, payload);
};

const getAllCompanies = () => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_company_and_account`);
}

const getPolicyUnderCompany = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_policy_under_company` , payload);
}

const getCompaniesByRegion = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_conpanies_by_region`, payload);
}

const getCompanyInfo = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/clients`, payload);
};

const getAllHRunderCompany = payload => {
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/all_hr_by_company`, payload);
}

const getHRUnderPolicy = payload => { 
  let dataVersion = store.state["Layout"].version
  return httpClient_ANALYTIC.post(`/post/${dataVersion}/get_account_under_policy`, payload); 
}

export {
  getHRUnderPolicy,
  getAllCompanies,
  getAnalyticData,
  getAnalyticDataExcel,
  getAccessHistory,
  getAccessPages,
  getAnalyticDataAll,
  getCompanyAccess,
  getAPICompanyData,
  exportCompanyData,
  getAnalyticDataExcelAll,
  getHRActivity,
  getHRActivityAlloverview,
  getHRActivityAlloverviewExcel,
  getReportByRegion,
  getRegions,
  exportOfficeData,
  getMFA,
  getCompanyAndPolicy,
  getResourceLog,
  getUserViewed,

  getPolicyUnderCompany,
  getCompanyInfo,
  getCompaniesByRegion,
  getAllHRunderCompany
};
