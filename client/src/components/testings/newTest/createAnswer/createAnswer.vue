<template>
  <div class="create-answer">
    <div class="create-answer__header">
      <span>Варианты ответов</span>
    </div>
    <div class="create-answer__body">
      <div class="create-answer__body-all">
        <div class="create-answer__body-all__item" v-for="(answer, i ,arr) in get_answer">
          <span>{{ answer.description }}</span>
          <span @click="deleteAnswer(answer.id)">---</span>
        </div>
      </div>
      <div class="create-answer__body-new">
        <span @click="newAnswer">создать новый вариант ответа</span>
        <div class="create-answer__body-new__form" v-if="newAnswerFlag">
          <span>введите описание варианта ответа</span>
          <input type="text" v-model="dataAnswerNew">
          <span @click="saveNewAnswwer">сохранить</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "createAnswer",
        data() {
            return {
                newAnswerFlag: false,
                dataAnswerNew: ''
            }
        },
        computed: {
            get_answer() {
                return this.$store.getters.get_answers
            }
        },
        methods: {
            /**
             * метод вызова действия из хранилища ( по удалению варианта ответа )
             * @param id
             */
            deleteAnswer(id) {
                let deleteAnswer = confirm('вы уврены что хоитте удалить ответ');
                if (deleteAnswer) {
                    this.$store.dispatch('DELETe_answer', {id: id})
                }
            },
            /**
             * метод отображения нового варианта ответа
             */
            newAnswer() {
                this.newAnswerFlag = !this.newAnswerFlag
            },
            /**
             * метод по сохранению нового варианта ответа
             */
            saveNewAnswwer() {
                if (this.dataAnswerNew !== '') {
                    this.$store.dispatch('ADD_answer', {description: this.dataAnswerNew})
                    this.newAnswer()
                }
            }
        }

    }
</script>

<style lang="less">
  .create-answer {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    box-shadow: 0 10px 30px rgba(209, 213, 223, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;

    &__header {
      width: 100%;
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;

      > span {
        font-size: 12px;
        color: #1e1e1e;
        font-weight: 500;
      }
    }

    &__body {
      width: 100%;
      height: 100%;
      display: flex;

      &-all {
        width: 70%;
        height: 100%;
      }

      &-new {
        width: 30%;
        height: 100%;
      }
    }
  }
</style>
