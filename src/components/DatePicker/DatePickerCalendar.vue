<template>
    <div class="calendar-container">
        <table>
            <thead>
                <tr>
                    <td class="weekday-header-cell">日</td>
                    <td class="weekday-header-cell">月</td>
                    <td class="weekday-header-cell">火</td>
                    <td class="weekday-header-cell">水</td>
                    <td class="weekday-header-cell">木</td>
                    <td class="weekday-header-cell">金</td>
                    <td class="weekday-header-cell">土</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in [0, 1, 2, 3, 4, 5]" :key="'week' + i">
                    <DatePickerCell v-for="j in [0, 1, 2, 3, 4, 5, 6]" :key="'day' + i + j"
                        :width="40"
                        :height="30"
                        :value="calendar[i][j]"
                        :is-selected="isSelectedDateCell(i,j)"
                        :is-hidden="isHiddenDateCell(i,j)"
                        :is-invalid="isInvalidDateCell(i,j)"
                        @on-cell-clicked="onDateCellClicked"
                    />
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import DatePickerCell from './DatePickerCell.vue';

@Component({
    components: {
        DatePickerCell
    }
})
export default class DatePickerCalendar extends Vue
{
    // REGION: Selected date
    @Prop({ required: true })
    selectedDate!: Date | null;

    @Prop({ required: true })
    minDate!: Date | null;

    @Prop({ required: true })
    maxDate!: Date | null;

    onDateCellClicked(newDate: number): void
    {
        const date = new Date(this.currentYear, this.currentMonth, newDate);
        this.raiseDateCellClicked(date);
    }

    @Emit("on-date-cell-clicked")
    raiseDateCellClicked(newDate: Date): Date | null
    {
        return newDate;
    }
    // END REGION: Selected date

    // REGION: Cell
    @Prop({ required: true })
    currentYear!: number;

    @Prop({ required: true })
    currentMonth!: number;

    get beginDate(): number
    {
        const d = new Date(this.currentYear, this.currentMonth, 1);
        const weekday = d.getDay();
        return 1 - weekday;
    }

    get calendar(): readonly (readonly number[])[]
    {
        return [...new Array(6)].map((_, i) =>
            [...new Array(7)].map((_, j) =>
                this.beginDate + (7 * i + j)
            )
        );
    }

    isSelectedDateCell(rowIndex: number, columnIndex: number): boolean
    {
        const date = new Date(this.currentYear, this.currentMonth, this.calendar[rowIndex][columnIndex]);
        return date.getTime() === this.selectedDate?.getTime(); 
    }

    isHiddenDateCell(rowIndex: number, columnIndex: number): boolean
    {
        const date = new Date(this.currentYear, this.currentMonth, this.calendar[rowIndex][columnIndex]);
        return date.getMonth() !== this.currentMonth || date.getFullYear() !== this.currentYear;
    }

    isInvalidDateCell(rowIndex: number, columnIndex: number): boolean
    {
        const date = new Date(this.currentYear, this.currentMonth, this.calendar[rowIndex][columnIndex]);
        return (this.minDate !== null && date < this.minDate) || (this.maxDate !== null && this.maxDate < date);
    }
    // END REGION: Cell
}
</script>

<style scoped>
.calendar-container {
    width: 280px;
    height: 240px;
}

.weekday-header-cell {
    width: 40px;
    height: 30px;
    text-align: center;
}
</style>