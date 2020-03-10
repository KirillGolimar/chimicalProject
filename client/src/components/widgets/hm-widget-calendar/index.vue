<template>
  <div class="hm-widget-calendar">
    <div class="hm-widget-calendar__block">
      <div class="hm-widget-calendar__block-cal">
        <calendar
          :events="dataCalendar"
          @activeDays="activeDaysParent"
          @initCalendarDate="initCalendarDateParent"
        />
      </div>
      <div class="hm-widget-calendar__block-events">
        <calendar-list-events :data-events="eventsList" :date="strDate" />
      </div>
    </div>

  </div>

</template>

<script>
import Calendar from "@/components/hm-widget-calendar/calendar/calendar";
import CalendarListEvents from "@/components/hm-widget-calendar/calendar-list-events/calendar-list-events";
export default {
  components: {CalendarListEvents, Calendar},
  props: {
    dataCalendar: {
      type: Object,
      default: () => {}
        /**
         *  Пример передаваемых параметров
         * 2018-03-23:Array[1]
             0:Object
              begin_date:"2018-03-23"
              id:227
              name:"Директор департамента"
              subject_id:0
              subtype:""
              type:"at_session"
              user_id:21685
              view_url:"/at/session/event/my/session_id/227"
         *
         */
    }
  },
  data() {
    return {
      activeDate: [], // активная дата
      dateString: '',
      monthDeclensions: ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'],
    }
  },
  computed: {
    eventsList() {
      return this.dataCalendar[this.activeDate.reverse().join('-')]
    },
    strDate() {
      return this.dateString
    }
  },
  methods: {
    activeDaysParent(data) {
      this.activeDate = data.date.slice();
      this.dateString = data.dateString;
    },
    initCalendarDateParent(data) {
      this.activeDate = data.date.slice();
      this.dateString = data.dateString;
    },
  }
}
</script>

<style lang="scss">
 .hm-widget-calendar {
   width: 100%;
   &__block {
     width: 100%;
     display: flex;
     &-cal {
       width:227px;
     }
     &-events {
       margin-left: 26px;
       width: calc(100% - 253px);
     }
   }





 }
</style>
