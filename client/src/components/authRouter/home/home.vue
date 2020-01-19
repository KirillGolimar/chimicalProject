<template>
  <div id="home" style="margin-top: 45px">
    <div class="home">
      <div class="home-title">
        <span>Домашняя</span>
      </div>
      <div class="home-body">

        <layout big>
          <layout style="padding: 5px" third>
            <cm__selection-test-card :dataCard="dataCardTest[0]"/>
          </layout>
          <layout style="padding: 5px" third>
            <cm__selection-test-card :dataCard="dataCardTest[1]"/>
          </layout>
          <layout style="padding: 5px" third>
            <cm__selection-test-card :dataCard="dataCardTest[1]"/>
          </layout>
        </layout>
        <layout big>
          <layout style="padding: 5px" helf>
            <cm__selection-test-card :dataCard="dataCardTest[2]"/>
          </layout>
          <layout style="padding: 5px" helf>
            <cm__selection-test-card :dataCard="dataCardTest[3]"/>
          </layout>
        </layout>
      </div>
    </div>
  </div>
</template>

<script>
    import Layout from "../../layout/layout";
    import Slider from "../../slider/slider";
    import Cm__selectionTestCard from "../../testings/test-selection/cm__selection-test-card";

    export default {
        name: "home",
        components: {Cm__selectionTestCard, Slider, Layout},
        data() {
            return {
                dataInfoSlider: {
                    title: 'Информационный блок 1',
                },
                dataCardTest: [
                    {
                        id: '1',
                        title: 'Название теста № 1',
                        info: "какая то информация по тесту",
                        category: 'Категория',
                        link: 'http://localhost:8081/test:id',
                        status: true,
                        img: '../../../static/image/fonNews.png'
                    },
                    {
                        id: '2',
                        title: 'Название теста № 2',
                        info: "какая то информация по тесту",
                        category: 'Категория',
                        link: 'http://localhost:8081/test:id',
                        status: false,
                        img: '../../../static/image/fonNews.png'
                    },
                    {
                        id: '3',
                        title: 'Название теста № 3',
                        info: "какая то информация по тесту",
                        category: 'Категория',
                        link: 'http://localhost:8081/test:id',
                        status: false,
                        img: '../../../static/image/fonNews.png'
                    },
                    {
                        id: '4',
                        title: 'Название теста № 4',
                        info: "какая то информация по тесту",
                        category: 'Категория',
                        link: 'http://localhost:8081/test:id',
                        status: true,
                        img: '../../../static/image/fonNews.png'
                    },
                ]
            }
        },
        mounted() {
            this.$store.commit('SET_LOADER', false);
        }
    }
</script>

<style lang="less">
  #home {
    width: 100%;
    height: 200vh;
    padding: 1vh;
    box-sizing: border-box;

    .home {
      width: 100%;
      height: 100%;

      &-title {
        width: 100%;
        height: 50px;

        > span {
          padding: 5px 15px;
          font-size: 36px;
          color: black;
          letter-spacing: 0.02em;
        }
      }

      &-body {
        width: 100%;
        height: auto;
      }
    }
  }
</style>
