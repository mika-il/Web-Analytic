<template>
  <div>
    <v-row>
      <v-col>
        <v-card class max-width="auto">
          <v-card-text>
            <h2>
              Features
            </h2>
            <section>
              <v-row class="mb-6">
                <v-col>
                  <div
                    class="mt-4"
                    @click="goto('hr_activity')"
                    style="cursor:pointer;height:100%;"
                  >
                    <v-alert
                      border="left"
                      colored-border
                      type="info"
                      icon="fas fa-chart-bar"
                      elevation="2"
                      style="height:100%;"
                    >
                      <span class="font-weight-medium">HR Activity</span>
                      <p class="mb-0">
                        Click to view or export the excel file of all user
                        activity records each accounts. You can select any
                        policies or accounts to view the data and able to select
                        to see all overview as well. The user activity details
                        include Times of visiting each page, Spending Time for
                        each page, and any User Actions.
                      </p>
                    </v-alert>
                  </div>
                </v-col>
                <v-col>
                  <div
                    class="mt-4"
                    @click="goto('access_log')"
                    style="cursor:pointer;height:100%;"
                  >
                    <v-alert
                      border="left"
                      colored-border
                      type="warning"
                      icon="fas fa-history"
                      elevation="2"
                      style="height:100%;"
                    >
                      <span class="font-weight-medium">Access History</span>
                      <p class="mb-0">
                        Click to view all access history of all PCP accounts.
                        Access history data record with Date, Name, IP Address,
                        and Time for each account. You can view them by
                        selecting table option and graph option.
                      </p>
                    </v-alert>
                  </div>
                </v-col>
                <v-col>
                  <div
                    class="mt-4"
                    @click="goto('client_report')"
                    style="cursor:pointer;height:100%;"
                  >
                    <v-alert
                      border="left"
                      colored-border
                      color="green darken-2"
                      icon="fas fa-chart-line"
                      elevation="2"
                      style="height:100%;"
                    >
                      <span class="font-weight-medium">Client Report</span>
                      <p class="mb-0">
                        Click to generate a report of all clients on the PCP.
                        You can view the combined number of Clients , HR ,
                        Policies , Actions , etc.
                      </p>
                    </v-alert>
                  </div>
                </v-col>
              </v-row>
            </section>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card class max-width="auto" height="100%">
          <v-card-text>
            <h2 class="text-center mb-4">Company Access Times</h2>
            <DashboardGraphDialog
              class="mb-5"
              @childFilterGraph="filterCompAccess"
              @childResetFilter="resetFilter"
              :dateLabel="filterDate"
            ></DashboardGraphDialog>
            <DashboardGraph :comp-data="get_comp_access"></DashboardGraph>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card class max-width="auto" height="100%">
          <v-card-text>
            <h2 class="text-center mb-4">Summary</h2>
            <DashboardSummary :comp-data="get_comp_access"></DashboardSummary>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DashboardGraph from "../components/dashboard/DashboardGraph";
import DashboardGraphDialog from "../components/dashboard/DashboardGraphDialog";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import {
  parse,
  lastDayOfMonth,
  getDate,
  getMonth,
  getYear,
  compareAsc
} from "date-fns";
export default {
  name: "Dashboard",
  components: {
    DashboardGraph,
    DashboardSummary,
    DashboardGraphDialog
  },
  data() {
    return {
      filterDate: []
    };
  },
  methods: {
    goto(url) {
      this.$router.push(url);
    },
    resetFilter() {
      this.filterDate = [];
      this.$store.dispatch("Dashboard/GET_COMPANY_ACCESS", {
        filter: 0
      });
    },
    filterCompAccess(data) {
      let start_date;
      let end_date;
      if (data.length === 2) {
        let isMore = compareAsc(
          parse(data[0] + "-01", "yyyy-MM-dd", new Date()),
          parse(data[1] + "-01", "yyyy-MM-dd", new Date())
        );
        if (isMore === 1) {
          start_date = data[1] + "-01";
          end_date =
            data[0] +
            "-" +
            getDate(
              lastDayOfMonth(parse(data[0] + "-01", "yyyy-MM-dd", new Date()))
            );
        } else {
          start_date = data[0] + "-01";
          end_date =
            data[1] +
            "-" +
            getDate(
              lastDayOfMonth(parse(data[1] + "-01", "yyyy-MM-dd", new Date()))
            );
        }
      }
      else{
        start_date = data[0] + "-01";
        end_date = data[0] + "-" + getDate( lastDayOfMonth(parse(data[0] + "-01", "yyyy-MM-dd", new Date())) );
      }
      this.filterDate = [start_date, end_date];
      this.$store.dispatch("Dashboard/GET_COMPANY_ACCESS", {
        start_date: start_date,
        end_date: end_date,
        filter: 1
      });
    }
  },
  watch:{
    getVersion(){
      this.resetFilter()
    }
  },
  computed: {
    ...mapGetters("Dashboard", ["get_comp_access"]),
    ...mapGetters("Layout", ["getVersion"]),
  },
  created() {
    this.$store.dispatch("Dashboard/GET_COMPANY_ACCESS", {
      filter: 0
    });
  },
  mounted() {}
};
</script>
