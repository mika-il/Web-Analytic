<template>
  <v-card class="mx-auto">
    <v-card-text>
      <v-data-table dense :headers="headers" :items="items">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="subtitle-2 text--primary">{{
              title
            }}</v-toolbar-title>
          </v-toolbar>
          <v-dialog v-model="userDialog" width="400">
            <v-card>
              <v-card-title class="text-h6">
                Account viewed the file:
              </v-card-title>
              <v-card-text>
                <v-progress-linear
                  v-if="loading"
                  indeterminate
                  color="primary"
                  class="mb-0"
                ></v-progress-linear>
                <v-simple-table v-if="!loading">
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="item in userViewed" :key="item.name">
                        <td class="text-left">{{ item.user }}</td>
                        <td class="text-right">viewed({{ item.viewed }})</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn small text @click="userDialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:item.user_view="{ item }">
          <v-chip
            small
            :color="getColor(item.user_view)"
            text-color="white"
            @click="getUsers(item)"
          >
            viewed ({{ item.user_view ? item.user_view : 0 }})
          </v-chip>
        </template>
        <template v-slot:no-data>
          No Policy subGroup documents found.
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "PolicySubgroupDocumentsLog",
  props: { items: Array, title: String, userViewed: Array, loading: Boolean },
  data() {
    return {
      headers: [
        { text: "File Name", value: "file_name", align: "start" },
        { text: "Group code", value: "group_code", align: "left" },
        { text: "Plan", value: "plan", align: "left" },
        { text: "Location", value: "location", align: "left" },
        {
          text: "",
          value: "user_view",
          align: "right",
          sortable: false
        }
      ],
      userDialog: false
    };
  },
  watch: {},
  methods: {
    getColor(view) {
      return view ? "green" : "grey lighten-1";
    },
    getUsers(resource) {
      if (!resource.user_view) {
        return;
      }

      this.$emit("getUsers", {
        fileName: resource.file_name,
        policyId: resource.policy_id,
        section: this.title
      });

      this.userDialog = true;
    }
  }
};
</script>

<style>
.capitalize {
  text-transform: capitalize;
}
</style>
