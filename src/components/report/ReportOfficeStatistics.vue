<template>
  <v-simple-table>
    <template v-slot:default>
      <thead v-if="!isItemEmpty">
        <tr>
          <th class="text-right" style="width:280px;"></th>
          <th
            class="text-left font-weight-bold no-wrap"
            v-for="(datetime, index) in items.datetimePeriod"
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
          <td
            class="font-weight-bold"
            style="background-color: #EEEEEE"
            :colspan="getColumn"
          >
            Total number of clients managed by each office
          </td>
        </tr>
        <tr
          v-for="(company, index) in items.totalCompany"
          :key="`company-${index}`"
        >
          <td>{{ company.Service_Office }}</td>
          <td
            class="text-right"
            v-for="(totalCompany, index) in company.total"
            :key="`total-company-${index}`"
          >
            {{ totalCompany }}
          </td>
          <td class="text-right" style="background-color: #eaf1f5">
            {{ sumTotalByRegion(items.totalCompany, company.Service_Office) }}
          </td>
        </tr>
        <tr style="background-color: #eaf1f5">
          <td>Total</td>
          <td
            class="text-right"
            v-for="(datetime, index) in items.datetimePeriod"
            :key="`total-company-datetime-${index}`"
          >
            {{ sumTotalByDatePeriod(items.totalCompany, index) }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="background-color: #EEEEEE"
            :colspan="getColumn"
          >
            Total number of HRs managed by each office
          </td>
        </tr>
        <tr v-for="(hr, index) in items.totalHr" :key="`hr-${index}`">
          <td>{{ hr.Service_Office }}</td>
          <td
            class="text-right"
            v-for="(hrtotal, index) in hr.total"
            :key="`hr-total-${index}`"
          >
            {{ hrtotal }}
          </td>
          <td class="text-right" style="background-color: #eaf1f5">
            {{ sumTotalByRegion(items.totalHr, hr.Service_Office) }}
          </td>
        </tr>
        <tr style="background-color: #eaf1f5">
          <td>Total</td>
          <td
            class="text-right"
            v-for="(datetime, index) in items.datetimePeriod"
            :key="`total-hr-datetime-${index}`"
          >
            {{ sumTotalByDatePeriod(items.totalHr, index) }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="background-color: #EEEEEE"
            :colspan="getColumn"
          >
            Total number of policies managed by each office
          </td>
        </tr>
        <tr
          v-for="(policy, index) in items.totalPolicy"
          :key="`policy-${index}`"
        >
          <td>{{ policy.Service_Office }}</td>
          <td
            class="text-right"
            v-for="(policyTotal, index) in policy.total"
            :key="`policyfilter-${index}`"
          >
            {{ policyTotal }}
          </td>
          <td class="text-right" style="background-color: #eaf1f5">
            {{ sumTotalByRegion(items.totalPolicy, policy.Service_Office) }}
          </td>
        </tr>
        <tr style="background-color: #eaf1f5">
          <td>Total</td>
          <td
            class="text-right"
            v-for="(datetime, index) in items.datetimePeriod"
            :key="`total-policy-datetime-${index}`"
          >
            {{ sumTotalByDatePeriod(items.totalPolicy, index) }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="background-color: #EEEEEE"
            :colspan="getColumn"
          >
            Total number of members/employees <br />
            managed by each office
          </td>
        </tr>
        <tr
          v-for="(member, index) in items.totalMember"
          :key="`member-${index}`"
        >
          <td>{{ member.Service_Office }}</td>
          <td
            class="text-right"
            v-for="(memberTotal, index) in member.total"
            :key="`memberfilter-${index}`"
          >
            {{ memberTotal }}
          </td>
          <td class="text-right" style="background-color: #eaf1f5">
            {{ sumTotalByRegion(items.totalMember, member.Service_Office) }}
          </td>
        </tr>
        <tr style="background-color: #eaf1f5">
          <td>Total</td>
          <td
            class="text-right"
            v-for="(datetime, index) in items.datetimePeriod"
            :key="`total-member-datetime-${index}`"
          >
            {{ sumTotalByDatePeriod(items.totalMember, index) }}
          </td>
          <td></td>
        </tr>
        <tr>
          <td
            class="font-weight-bold"
            style="background-color: #EEEEEE"
            :colspan="getColumn"
          >
            Total login time
          </td>
        </tr>
        <tr v-for="(login, index) in items.totalLogin" :key="`login-${index}`">
          <td>{{ login.Service_Office }}</td>
          <td
            class="text-right"
            v-for="(logintotal, index) in login.total"
            :key="`logintotal-${index}`"
          >
            {{ logintotal }}
          </td>
          <td class="text-right" style="background-color: #eaf1f5">
            {{ sumTotalTimeByRegion(items.totalLogin, login.Service_Office) }}
          </td>
        </tr>
        <tr style="background-color: #eaf1f5">
          <td>Total</td>
          <td
            class="text-right"
            v-for="(datetime, index) in items.datetimePeriod"
            :key="`login-total-datetime-${index}`"
          >
            {{ sumTotalTimeByDatePeriod(items.totalLogin, index) }}
          </td>
          <td></td>
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
  data() {
    return {
      allTotal: 0
    };
  },
  computed: {
    getColumn() {
      return Object.keys(this.items.datetimePeriod).length + 2;
    },
    isItemEmpty() {
      return typeof this.items.message !== "undefined";
    }
  },
  watch: {
    isItemEmpty(newValue) {
      this.$emit("export", newValue ? false : true);
    }
  },
  methods: {
    sumTotalByRegion(items, key) {
      return items
        .find(item => item.Service_Office === key)
        .total.reduce((a, b) => a + b, 0)
        .toLocaleString();
    },
    sumTotalByDatePeriod(items, key) {
      const sumTotal = items.reduce((a, b) => a + (b.total[key] || 0), 0);
      return sumTotal.toLocaleString();
    },
    sumTotalTimeByRegion(items, key) {
      const totalTime = items.find(item => item.Service_Office === key).total;
      return this.sumTotalTime(totalTime);
    },
    sumTotalTimeByDatePeriod(items, key) {
      const totals = items.map(item => item.total[key] || "00:00:00");
      return this.sumTotalTime(totals);
    },
    sumTotalTime(times) {
      const factors = [3600, 60, 1];
      let seconds = times.reduce(
        (seconds, time) =>
          time.split(":").reduce((s, t, i) => s + t * factors[i], seconds),
        0
      );
      return factors
        .map(factor => {
          let value = Math.floor(seconds / factor);
          seconds -= value * factor;
          return value.toString().padStart(2, 0);
        })
        .join(":");
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
