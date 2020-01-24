<template>
    <div class="modal-view" >
        <div class="modal-view__actions" @mouseenter="flagActions = true" @mouseleave="flagActions = false">
          <div class="actions-icon" v-if="!flagActions" >++</div>
          <div v-if="flagActions" class="modal-view__actions-close" @click="closeModalView">X</div>
        </div>
        <div class="modal-view__container">

        </div>
    </div>
</template>

<script>
    export default {
        /**
         * компонент общий контайнер для просмотра файлов
         */
        name: "modalView",
        props: {
            typeFile: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                flagActions: false
            }
        },
        watch : {
            flagActions(data) {
                console.log(data)
            }
        },
        methods: {
            // закрытие модалки просмотра
            closeModalView() {
                this.$emit('closeModalView')
            },
        }
    }
</script>

<style lang="less">
.modal-view {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(128, 128, 128, 0.09);
  animation: openModalView .3s ease-in-out forwards;
  display: flex;
  justify-content: center;
  align-items: center;
  &__actions {
    width: 75px;
    height: 35px;
    border: 1px solid gray;
    position: absolute;
    right: 15px;
    top: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      opacity: 0;
      transform: translateX(-50px);
      animation: activeSettings .2s ease-in-out forwards;
    }

  }
  &__container {
    width: 80%;
    height: 80%;
    background: rgba(30, 30, 30, 0.46);
  }

  @keyframes openModalView {
    0% {
      opacity: 0.3;
      transform: scale(.1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
  @keyframes activeSettings {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
}
</style>
