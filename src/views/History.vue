<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Recording History' | localize}}</h3>
    </div>


    <Loader v-if="loading"/>

    <p class="center" v-else-if="!records.length">
      {{ 'There are no records yet' | localize}}.
      <router-link to="/record">{{ 'Add the first one' | localize}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items"/>

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '../mixins/pagination.mixin'
import HistoryTable from "../components/HistoryTable";
import localizeFilter from "../filters/localize.filter";

export default {
  metaInfo(){
    return{
      title: this.$title('Menu_History')
    }
  },
  name: 'history',
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
    isRuLocale: true
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    const categoires = await this.$store.dispatch('fetchCategories')

    this.setup(categoires)

    this.loading = false
  },
  methods: {
    setup(categoires){
      this.setupPagination(this.records.map(record => {
        return {
          ...record,
          categoryName: categoires.find(c => c.id === record.categoryId).title,
          typeClass: record.type === 'income' ? 'green' : 'red',
          typeText: record.type === 'income' ? 'Доход' : 'Расход',
        }
      }))
    }
  },
  components: {
    HistoryTable
  }
}
</script>
