<template>
    <div class="card-in-slider">
      <div class="card-in-slider__body" @mousedown="activeSlider=true" @mouseup="activeSlider=false">
        <div class="card-in-slider__body-el" v-for="(el,i) in dataSlider" :style="styleEl">
            <card-mini :data-card="el"/>
        </div>
      </div>
    </div>
</template>

<script>
    import CardMini from "../../../../../mainComponent/card/card-mini";
    export default {
        name: "cardInSlider",
        components: {CardMini},
        props: {
            // данные по слайдеру
            dataSlider: {
                type: Array,
                default: () => [
                    {title:'карточка 1 1 3211 1 321 32132 123 1321 321 32',description:'какое то описание 1 какое то описание 1 какое то описание 1 какое то описание 1 какое то описание 1 какое то описание 1',img:'123123', link:'asdasdasd', modification:'new'},
                    {title:'карточка 2',description:'какое то описание 2',img:'', link:'', modification:''},
                    {title:'карточка 3',description:'какое то описание 3',img:'', link:'', modification:''},
                    {title:'карточка 4',description:'какое то описание 4',img:'', link:'', modification:''},
                    {title:'карточка 5',description:'какое то описание 5',img:'', link:'', modification:''},
                ]
            },
            sizeCont: {
                type: String,
                default: ''
            },
        },
        computed: {
          styleEl() {
              return {width:`${this.sizeCard}px`, minWidth: `${this.sizeCard}px`}
          }
        },
        data() {
            return {
                pageCounter: null, // количество страниц с учётом изменения размера блока под карточки
                sizeCard: 250, // размер карточки
                activeSlider: false // флаг отвечает за состяние нажатия и убирания прокрутки
            }
        },
        watch: {
            activeSlider(data) {
                console.log(data)
                //TODO как уже буду писать дял главной страницы Тогда и смотреть (без drag and drop)
            }
        }
    }
</script>

<style lang="less">
.card-in-slider {
  width: 100%;
  height: calc(100% - 32px);
  position: relative;
  &__body {
    height: 100%;
    overflow-x: auto;
    max-width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding: 15px;
    box-sizing: border-box;

    &-el {
      height: 100%;
      background: #FFFFFF;
      box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
      border-radius: 4px;
      margin: 0 9px;
    }
  }
}
</style>
