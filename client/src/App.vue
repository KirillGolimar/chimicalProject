<template>
  <div>
    <span @click="flagModalDannone = true">Клик</span>
    <transition name="modal-danone">
      <rabota-modal-danone
        :data-report-form="dataCardModal"
        @modalClose="modalCloseParent"
        v-if="flagModalDannone"
        @openPhoto="openPhotoParent"
      />
      <modal-slider v-if="flagModalSlider" :data-slider="dataSlider" @closeModalSlider="closeModalSliderParent"/>
    </transition>
  </div>

</template>

<script>
    import RabotaModalDanone from "./components/rabota-modal-danone/rabota-modal-danone";
    import ModalSlider from "./components/rabota-modal-danone/modalSlider/modalSlider";

    export default {
        name: 'App',
        components: {ModalSlider, RabotaModalDanone},
        computed: {},
        data() {
            return {
                flagModalDannone: false,
                flagModalSlider: false,
                dataCardModal: {
                    task: {
                        description: `Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес: во всех ДМ переставить каши
                            согласно стандартам компании Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03.
                            Бизнес: во всех ДМ переставить каши согласно стандартам компании. Советская переставить нутрилон супер премиум на золотую полку. Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес: во всех ДМ переставить каши
                            согласно стандартам компании Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03. Бизнес : кораблик г. Егорьевск ул. Советская переставить нутрилон супер премиум на золотую полку.
                            В тт кораблик гудзон проверить сроки годности на всю продукцию до 22.03.
                            Бизнес: во всех ДМ переставить каши согласно стандартам компании. Советская переставить нутрилон супер премиум на золотую полку.`,
                        status: 'Запланировано',
                        dateStaging: '30.08.2019',
                        dateFulfillment: '10.09.2019',
                        dateCompletion: '15.09.2019',
                        valuationForm: 'Стандартные работы MR',
                        author: ['Иванов Иван Иванович', 'Иванов 1 Иван 1 Иванович 1'], // авторы задачи
                        executorTask: 'Петров Петр Петрович', //исполнитель задачи
                        levelOneUnit: 'Представительство в Красногорском районе Московской области', // подразделение 1гшо уровня
                        executiveDivision: 'Отдел продаж',//Подразделение испольнителя

                    },
                    comment: {
                        author: [{
                            date: '10.09.2019',
                            description: 'Бизнес: во всех ДМ переставить каши согласно стандартам компании'
                        }],
                        executor: [{
                            date: '10.09.2019',
                            description: 'Бизнес: 12312 12 3123 123 123 123 123 123 123 12 3'
                        }]
                    },
                    snapshots: {
                        author: [
                            {
                                url: './../../../../static/image/authorization.jpg',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },
                            {
                                url: './../../../../static/image/fonNews.png',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },
                            {
                                url: './../../../../static/image/Backgraund.png',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },
                        ], //снимки авторов
                        executor: [
                            {
                                url: './../../../../static/image/Backgraund.png',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },
                            {
                                url: './../../../../static/image/authorization.jpg',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },
                            {
                                url: './../../../../static/image/fonNews.png',
                                download: 'urlkasd;alksdkas; ;laksd ;l',
                                date: '22.02.12'
                            },

                        ] // снимки исполнителей
                    }
                },
                dataSlider: {
                    page: null, // сколько всего картинок
                    activePage: null, // активная картинка
                    arrayUrl: null, //массив картинок
                    from: null // в каком блоке
                }
            }
        },
        methods: {
            modalCloseParent() {
                this.flagModalDannone = false;
            },
            // Обработка клика выбора фотографии
            openPhotoParent(data) {
                this.dataSlider.from = data.type;
                this.dataSlider.page = this.dataCardModal.snapshots[data.type].length - 1;
                this.dataSlider.arrayUrl = this.dataCardModal.snapshots[data.type].slice().map(el => el.url);
                this.dataCardModal.snapshots[data.type].forEach((el, i) => el.url === data.url ? this.dataSlider.activePage = i : '');
                this.flagModalDannone = false;
                this.flagModalSlider = true;
            },
            closeModalSliderParent() {
                this.flagModalDannone = true;
                this.flagModalSlider = false;
            }
        }
    }
</script>

<style lang="less">
  .modal-danone-enter-active {
    transition: all .1s ease;
  }

  .modal-danone-leave-active {
    transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .modal-danone-enter, .modal-danone-leave-to {
    transform: scale(0.7);
    opacity: 0;
  }
</style>
