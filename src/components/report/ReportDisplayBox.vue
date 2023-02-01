<template>
  <v-col
    class="elevation-2 pa-4 mb-6"
    :class="isAllOverview ? 'mx-auto' : 'mx-3'"
    :cols="isAllOverview ? 8 : 4"
  >
    <p class="title-section">{{ persondata }}</p>
    <div v-if="nodata">no record found!</div>
    <div v-else>
      <section v-if="Object.keys(data.list_of_page_enter).length > 0">
        <span class="body-1 font-weight-black">Visited Pages</span>
        <v-list-item dense>
          <v-list-item-content>
            <v-list-item-title
              v-for="(value, key) in data.list_of_page_enter"
              :key="key + value"
            >
              <span>{{ display_action_name(key) }}</span>
              : {{ value }} time(s)
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </section>
      <section v-if="Object.keys(data.list_of_duration_in_second).length > 0">
        <span class="body-1 font-weight-black ">Time on page</span>
        <v-list-item dense>
          <v-list-item-content>
            <v-list-item-title
              v-for="(value, key) in data.list_of_duration_in_second"
              :key="key + value"
            >
              <span>{{ display_action_name(key) }}</span>
              : {{ toMinute(value) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </section>
      <section v-if="Object.keys(data.list_of_action).length > 0">
        <span class="body-1 font-weight-black ">User Actions</span>
        <v-list-item dense>
          <v-list-item-content>
            <v-list-item-title
              v-for="(value, key) in data.list_of_action"
              :key="key + value"
            >
              <span>{{ display_action_name(key) }}</span>
              : {{ value }} time(s)
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </section>
    </div>
  </v-col>
</template>

<script>
export default {
  name: "report-display-box",
  props: {
    data: [Object, Array, String],
    persondata: String,
    isAllOverview: Boolean
  },
  data() {
    return {
      nodata: true
    };
  },
  mounted() {
    if (this.data !== "nodata") {
      this.nodata = false;
    }
  },

  methods: {
    toMinute(val) {
      // if (val / 60 < 1) {
      //   return "less than minute";
      // }
      // return (val / 60).toFixed(1) + " min(s)";
      // return new Date(val * 1000).toISOString().substr(11, 8) + " hrs";
      if (val <= 60) {
        return "1 minute(s)";
      }
      return Math.floor(val / 60) + " minute(s)";
    },
    display_action_name(action) {
      switch (action) {
        case "Census Create":
          return "Add member";
        case "Census Detail":
          return "Member details";
        case "Census Detail (view only)":
          return "Member details (view only)";
        case "Census Create Family":
          return "Add dependent";
        case "share":
          return "Shared Documents";
        default:
          return action;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.title-section {
  font-size: 20px;
  font-weight: bold;
  color: #2476f3;
}
section {
  margin-bottom: 20px;
}
</style>
