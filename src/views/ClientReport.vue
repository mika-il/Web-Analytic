<template>
  <div>
    <v-breadcrumbs :items="getBreadcrumb" large class="pa-0">
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <v-row>
      <v-col>
        <v-card class max-width="auto">
          <v-list-item
            class="subtitle-1"
            style="background-color:#2c95da;color:white;"
          >
            <v-list-item-content>
              <v-list-item-title class="body-1 white--text"
                >Client Report</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row>
              <v-col class="d-flex" cols="12" sm="3">
                <v-select
                  v-model="filter"
                  :items="filters"
                  label="Display by"
                ></v-select>
              </v-col>
              <v-col class="d-flex" cols="12" sm="4">
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startDate"
                      clearable
                      label="From"
                      prepend-icon="far fa-calendar-alt"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    :show-current="show_current_date"
                    no-title
                    scrollable
                    @input="menuStartDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col class="d-flex" cols="12" sm="4">
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endDate"
                      clearable
                      label="To"
                      prepend-icon="far fa-calendar-alt"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :show-current="show_current_date"
                    :disabled="endDateDisable"
                    :min="endDateMin"
                    no-title
                    scrollable
                    @input="menuEndDate = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col
                class="d-flex"
                v-if="reportType === 'each'"
                cols="12"
                sm="3"
              >
                <v-select
                  v-model="region"
                  :items="getRegionData"
                  label="Region"
                  v-on:change="handleCompany()"
                ></v-select>
              </v-col>
              <v-col
                class="d-flex"
                v-if="reportType === 'each' && region !== 'All Regions'"
                cols="12"
                sm="3"
              >
                <ReportCompanyMultiSelect
                  :items="getCompaniesData"
                  :companyDisable="companyDisable"
                  :resetCompanyOption="resetCompanyOption"
                  @export="changeCompany"
                ></ReportCompanyMultiSelect>
              </v-col>
              <v-col cols="12" sm="12" class="d-flex">
                <v-radio-group v-model="reportType" row @change="changeRadio">
                  <v-radio label="General Statistics" value="all"></v-radio>
                  <v-radio label="Office Statistics" value="each"></v-radio>
                </v-radio-group>
                <v-btn
                  class="ml-2 mt-3"
                  color="info"
                  @click="handleFilter()"
                  :disabled="buttonDisable"
                >
                  Filter
                </v-btn>
                <v-btn
                  class="ml-2 mt-3"
                  color="success"
                  @click="handleExport()"
                  :disabled="
                    (reportType === 'all' && !isExport) ||
                      (reportType === 'each' && !isExport)
                  "
                >
                  <v-icon left>fas fa-file-excel</v-icon> Export
                </v-btn>
              </v-col>
            </v-row>
            <v-row v-if="isLoading">
              <v-col>
                <v-progress-linear indeterminate height="2"></v-progress-linear>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="d-flex" cols="12">
                <ReportGeneralStatistics
                  v-if="reportType === 'all' && isClientData"
                  :items="getClientData"
                  @export="canExport"
                ></ReportGeneralStatistics>
                <ReportOfficeStatistics
                  v-if="reportType === 'each' && isOfficeData"
                  :items="getOfficeData"
                  @export="canExport"
                ></ReportOfficeStatistics>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { compareAsc } from "date-fns";
import ReportGeneralStatistics from "../components/report/ReportGeneralStatistics";
import ReportOfficeStatistics from "../components/report/ReportOfficeStatistics";
import ReportCompanyMultiSelect from "../components/report/ReportCompanyMultiSelect";
export default {
  name: "client-report",
  components: {
    ReportGeneralStatistics,
    ReportOfficeStatistics,
    ReportCompanyMultiSelect,
  },
  data() {
    return {
      isLoading: false,
      isExport: false,
      show_current_date: false,
      filters: ["Date", "Monthly", "Quarterly", "Yearly"],
      region: "All Regions",
      company: [],
      filter: "Date",
      startDate: "",
      endDate: "",
      endDateDisable: true,
      endDateMin: "",
      buttonDisable: true,
      buttonDownloadDisable: true,
      reportType: "all",
      menuStartDate: false,
      menuEndDate: false,
      companyDisable: false,
      resetCompanyOption: false,
    };
  },
  created() {
    this.$store.dispatch("Layout/SET_BREADCRUMB", "client_report");
    this.$store.dispatch("Clientreport/getRegionData");
    this.resetByReport();
    this.$store.dispatch("Resourcelog/getCompanyAndPolicyData");
  },
  computed: {
    ...mapGetters("Layout", ["getBreadcrumb", "getVersion"]),
    ...mapGetters("Clientreport", [
      "getClientData",
      "getOfficeData",
      "getRegionData",
      "getCompaniesData",
    ]),
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
    isClientData() {
      return Object.keys(this.getClientData).length > 0;
    },
    isOfficeData() {
      return Object.keys(this.getOfficeData).length > 0;
    },
  },
  watch: {
    getVersion() {
      this.resetCompany();
      this.resetOffice();
      this.startDate = "";
      this.endDate = "";
      this.filter = "Date";
      this.region = "All Regions";
      this.reportType = "all";
      this.filters = ["Date", "Monthly", "Quarterly", "Yearly"];
    },
    getClientData() {
      this.isLoading = false;
    },
    getOfficeData() {
      this.isLoading = false;
    },
    getCompaniesData() {
      this.companyDisable = false;
    },
    reportType() {
      this.resetByReport();
    },
    filter() {
      // this.buttonDisable = true;
      // this.resetByReport();
      // this.startDate = "";
      // this.endDate = "";
      // this.region = "All Regions";
    },
    startDate() {
      this.endDateDisable = false;
      this.endDateMin = this.startDate;
      if (
        this.endDate &&
        compareAsc(new Date(this.startDate), new Date(this.endDate)) === 1
      ) {
        this.buttonDisable = true;
      }

      if (this.startDate && this.endDate) {
        this.buttonDisable = false;
      } else {
        this.buttonDisable = true;
      }
    },
    endDate() {
      this.buttonDisable = this.startDate && this.endDate ? false : true;
    },
  },
  methods: {
    ...mapMutations({
      resetCompany: "Clientreport/RESET_COMPANY",
      resetOffice: "Clientreport/RESET_OFFICE",
    }),
    changeRadio(value) {
      // value = "each" => office, "all" => general]

      // if (value == "all") {
      //   this.filters = ["Date", "Monthly", "Quarterly", "Yearly"];
      // } else {
      //   this.filters = ["Date"];
      //   this.filter = "Date";
      // }
    },
    canExport(value) {
      this.isExport = value ? true : false;
    },
    changeCompany(value) {
      this.company = value.company;
      this.resetCompanyOption = value.resetCompanyOption;
    },
    resetByReport() {
      this.isExport = false;
      if (this.reportType === "all") {
        this.resetCompany();
      } else {
        this.resetOffice();
      }
    },
    handleCompany() {
      this.companyDisable = true;
      this.resetCompanyOption = true;
      this.company = [];
      const filterOption = {
        region:
          this.reportType === "each" && this.region !== "All Regions"
            ? this.region
            : null,
      };

      this.$store.dispatch(
        "Clientreport/getCompaniesDataByRegion",
        filterOption
      );
    },
    handleFilter() {
      this.isLoading = true;
      const filterOption = {
        start_date: this.startDate,
        end_date: this.endDate,
        displayBy: this.filter,
        region:
          this.reportType === "each" && this.region !== "All Regions"
            ? this.region
            : null,
        company: this.company,
      };

      if (this.reportType === "all") {
        this.$store.dispatch("Clientreport/getCompanyData", filterOption);
      } else {
        this.$store.dispatch("Clientreport/getOfficeData", filterOption);
      }
    },
    handleExport() {
      if (!this.isExport) {
        return;
      }

      if (this.reportType === "all") {
        this.$store.dispatch("Clientreport/exportCompanyData");
      } else {
        this.$store.dispatch("Clientreport/exportOfficeData");
      }
    },
  },
};
</script>
