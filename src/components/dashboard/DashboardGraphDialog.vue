<template>
  <v-row>
    <v-col cols="12" class="d-flex">
      <v-dialog v-model="dialog" persistent max-width="688">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="info" dark v-bind="attrs" v-on="on" small>
            Filter
          </v-btn>

          <div class="subtitle-2 d-flex" style="color:#FFA726;">
            <v-btn
              color="error"
              small
              class="ml-3"
              dark
              v-show="showReset"
              @click="$emit('childResetFilter')"
            >
              <v-icon small>fas fa-sync-alt</v-icon>
            </v-btn>
            <div class="ml-3 mt-1">{{ showLabel }}</div>
          </div>
        </template>
        <v-card>
          <v-card-title class="headline">Filter By Month</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-date-picker
                  v-model="dates"
                  range
                  full-width
                  type="month"
                  no-title
                  flat
                  class="my-6"
                  :show-current="false"
                ></v-date-picker>
              </v-col>
              <v-col class="d-flex" cols="12">
                <v-btn
                  class="ml-auto"
                  color="error"
                  @click="
                    () => {
                      dialog = false;
                      dates = [];
                    }
                  "
                  small
                  >Cancel</v-btn
                >
                <v-btn
                  class="ml-4"
                  color="primary"
                  @click="
                    () => {
                      $emit('childFilterGraph', dates);
                      dates = [];
                      dialog = false;
                    }
                  "
                  small
                  >Confirm</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    childFilterGraph: Function,
    childResetFilter: Function,
    dateLabel: Array
  },

  data() {
    return {
      dialog: false,
      dates: [],
      showReset: false
    };
  },
  watch: {
    dateLabel(val) {
      val.length === 2 ? (this.showReset = true) : (this.showReset = false);
    }
  },

  computed: {
    showLabel() {
      let start_date = this.dateLabel[0];
      let end_date = this.dateLabel[1];
      if (this.dateLabel.length === 2) {
        return `Filterd data from ${start_date} to ${end_date}`;
      }
      return "";
    }
  }
};
</script>
