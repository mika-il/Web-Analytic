<template>
  <div id="hr-table">
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
      :value="selected_hr"
      @input="updatePolicy"
      :headers="headers"
      :items="getHR"
      :single-select="singleSelect"
      item-key="id"
      show-select
      :search="search"
      :loading="isLoading"
      loading-text="Loading... Please wait"
      @click:row="rowClick"
      dense
    >
      <template v-slot:item.active="{ item }">
        <span :color="getColor(item.active)" dark>
          {{ item.active }}
        </span>
      </template>
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
  name: "hr-table",
  props: {
    getHR: Array,
    selected_hr: Array
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
          width: "20%"
        },
        {
          text: "Display Name",
          align: "start",
          value: "display_name",
          width: "40%"
        },
        {
          text: "Email",
          align: "start",
          value: "email",
          width: "20%"
        },
        {
          text: "Active",
          align: "center",
          value: "active",
          width: "20%"
        }
      ]
    };
  },
  watch: {
    getHR() {
      this.isLoading = false;
    }
  },
  methods: {
    rowClick(val) {
      let current_state = this.selected_hr;
      if (current_state.includes(val)) {
        let index = current_state.indexOf(val);
        current_state.splice(index, 1);
        this.$emit("update:selected_hr", current_state);
      } else {
        this.$emit("update:selected_hr", [...current_state, val]);
      }
    },
    updatePolicy(val) {
      this.$emit("update:selected_hr", val);
    },
    getColor(active) {
      if (active.toString() === "0") return "red";
      else return "green";
    }
  }
};
</script>

<style lang="scss" scoped>
#hr-table-wrapper ::v-deep .v-data-table tr:hover {
  cursor: pointer !important;
}
</style>
