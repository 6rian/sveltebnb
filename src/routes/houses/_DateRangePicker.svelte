<script>
  import Datepicker from '../../lib/svelte-calendar-1.0.10/src/Components/Datepicker.svelte'
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()

  const dateFormat = '#{l}, #{F} #{j}, #{Y}';
  let startDate = new Date()
  let endDate = new Date(startDate.getTime() + 1000 * 3600 * 24)

  const startDateSelectableCallback = date => {
    return true
  }
  
  let endDateSelectableCallback = date => {
    const today = new Date()
    
    // end date can't be before start
    if (date.getTime() - startDate.getTime() < 0) {
      return false
    }

    // booking can't end today
    if (date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()) {
        return false
    }

    // end date can't be same as start
    if (date.getFullYear() === startDate.getFullYear() &&
      date.getMonth() === startDate.getMonth() &&
      date.getDate() === startDate.getDate()) {
        return false
    }

    return true
  }

  const firstDateIsPastDayComparedToSecond = (firstDate, secondDate) => {
    if (firstDate.setHours(0,0,0,0) - secondDate.setHours(0,0,0,0) >= 0) {
      return false
    }
    return true
  }

</script>

<style>
  .date-range-picker-container {
    border: 1px solid #ddd;
    display: grid;
    grid-template-columns: 40% 20% 40%;
    padding: 10px;
  }
</style>

<div class="date-range-picker-container">
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={startDateSelectableCallback}
    on:dateSelected={e => {
      startDate = new Date(e.detail.date)
      if (!firstDateIsPastDayComparedToSecond(startDate, endDate)) {
        endDate = new Date(startDate.getTime() + 1000 * 3600 * 24)
      }
      endDateSelectableCallback = endDateSelectableCallback
      dispatch('datesChanged', {
        startDate,
        endDate
      })
    }}
  >
    <div class="check-in">
      {`${startDate.getDate()} ${startDate.toLocaleString('default', {month: 'long'})}`}
    </div>
  </Datepicker>
  <div class="arrow">➡️</div>
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={endDateSelectableCallback}
    on:dateSelected={e => {
      endDate = new Date(e.detail.date)
      dispatch('datesChanged', {
        startDate,
        endDate
      })
    }}
  >
    <div class="check-out">
      {`${endDate.getDate()} ${endDate.toLocaleString('default', {month: 'long'})}`}
    </div>
  </Datepicker>
</div>