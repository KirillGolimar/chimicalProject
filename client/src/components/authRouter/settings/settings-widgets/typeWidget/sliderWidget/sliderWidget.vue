<template>
    <div class="slider-widget">
      <div class="slider-widget__workspace" :style="{width: sizeAllContainer + '%', marginLeft: - sliderOffsetStep * sliderActive + '%'}">
          <div class="slider-widget__workspace-el"
               v-if="!numberElSlider"
               v-for="(el, i) in dataSlider"
               :key="i"
               :style="{width: sliderOffsetStep + '%'}">
            <span>{{ el }}</span>
          </div>
      </div>
      <div class="slider-widget__navigation">
        <div class="slider-widget__navigation-next" @click="sliderStep('next')">

        </div>
        <div class="slider-widget__navigation-back" @click="sliderStep('back')">

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sliderWidget",
        props: {
            // данные по slider
            dataSlider: {
                type: Array,
                default: () => []
            },
            test: {
              type: String,
              default: ''
            },
            /**
             * параметр отвечающий за количество отображаемых элементов на каждой странице слайдера
             * :TODO пока что напишу 1 элемент на 1 странице
             */
            numberElSlider: {
                type: Number,
                default: null
            },
            /**
             * параметр отвечающий за автоматическую смену страниц
             */
            auto: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                sliderEl: null, // количество элементов slider`а,
                sliderAllCount: null, // количество страниц слафдера
                sliderActive: 0, //активный слайдер
                sizeAllContainer: null, //размер всего блока под странички слайдера
                sliderOffsetLeft: null,// Отступ тела со слайдами в контейнере
                sliderOffsetStep: null, // Шаг одного слайда = его длина
            }
        },
        methods: {
            /**
             * метод инициализации слайдера
             */
            initComp() {
                this.sliderEl = this.dataSlider.length; // записал количество элементов в slider
                if(this.numberElSlider) {
                    //:TODO потом дописать логику отображения по несколько эл в слайдере
                }
                // если 1 элемент = 1 слайдеру, тогда приравниваю их
                else {
                    this.sliderAllCount = this.sliderEl;
                }
                this.sliderOffsetStep = 100; // записал размер 1 шага ( весь блок по ширине ) :TODO возможно нужно этот параметр перезаписывать от размера окна
                this.sliderOffsetLeft = this.sliderActive * this.sliderOffsetStep; // записал отступ а слайдере (по факту присвоил 0, но если параметр измениться тогда перерасчёт будет сразу)
                this.sizeAllContainer = this.sliderOffsetStep * this.sliderAllCount; // записал общий размер блока под slider
            },
            /**
             * метод перехода по страничкам
             * @param action - куда идем
             */
            sliderStep(action) {
                if(action === 'next') {
                    if(this.sliderActive === this.sliderAllCount-1) {
                        this.sliderActive = 0
                    } else {
                        this.sliderActive++
                    }
                } else {
                    if(this.sliderActive === 0) {
                        this.sliderActive = this.sliderAllCount-1
                    } else {
                        this.sliderActive--
                    }
                }
            },
        },
        mounted() {
            this.initComp()
        },
    }
</script>

<style lang="less">
.slider-widget {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  &__workspace {
    min-width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: nowrap;
    transition: .2s ease-in-out;
  }
  &__navigation {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    > div {
      width: 2em;
      height: 2em;
      border: 1px solid gray;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      cursor: pointer;
      border-radius: 50%;
    }
    &-next {
      top: calc(50% - 2em);
      right: 15px;
    }
    &-back {
      top: calc(50% - 2em);
      left: 15px;
    }
  }
}
</style>
