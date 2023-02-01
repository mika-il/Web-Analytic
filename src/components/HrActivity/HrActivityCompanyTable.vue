<template>
  <div id="company-table">
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      class="mb-4 ml-auto"
      single-line
      style="max-width:300px;"
      hide-details
    ></v-text-field>

    <v-data-table
      :value="selected_company"
      @input="updateCompany"
      :headers="headers"
      :items="getCompanies"
      :single-select="singleSelect"
      item-key="group_id"
      show-select
      :search="search"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      @click:row="rowClick"
      dense
    >
    </v-data-table>
  </div>
</template>

<script>
// const colorPack = ["#ED5314", "#FFB92A"];
const colorPack = ["#a8dadc", "#457b9d"];

export default {
  name: "company-table",
  props: {
    getCompanies: [Array],
    selected_company: Array
  },
  data() {
    return {
      search: "",
      isLoading: true,
      singleSelect: true,
      // selected_company: [],

      headers: [
        {
          text: "Client",
          align: "start",
          value: "name",
          width: "50%"
        },
        {
          text: "Total Policy (s)",
          align: "center",
          value: "policy_count",
          width: "25%"
        },
        {
          text: "Total HR (s)",
          align: "center",
          value: "hr_count",
          width: "25%"
        }
      ]
    };
  },
  watch: {
    getCompanies() {
      this.isLoading = false;
    }
  },
  methods: {
    rowClick(val, event) {
      if (JSON.stringify(this.selected_company[0]) === JSON.stringify(val)) {
        this.$emit("update:selected_company", []);
      } else {
        this.$emit("update:selected_company", [val]);
      }
    },
    updateCompany(val) {
      this.$emit("update:selected_company", val);
    }
  }
};
</script>

<style lang="scss" scoped>
#company-table ::v-deep .v-data-table tr:hover {
  cursor: pointer !important;
}
</style>
