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
                >Access History</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="3">
                <v-select
                  v-model="page"
                  :items="pageMap"
                  item-text="text"
                  item-value="value"
                  label="Display page"
                >
                </v-select>
              </v-col>
              <v-col cols="12" md="2">
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
                      label="From"
                      clearable
                      prepend-icon="far fa-calendar-alt"
                      readonly
                      v-on="on"
                      :rules="dateRules"
                      required
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

              <v-col cols="12" md="2">
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
                      :rules="dateRules"
                      required
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

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="2">
                <v-btn
                  class="ma-2"
                  color="info"
                  @click="handleClick"
                  :disabled="buttonDisable || isLoading"
                  >Filter</v-btn
                >
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3" class="mt-0 pt-0">
                <v-select
                  v-model="mfa"
                  :items="userMfa"
                  item-text="text"
                  item-value="value"
                  label="MFA"
                ></v-select>
              </v-col>
              <v-col cols="12" md="3" class="mt-0 pt-0">
                <v-dialog v-model="mfaDialog" width="500">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      class="ma-2"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      :loading="isMfaLoading"
                    >
                      MFA Summary
                    </v-btn>
                  </template>

                  <v-card>
                    <v-toolbar color="light-blue darken-2 white--text"
                      >MFA Summary</v-toolbar
                    >

                    <v-card-text class="pt-4">
                      <div class="row">
                        <div class="col-8 pb-0">Total members using MFA :</div>
                        <div class="col-3 pb-0 text-right">
                          {{ getMFA.membersMfa }}
                        </div>
                      </div>
                      <div class="row pb-0">
                        <div class="col-8 pb-0">
                          Total members not using MFA :
                        </div>
                        <div class="col-3 pb-0 text-right">
                          {{ getMFA.membersNotMfa }}
                        </div>
                      </div>
                      <div class="row pb-0">
                        <div class="col-8 pb-0">
                          Total members using Questions :
                        </div>
                        <div class="col-3 pb-0 text-right">
                          {{ getMFA.membersMfaQuestions }}
                        </div>
                      </div>
                      <div class="row pb-0">
                        <div class="col-8 pb-0">
                          Total members using Verification Code :
                        </div>
                        <div class="col-3 pb-0 text-right">
                          {{ getMFA.membersMfaCode }}
                        </div>
                      </div>
                    </v-card-text>

                    <v-card-actions class="justify-end">
                      <v-btn small text @click="mfaDialog = false">Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <div>
              <v-text-field
                color="primary"
                loading
                disabled
                v-show="isLoading"
              ></v-text-field>
              <AccessHistoryTable
                :items="getTableData.data"
                :total="getTableData.total"
                :current-page="getCurrentPage"
                v-show="!isLoading && isData"
                @pageChange="handlePageChange"
                :key="btnClickCount"
              ></AccessHistoryTable>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { compareAsc } from "date-fns";
import { diplayPageName } from "../utils/covertPageName";
import AccessHistoryTable from "../components/access_history/AccessHistoryTable.vue";

const initData = () => {
  return {
    search: "",
    page: "All",
    pageMap: [],
    startDate: "",
    endDate: "",
    show_current_date: false,
    menuStartDate: false,
    menuEndDate: false,
    endDateDisable: true,
    endDateMin: "",
    buttonDisable: false,
    isLoading: false,
    mfaDialog: false,
    mfa: null,
    isMfaLoading: true,
    btnClickCount: 0,
    userMfa: [
      { text: "All", value: null },
      { text: "Yes (Code)", value: 2 },
      { text: "Yes (Questions)", value: 1 },
      { text: "No", value: 0 }
    ],
    dateRules: [
      v => !!v || 'Date is required',
    ]
  };
};

export default {
  name: "Access",
  components: {
    AccessHistoryTable: AccessHistoryTable
  },
  data() {
    return initData();
  },
  computed: {
    ...mapGetters("Accesshistory", [
      "getTableData",
      "getPages",
      "getMFA",
      "getTotalData",
      "getCurrentPage",
      "getIsMFAReady"
    ]),
    ...mapGetters("Layout", ["getBreadcrumb", "getVersion"]),
    isData() {
      return Object.keys(this.getTableData).length > 0;
    }
  },
  watch: {
    getVersion() {
      Object.assign(this.$data, initData());
      this.$store.dispatch("Accesshistory/resetData");
      this.$store.dispatch("Accesshistory/getPagesData");
      this.$store.dispatch("Accesshistory/getMfaData");
    },
    getPages(v) {
      v.forEach(item => {
        const displayText = diplayPageName(item);
        this.pageMap.push({ value: item, text: displayText });
      });
    },
    getIsMFAReady(value) {
      this.isMfaLoading = !value;
    },
    getTableData(value) {
      this.isLoading = false;
    },
    startDate() {
      this.endDateDisable = this.startDate ? false : true;
      this.endDateMin = this.startDate;

      if (this.startDate && this.endDate) {
        this.buttonDisable = false;
      } else {
        this.buttonDisable = true;
      }

      if (
        this.endDate &&
        compareAsc(new Date(this.startDate), new Date(this.endDate)) === 1
      ) {
        this.buttonDisable = true;
      }
    },
    endDate() {
      this.buttonDisable = this.startDate && this.endDate ? false : true;

      if (!this.endDate && !this.startDate) {
        this.buttonDisable = false;
      }
    }
  },
  methods: {
    handleClick() {
      this.isLoading = true;
      this.$store.dispatch("Accesshistory/getAccessHistoryData", {
        startDate: this.startDate,
        endDate: this.endDate,
        text: this.search,
        pageName: this.page === "All" ? null : this.page,
        mfa: this.mfa === "All" ? null : this.mfa
      });
      this.btnClickCount++; // this trick do to rerender access history table from bug PCA-133
    },
    handlePageChange(options) {
      this.isLoading = true;
      this.$store.dispatch("Accesshistory/getAccessHistoryData", {
        startDate: this.startDate,
        endDate: this.endDate,
        text: this.search,
        pageName: this.page === "All" ? null : this.page,
        mfa: this.mfa === "All" ? null : this.mfa,
        page: options.page,
        sortBy: options.sortBy,
        sortOrder:
          options.sortDesc !== null ? (options.sortDesc ? "desc" : "asc") : null
      });
    }
  },
  created() {
    this.$store.dispatch("Layout/SET_BREADCRUMB", "access_history");
    this.$store.dispatch("Accesshistory/getPagesData");
    this.$store.dispatch("Accesshistory/getMfaData");
  }
};
</script>
