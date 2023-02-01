<template>
  <div>
    <v-row>
      <v-col cols="12" class="d-flex py-0">
        <v-btn color="error" class="ml-auto" small @click="goback()">
          <v-icon left dark>
            fas fa-angle-left
          </v-icon>
          Back
        </v-btn>
        <v-btn
          color="success"
          class="ml-2"
          small
          @click="getexcel()"
          :disabled="getReportAlloverview === 'nodata'"
        >
          export
          <v-icon right dark>
            fas fa-file-excel
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-expansion-panels
      class="mt-6"
      v-model="panel"
      :readonly="readonly"
      multiple
    >
      <HrActivityDisplayReportCard
        :hr_name="selected_company[0].name"
        expansionKey="All Overview"
        :hr_detail="getReportAlloverview"
      ></HrActivityDisplayReportCard>
    </v-expansion-panels>
  </div>
</template>

<script>
import HrActivityDisplayReportCard from "./HrActivityDisplayReportCard";

export default {
  name: "display-report-all-overview",
  components: { HrActivityDisplayReportCard },
  props: {
    getReportAlloverview: Object,
    selected_company: [Object, Array]
  },
  data() {
    return {
      panel: [0],
      tab: null,
      readonly: false
    };
  },
  watch: {},
  methods: {
    goback() {
      this.$emit("resetReport");
    },
    getexcel() {
      if (this.getReportAlloverview !== "nodata") {
        this.$emit("goExport");
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
