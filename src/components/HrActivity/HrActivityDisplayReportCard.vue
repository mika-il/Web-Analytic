<template>
  <v-expansion-panel :key="expansionKey" @click="scrollevent()">
    <v-expansion-panel-header :disable-icon-rotate="isNodata"
      >{{ hr_name }}
      <template v-slot:actions v-if="isNodata">
        <v-icon color="error">
          mdi-alert-circle
        </v-icon>
      </template>
    </v-expansion-panel-header>
    <v-expansion-panel-content>
      <div class="show-detail" v-if="!isNodata">
        <v-list-item v-for="title in Object.keys(hr_detail)" :key="title">
          <v-list-item-content>
            <v-list-item-title>{{ correctTitle(title) }}</v-list-item-title>
            <v-row>
              <v-col
                v-for="detailKey in Object.keys(hr_detail[title])"
                :key="hr_name + detailKey"
                class="py-1"
                cols="4"
              >
                <v-list-item-subtitle>
                  <span>{{ correctActionName(detailKey) }}</span>
                  :
                  {{
                    title === "list_of_duration_in_second"
                      ? toMinute(hr_detail[title][detailKey]) + " minute(s)"
                      : hr_detail[title][detailKey] + " time(s)"
                  }}
                </v-list-item-subtitle>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="show-detail" v-else>
        <span>
          No record found!
        </span>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import {
  correctTitle as _correctTitle,
  correctActionName as _correctActionName
} from "@/utils/hractivity.js";

export default {
  name: "display-report-card",
  props: {
    hr_name: String,
    hr_detail: [Object, String],
    expansionKey: String
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    isNodata() {
      return this.hr_detail === "nodata" ? true : false;
    }
  },
  methods: {
    correctTitle(title) {
      return _correctTitle(title);
    },
    correctActionName(action) {
      return _correctActionName(action);
    },
    scrollevent() {
      setTimeout(() => {
        let topos = this.$el.getBoundingClientRect().top;
        window.scroll({ top: topos });
      }, 200);
    },
    toMinute(val) {
      if (val <= 60) {
        return "0";
      }
      return Math.floor(val / 60);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
