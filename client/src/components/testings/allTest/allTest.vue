<template>
    <div class="all-test">
      <MC__table
        :data-table="allTest"
        :number-row="15"
        :settings-actions-table="true"
        :checked-active="true"
        :title-table="'testingAll'"
        :settings="[_('delete'),_('view')]"
        @actionsTable="actionsTableParent"
        @changeRow="changeRowParent"
      />
    </div>
</template>

<script>
    import MC__table from "../../mainComponent/SystemTable/table/MC__table";
    export default {
        name: "allTest",
        components: {MC__table},
        computed: {
            // подготовка данных для табличного представления тестов
            allTest() {
                let newArray = [];
                this.$store.getters.get_allTest.forEach(el => {
                    newArray.push({
                        id: el.id,
                        nameTest: el.nameTest,
                        questionNumber: el.questId.length,
                        assessment: el.settings.assessment,
                        time: el.settings.time.flag ? el.settings.time.time : ''
                    })
                });
                return newArray
            }
        },
        data() {
          return {
              flagRow: false, // флаг отвечает за выбираем несколько строк или просто кликаем по 1
              dataRow: [], //массив id строки ( -ля)
          }
        },
        methods: {
            initComp() {
                this.$store.dispatch('GET_AllTest')
            },
            actionsTableParent(data) {
                if (!this.flagRow) {
                    this.dataRow = [];
                    this.dataRow.push(data.el.id) // записал id  строки при событии ( если не выбрал через checked )
                }
                switch (data.action) {
                    case this._('delete'):
                        let status = confirm(`вы действительно хотите удалить тесты`);
                        if (status) {
                            console.log(`отправка на удаление вопросов -${this.dataRow.join(',-')}`)
                        }
                        break;
                    case this._('view'):
                        console.log('просмотр');
                        this.$store.dispatch('CHANGE_STATUS', data.el.id);
                        break;
                }
            },
            /**
             * обработка выбора строки
             */
            changeRowParent(data) {
                if (!this.flagRow) {
                    this.dataRow = []
                }
                if (!data.value) {
                    this.dataRow.splice(this.dataRow.findIndex(el => el === data.id), 1);
                    if (this.dataRow.length === 0) {
                        this.flagRow = false
                    }
                } else {
                    this.dataRow.push(data.id);
                    this.flagRow = true
                }
            },
        },
        mounted() {
            this.initComp()
        }
    }
</script>

<style lang="less">
.all-test {

}
</style>
