<template>
  <div>
    <v-data-table
      dense
      :headers="headers"
      :items="items"
      :options.sync="options"
      :server-items-length="total"
      :footer-props="{
        disableItemsPerPage: true,
        itemsPerPageOptions: [25],
      }"
      item-key="items.data.indexOf(id)"
      class="elevation-1"
    >
      <template v-slot:item.page="{ item }">
        <span :style="getColor(item.page)" class="capitalize">
          {{ item.page }}
        </span>
      </template>
      <template v-slot:item.mfa="{ item }">
        {{ mfaText(item.mfa) }}
      </template>
      <template v-slot:item.enter_date="{ item }">
        {{ displayLocalDate(item.enter_date) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { utcToZonedTime, format } from "date-fns-tz";

export default {
  name: "AccessHistoryTable",
  props: {
    items: Array,
    total: Number,
    currentPage: Number,
  },
  data() {
    return {
      options: {},
      itemsPerPageOptions: [30, 100],
      headers: [
        { text: "Name", value: "name" },
        { text: "Company", value: "company" },
        { text: "MFA", value: "mfa" },
        { text: "Page", value: "page" },
        {
          text: "IP",
          sortable: false,
          value: "ip",
        },
        { text: "Date", value: "enter_date" },
      ],
    };
  },
  watch: {
    options: {
      handler() {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options;
        if (this.currentPage !== page) {
          this.$emit("pageChange", {
            page: page,
            itemsPerPage: itemsPerPage,
            sortBy:
              Array.isArray(sortBy) && sortBy.length > 0 ? sortBy[0] : null,
            sortDesc:
              Array.isArray(sortDesc) && sortDesc.length > 0
                ? sortDesc[0]
                : null,
          });
        }
      },
      deep: true,
    },
  },
  methods: {
    getColor(page) {
      if (page.indexOf("Success") > -1) {
        return "color: #4CAF50";
      } else if (page.indexOf("Fail") > -1) {
        return "color: #F44336";
      }
    },
    mfaText(id) {
      const mfaText = ["No", "Yes (Questions)", "Yes (Code)"];
      return mfaText[id] || "No";
    },
    displayLocalDate(date) {
      const localTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const zonedDate = utcToZonedTime(new Date(`${date}Z`), localTimeZone);
      return format(zonedDate, "yyyy-MM-dd (HH:mm:ss)");
    },
  },
};
</script>

<style>
.capitalize {
  text-transform: capitalize;
}
</style>
