<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div class="year-list-container">
        <table>
            <tbody>
                <tr v-for="i in [0, 1, 2, 3, 4]" :key="'yearRow' + i">
                    <DatePickerCell v-for="j in [0, 1]" :key="'year' + i + j"
                        :width="140"
                        :height="30"
                        :value="years[i][j]"
                        :formatter="yearFormatter"
                        :is-hidden="isHiddenYearCell(i,j)"
                        @on-cell-clicked="onYearCellClicked"
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
export default class DatePickerYearList extends Vue
{
    @Prop({ required: true })
    firstYear!: number;

    @Prop({ required: false, default: null })
    minYear!: number | null;

    @Prop({ required: false, default: null })
    maxYear!: number | null;

    get years(): readonly (readonly number[])[]
    {
        return [0, 1, 2, 3, 4].map(i => [this.firstYear + 2 * i, this.firstYear + 2 * i + 1]);
    }

    yearFormatter(year: number): string
    {
        return `${year}年`;
    }

    isHiddenYearCell(rowIndex: number, columnIndex: number): boolean
    {
        const year = this.firstYear + 2 * rowIndex + columnIndex;
        return (this.minYear !== null && year < this.minYear) || (this.maxYear !== null && this.maxYear < year);
    }

    onYearCellClicked(newYear: number): void
    {
        this.raiseYearCellClicked(newYear);
    }

    @Emit("on-year-cell-clicked")
    raiseYearCellClicked(newYear: number): number
    {
        return newYear;
    }
}
</script>

<style scoped>
.year-list-container {
    width: 280px;
    height: 240px;
}
</style>