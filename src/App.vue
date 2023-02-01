<template>
  <div>
    <component v-bind:is="switchLayout()"></component>
    <loading v-if="getLoading"></loading>
    <ModalIdle />
  </div>
</template>

<script>
import authLayout from "@/layouts/auth-layout";
import adminLayout from "@/layouts/admin-layout";
import loading from "@/components/default/loading";
import ModalIdle from "@/components/default/ModalIdle";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    "auth-layout": authLayout,
    "admin-layout": adminLayout,
    loading: loading,
    ModalIdle
  },
  data() {
    return {
      route_use_login_template: ["login"]
    };
  },
  computed: {
    ...mapGetters("Layout", ["getLoading"])
  },
  methods: {
    switchLayout() {
      if (this.route_use_login_template.indexOf(this.$route.name) !== -1) {
        return "auth-layout";
      } else {
        return "admin-layout";
      }
    }
  }
};
</script>
<style lang="scss">
@import "./App.scss";
</style>
