<template>
    <div class="widget-container" :style="sizeContainer">
      <div class="widget-container__title">
        <span>Название виджета - {{ idWidget }}</span>
      </div>
      <div class="widget-container__icons" v-if="settings">
        <div class="widget-container__icons-settings" @click="actionsIocn('settings')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.6875 18.9845C22.9062 19.1095 23 19.3282 22.9687 19.6407C22.9687 19.922 22.8437 20.172 22.5937 20.3907L20.2968 22.6876C19.8281 23.1563 19.3593 23.1563 18.8906 22.6876L9.79684 13.5938C8.67184 14.0626 7.46872 14.172 6.18747 13.922C4.93747 13.6407 3.84372 13.0313 2.90622 12.0938C1.90622 11.0938 1.28122 9.90633 1.03122 8.53133C0.781215 7.15633 0.968715 5.87508 1.59372 4.68758L5.99997 9.00008L8.99996 6.00008L4.68747 1.68758C5.87497 1.12508 7.15622 0.953203 8.53122 1.17195C9.90622 1.3907 11.0937 2.00008 12.0937 3.00008C13.0312 3.93758 13.625 5.04695 13.875 6.3282C14.1562 7.5782 14.0625 8.7657 13.5937 9.8907L22.6875 18.9845Z" fill="#666666"/>
          </svg>
        </div>
        <div class="widget-container__icons-delete" @click="actionsIocn('delete')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.9844 3.98438V6H5.01562V3.98438H8.48438L9.51562 3H14.4844L15.5156 3.98438H18.9844ZM6 18.9844V6.98438H18V18.9844C18 19.5156 17.7969 19.9844 17.3906 20.3906C16.9844 20.7969 16.5156 21 15.9844 21H8.01562C7.48438 21 7.01562 20.7969 6.60938 20.3906C6.20312 19.9844 6 19.5156 6 18.9844Z" fill="#666666"/>
          </svg>

        </div>
      </div>
    </div>
</template>

<script>

    import WidgetTest from "../typeWidget/test/widgetTest";
    export default {
        name: "widgetContainer",
        components: {WidgetTest},
        props: {
            // полный размер 100%
            full : {
                type: Boolean,
                default: false
            },
            // id виджета
            idWidget: {
                type: Number,
                default: null
            },
            // отображения блок настроек
            settings: {
                type: Boolean,
                default: true
            }
        },
        computed: {
            // правило размеров виджетов
            sizeContainer() {
                return this.full ? `width: calc(100% - 2em)` : `width : calc(50% - 2em)`
            },
        },
        methods :{
            actionsIocn(nameActions) {
                switch (nameActions) {
                    case 'delete':
                        this.$emit('actions', {id:this.idWidget, actions: 'delete'})
                        break;
                    case 'settings':
                        this.$emit('actions', {id:this.idWidget, actions: 'settings'})
                        break;
                }
            }
        }
    }
</script>

<style lang="less">
.widget-container {
  height: 300px;
  background: #FFFFFF;
  box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
  border-radius: 4px;
  margin: 1em;
  box-sizing: border-box;
  position: relative;
  &__title {
    width: 100%;
    height: 32px;
    display: flex;
    align-items: center;
    > span {
      font-weight: 300;
      font-size: 16px;
      line-height: 18px;
      letter-spacing: 0.02em;
      color: rgba(42, 42, 42, 0.42);
      padding-left: 15px;
    }
  }
  &__icons {
    position: absolute;
    right: 5px;
    top: 5px;
    display: flex;
    > div {
      width: 25px;
      height: 25px;
      margin: 4px;
    }
  }
}
</style>
