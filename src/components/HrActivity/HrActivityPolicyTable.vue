<template>
  <div>
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
      :value="selected_policy"
      @input="updatePolicy"
      :headers="headers"
      :items="getPolicies"
      :single-select="singleSelect"
      item-key="Policy_ID"
      show-select
      :search="search"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      @click:row="rowClick"
      dense
    >
    </v-data-table>

    <!-- <input
      type="text"
      :value="parentData"
      @input="$emit('update:parentData', $event.target.value)"
    /> -->
  </div>
</template>

<script>
export default {
  name: "policy-table",
  props: {
    getPolicies: Array,
    selected_policy: Array
  },
  data() {
    return {
      search: "",
      isLoading: false,
      singleSelect: false,
      headers: [
        {
          text: "Policy ID",
          align: "start",
          value: "Policy_ID",
          width: "15%"
        },
        {
          text: "Policy Name",
          align: "start",
          value: "Policy_Name",
          width: "35%"
        },
        {
          text: "Service Office",
          align: "start",
          value: "Service_Office",
          width: "20%"
        },
        {
          text: "Start",
          align: "center",
          value: "Start_Date",
          width: "15%"
        },
        {
          text: "End",
          align: "center",
          value: "Policy_End_Date",
          width: "15%"
        }
      ]
    };
  },
  watch: {
    getPolicies() {
      this.isLoading = false;
    }
  },
  methods: {
    rowClick(val) {
      let current_state = this.selected_policy;
      if (current_state.includes(val)) {
        let index = current_state.indexOf(val);
        current_state.splice(index, 1);
        this.$emit("update:selected_policy", current_state);
      } else {
        this.$emit("update:selected_policy", [...current_state, val]);
      }
    },
    updatePolicy(val) {
      this.$emit("update:selected_policy", val);
    }
  }
};
</script>

<style lang="scss" scoped>
#policy-table-wrapper ::v-deep .v-data-table tr:hover {
  cursor: pointer !important;
}
</style>
