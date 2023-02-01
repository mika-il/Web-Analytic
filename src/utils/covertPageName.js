const diplayPageName = dbValue => {
  const pageName = {
    All: "All Pages",
    Account: "User Management",
    Faq: "FAQs and User Guide",
    Permission: "Permission Logs",
    Privacy: "Privacy Policy",
    Profile: "Edit Profile",
    Report: "Reports",
    Resouce: "Resouces",
    Share: "Share Documents",
    "Terms&conditions": "Terms and Conditions",
    History_log: "History Logs",
    History_log_download: "Export History Logs"
  };
  if (dbValue in pageName) return pageName[dbValue];
  else return dbValue;
};

export { diplayPageName };
