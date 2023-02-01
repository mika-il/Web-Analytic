<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app floating>
      <v-list dark>
        <v-list-item v-for="item in items" :key="item.to" :to="item.to">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app elevation="0">
      <v-btn class="header-button" fab dark x-small @click="drawer = !drawer">
        <v-icon dark>{{ changeIcon }}</v-icon>
      </v-btn>

      <v-toolbar-title
        style="cursor:pointer;"
        class="ml-0 pl-4"
        @click="backtoHome()"
      >
      </v-toolbar-title>
      <!-- <v-text-field
        solo
        dense
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      /> -->

      <v-spacer />
      <!--
      <v-btn color="light-blue lighten-4" class=" mr-4" small>
        <select @change="handleChangeVersion($event)">
          <option value="v1">DATA: PCP V.1</option>
          <option value="v2">DATA: PCP V.2</option>
        </select>
      </v-btn> -->

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="info" dark v-bind="attrs" v-on="on" small class="mr-4">
            DATA: PCP {{ currentVersion }}
          </v-btn>
        </template>
        <v-list color="info" dense class="pa-0">
          <v-list-item dense @click="handleChangeVersion">
            <v-list-item-title class="white--text">
              DATA: PCP {{ showVersionOption }}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn class="header-button mr-4" fab dark x-small>
        <v-icon dark>fas fa-ellipsis-v</v-icon>
      </v-btn>
      <v-btn class="header-button" fab dark x-small @click="logout()">
        <v-icon dark>fas fa-sign-out-alt</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main :class="$vuetify.breakpoint.smAndUp ? 'mx-12' : ''">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="white--text" app>
      <v-spacer></v-spacer>
      <div class="font-italic body-2">
        &copy; 2006- {{ new Date().getFullYear() }} Pacific Prime, All rights
        reserved Pacific Prime
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    drawer: true,
    currentVersion: "v1",
    items: [
      { icon: "fas fa-th-list", text: "Dashboard", to: "/" },
      { icon: "fas fa-chart-bar", text: "HR Activity", to: "/hr_activity" },
      {
        icon: "fas fa-chart-line",
        text: "Statistics Report",
        to: "/client_report",
      },
      { icon: "fas fa-history", text: "Access History", to: "/access_log" },
      {
        icon: "fas fa-file-download",
        text: "Resource Access",
        to: "/resource_log",
      },
    ],
    versions: [
      { name: "PCP V.1", value: "v1" },
      { name: "PCP V.2", value: "v2" },
    ],
  }),
  computed: {
    changeIcon() {
      if (this.drawer) {
        return "fas fa-chevron-left";
      }
      return "fas fa-chevron-right";
    },
    showVersionOption() {
      let text = "";
      if (this.currentVersion == "v1") {
        text = "V2";
      }
      if (this.currentVersion == "v2") {
        text = "V1";
      }
      return text;
    },
  },
  methods: {
    backtoHome() {
      this.$router.push("/");
    },
    logout() {
      this.$router.push("/logout");
    },
    handleChangeVersion() {
      if (this.currentVersion == "v1") {
        this.currentVersion = "v2";
      } else if (this.currentVersion == "v2") {
        this.currentVersion = "v1";
      }
      this.$store.dispatch("Layout/SET_VERSION", this.currentVersion);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-application {
  background-color: #f9fafb;
}
.v-app-bar {
  background-color: #f9fafb;
  color: #565656 !important;

  .v-toolbar__title {
    font-size: 18px;
    font-weight: 500;
  }
}
.header-button {
  background-color: #f9fafb !important;
  color: rgba($color: #000000, $alpha: 0.7) !important;
}

.v-navigation-drawer {
  background: rgb(34, 136, 204) !important;
  -webkit-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.3);
}

footer {
  background: rgb(36, 119, 175) !important;
}
</style>
