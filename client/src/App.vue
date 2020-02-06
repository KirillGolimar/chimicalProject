<template>
      <div>
        <rabota-modal-danone />
        <modal-editing />
      </div>
</template>

<script>

    import RabotaModalDanone from "./components/rabota-modal-danone/modalView/rabota-modal-danone";
    import ModalSlider from "./components/rabota-modal-danone/modalView/modalSlider/modalSlider";
    import ModalEditing from "./components/rabota-modal-danone/modalEditing/modalEditing";

    export default {
        name: 'App',
        components: {ModalEditing, ModalSlider, RabotaModalDanone},
    }
</script>

<style lang="less">

</style>
