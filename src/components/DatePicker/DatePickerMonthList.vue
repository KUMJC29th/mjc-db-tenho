<template>
    <div class="month-list-container">
        <table>
            <tbody>
                <tr v-for="i in [0, 1, 2, 3]" :key="'monthRow' + i">
                    <DatePickerCell v-for="j in [0, 1, 2]" :key="'month' + i + j"
                        :width="140"
                        :height="30"
                        :value="3 * i + j"
                        :formatter="monthFormatter"
                        :is-hidden="isHiddenMonthCell(i,j)"
                        @on-cell-clicked="onMonthCellClicked"
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
export default class DatePickerMonthList extends Vue
{
    @Prop({ required: false, default: null })
    minMonth!: number | null;

    @Prop({ required: false, default: null })
    maxMonth!: number | null;

    monthFormatter(month: number): string
    {
        return `${month + 1}月`;
    }

    isHiddenMonthCell(rowIndex: number, columnIndex: number): boolean
    {
        const month = 3 * rowIndex + columnIndex;
        return (this.minMonth !== null && month < this.minMonth) || (this.maxMonth !== null && this.maxMonth < month);
    }

    onMonthCellClicked(newMonth: number): void
    {
        this.raiseMonthCellClicked(newMonth);
    }

    @Emit("on-month-cell-clicked")
    raiseMonthCellClicked(newMonth: number): number
    {
        return newMonth;
    }
}
</script>

<style scoped>
.month-list-container {
    width: 280px;
    height: 240px;
}
</style>