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
              <v-list-item-title class="body-1 white--text d-flex"
                >List of companies
                <v-icon class="view-icon ml-auto" @click="viewstyle = 'grid'"
                  >fas fa-th</v-icon
                >
                <v-icon class="view-icon ml-4" @click="viewstyle = 'list'"
                  >fas fa-list</v-icon
                >
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row v-if="isLoading">
              <v-col cols="12">
                <v-text-field color="primary" loading disabled></v-text-field>
              </v-col>
            </v-row>
            <div v-else>
              <v-row v-if="viewstyle === 'grid'">
                <v-col
                  cols="2"
                  v-for="(item, index) in getCompanies"
                  :key="item.name"
                >
                  <company-card
                    :companyName="item.name"
                    :logoPath="item.logo"
                    :groupId="item.group_id"
                    :index="index"
                  ></company-card>
                </v-col>
              </v-row>
              <v-row v-else>
                <v-col
                  v-for="(item, index) in getCompanies"
                  :key="item.name"
                  cols="12"
                  class="py-0"
                >
                  <company-list
                    :companyName="item.name"
                    :logoPath="item.logo"
                    :groupId="item.group_id"
                    :index="index"
                  ></company-list>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { Card, List } from "@/components/UserActivity/";
import { mapGetters } from "vuex";
export default {
  name: "User-Acitivity",
  components: {
    "company-card": Card,
    "company-list": List
  },
  data() {
    return {
      isLoading: false,
      viewstyle: "list"
    };
  },
  watch: {
    getCompanies() {
      this.isLoading = false;
    }
  },
  computed: {
    ...mapGetters("Useractivity", ["getCompanies"]),
    ...mapGetters("Layout", ["getBreadcrumb"])
  },
  created() {
    this.isLoading = true;
    this.$store.dispatch("Useractivity/getCompany");
    this.$store.dispatch("Layout/SET_BREADCRUMB", "user_activity");
  }
};
</script>

<style lang="scss" scoped>
.view-icon {
  color: white;
  cursor: pointer;
}
</style>
