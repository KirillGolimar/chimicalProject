<template>
  <div class="settings-widget">
    <div class="settings-widget__title">
      <span>Настройка виджетов системы</span>
    </div>
    <div class="settings-widget__body">
      <div class="settings-widget__body-role">
        <list label="выберите настраиваемую роль"
              :data-list="listUsers"
              @choice="choiceParentQuestion"
        />
        <span v-if="activeRole!== ''">выбранная роль - {{ activeRole }}</span>
      </div>
      <div class="settings-widget__body-widget">
        <list label="выберите виджет"
              :data-list="listWidgetNoActive.filter(el => !el.status)"
              name-field="name"
              results-search-empty="извините, но нет выджетов которые можно добавить"
              @choice="choiceActiveWidget"
        />
        <selection-button
          v-if="activeWidgetInServer" :selection="['сохранить виджет (стандард)','сохранить виджет (full)']"
          @saveActions="saveActionsParent"/>
      </div>
      <div class="settings-widget__body-widgets">
        <widget-container
          v-for="widget in listActiveWidget"
          :full="widget.full"
          :id-widget="widget.id"
          @actions="actionsWidget"/>
      </div>
    </div>
  </div>
</template>

<script>

  import WidgetContainer from "./widgetContainer/widgetContainer";
  import List from "../../../mainComponent/list/list";
  import SelectionButton from "../../../mainComponent/selectionButton/selectionButton";

  export default {
    name: "settingsWidget",
    components: {SelectionButton, List, WidgetContainer},
    computed: {
      // возврат списка ролей
      listUsers() {
        return this.$store.getters.get__allRoles
      },
      // возврат всех доступных виджетов, пересборка ( не добавленные  false) (добавленые true )
      listWidgetNoActive() {
        const widgets = this.$store.getters.get__widgets;
        const res = [];
        widgets.allWidgetsInRole.forEach((el, i) => {
          res.push({id: el.id, name: el.name});
          widgets.activeWidgetsId.map(elActive => elActive.id).includes(el.id) ? res[i].status = true : res[i].status = false
        });
        return res
      },
      // возврат активных виджетов
      listActiveWidget() {
        return this.$store.getters.get__widgets.activeWidgetsId
      }
    },
    data() {
      return {
        activeRole: '', // активная роль ( для настйроки )
        activeWidgetInServer: null
      }
    },
    watch: {
      /**
       * как только меняеться выбранная роль, отправляю запрос на получение всех доступных виджетов и всех активных виджетов по данной роли ( с хранилища )
       */
      activeRole(data) {
        this.$store.dispatch('init__constructorWidget', {role: data})
      }
    },
    methods: {
      /**
       * обработка выбора роли
       */
      choiceParentQuestion(data) {
        this.activeRole = data.join('')
      },
      /**
       * обработка, добавления нового виджета (перед сохранением на сервере)
       * @param data
       */
      choiceActiveWidget(data) {
        this.activeWidgetInServer = {
          id: data[0].id,
          role: this.activeRole,
          full: false
        };
        //:TODO нужно написать добавление нового активного элеемнта и после принять по новой данные
      },
      /**
       * метод сохранения
       */
      saveActionsParent(data) {
        data === 'сохранить виджет (full)' ? this.activeWidgetInServer.full = true : '';
        this.$store.dispatch('add__widget', this.activeWidgetInServer);
        this.activeWidgetInServer = null;
      },
      /**
       * обработка события удаления виджета из активных ( логика в хранилище )
       * @param data
       */
      actionsWidget(data) {
        switch (data.actions) {
          case 'delete':
            this.$store.dispatch('delete__widgetActive', {role: this.activeRole, id: data.id});
            break;
          case 'settings':
            console.log('какие могут быть настйроки по изменению виджетов ? ') //:TODO нужно подумать хорошенко и поделать))
            break;
        }

      },

    },
    mounted() {
      this.$store.dispatch('init__widgets')
    }
  }
</script>

<style lang="less">
  .settings-widget {
    width: 100%;
    height: 300px;

    &__title {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 15px;

      > span {
        font-weight: 300;
        font-size: 34px;
        line-height: 32px;
        letter-spacing: 0.02em;
        color: rgba(42, 42, 42, 0.09);
      }
    }

    &__body {
      width: 100%;

      &-role {
        width: 250px;
        height: 50px;
      }

      &-widgets {
        width: 100%;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
      }
    }
  }
</style>
