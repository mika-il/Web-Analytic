<template>
  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead v-if="!isItemEmpty">
        <tr>
          <th class="text-right" style="width:220px;"></th>
          <th class="text-right font-weight-bold no-wrap">
            Previous Data ({{ items.previousdata_date_period }})
          </th>
          <th
            class="text-left font-weight-bold no-wrap"
            v-for="(datetime, index) in items.datetime_period"
            :key="`datetime-${index}`"
          >
            {{ datetime.period }}
          </th>
        </tr>
      </thead>
      <tbody v-if="isItemEmpty">
        <tr>
          <td class="text-center" style="background-color: #FFFFFF;">
            No records found.
          </td>
        </tr>
      </tbody>

      <tbody v-if="!isItemEmpty">
        <tr></tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Number of clients
          </td>
          <td class="text-right">
            {{ items.total_clients }}
          </td>
          <td
            class="text-right"
            v-for="(totalclient_filter,
            index) in items.total_clients_with_filter"
            :key="`totalclient-${index}`"
          >
            {{ totalclient_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total number of HR
          </td>
          <td class="text-right">
            {{ items.total_hr }}
          </td>
          <td
            class="text-right"
            v-for="(totalhr_filter, index) in items.total_hr_with_filter"
            :key="`totalhr-${index}`"
          >
            {{ totalhr_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total number Policies
          </td>
          <td class="text-right">
            {{ items.total_policies }}
          </td>
          <td
            class="text-right"
            v-for="(totalpolicy_filter,
            index) in items.total_policies_with_filter"
            :key="`totalpolicy-${index}`"
          >
            {{ totalpolicy_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total number of members
          </td>
          <td class="text-right">
            {{ items.total_members }}
          </td>
          <td
            class="text-right"
            v-for="(totalmember_filter,
            index) in items.total_members_with_filter"
            :key="`totalmember-${index}`"
          >
            {{ totalmember_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Additions (members)
          </td>
          <td class="text-right">
            {{ items.total_addition_member }}
          </td>
          <td
            class="text-right"
            v-for="(totaladdition_member_filter,
            index) in items.total_addition_member_with_filter"
            :key="`totaladdition-member-${index}`"
          >
            {{ totaladdition_member_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Additions (dependents)
          </td>
          <td class="text-right">
            {{ items.total_addition_dependent }}
          </td>
          <td
            class="text-right"
            v-for="(totaladdition_dependent_filter,
            index) in items.total_addition_dependent_with_filter"
            :key="`totaladdition-dependent-${index}`"
          >
            {{ totaladdition_dependent_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Terminations (members)
          </td>
          <td class="text-right">
            {{ items.total_termination_member }}
          </td>
          <td
            class="text-right"
            v-for="(totaltermination_member_filter,
            index) in items.total_termination_member_with_filter"
            :key="`totaltermination-member-${index}`"
          >
            {{ totaltermination_member_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Terminations (dependents)
          </td>
          <td class="text-right">
            {{ items.total_termination_dependent }}
          </td>
          <td
            class="text-right"
            v-for="(totaltermination_dependent_filter,
            index) in items.total_termination_dependent_with_filter"
            :key="`totaltermination-dependent-${index}`"
          >
            {{ totaltermination_dependent_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Transfers
          </td>
          <td class="text-right">
            {{ items.total_transfer }}
          </td>
          <td
            class="text-right"
            v-for="(total_transfer_filter,
            index) in items.total_transfer_with_filter"
            :key="`totaltransfer-${index}`"
          >
            {{ total_transfer_filter }}
          </td>
        </tr>
        <tr>
          <td class="font-weight-bold no-wrap">
            Total Edits
          </td>
          <td class="text-right">
            {{ items.total_update }}
          </td>
          <td
            class="text-right"
            v-for="(total_update_filter,
            index) in items.total_update_with_filter"
            :key="`totalupdate-${index}`"
          >
            {{ total_update_filter }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "report-general-statistics",
  props: {
    items: Object
  },
  computed: {
    isItemEmpty() {
      return typeof this.items.message !== "undefined";
    }
  },
  watch: {
    isItemEmpty(newValue) {
      this.$emit("export", newValue ? false : true);
    }
  },
  mounted() {
    this.$emit("export", this.isItemEmpty ? false : true);
  }
};
</script>

<style lang="scss" scoped>
.v-simple-table {
  max-width: 100%;
}

.no-wrap {
  white-space: nowrap;
}
</style>
