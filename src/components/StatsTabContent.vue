<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <fieldset>
            <legend>期間指定</legend>
            <div class="date-range-container">
                <div class="date-range-item-container">
                    <div>開始日：</div>
                    <DatePicker
                        :selected-date="datePickerDateFrom"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @date-selected="onDateFromSelected"
                    />
                </div>
                <div class="date-range-item-container">
                    <div>終了日：</div>
                    <DatePicker
                        :selected-date="datePickerDateTo"
                        :min-date="minDate"
                        :max-date="maxDate"
                        @date-selected="onDateToSelected"
                    />
                </div>
                <div class="date-range-item-container">
                    <div class="button" @click="updateDateRange">反映</div>
                </div>
            </div>
        </fieldset>
        <hr>
        <div>
            <div>
                期間： {{ dateRangeDisplay }}
            </div>
            <AgGridVue
                id="stats_grid"
                class="ag-theme-alpine"
                :column-defs="vm.columnDefs"
                :row-data="rowData"
                :header-height="80"
                :group-header-height="40"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import { StatsTabViewModel } from "@/view_models/StatsTabViewModel";
import DatePicker from './DatePicker/DatePicker.vue';
import { toRegularDate } from '@/util/DateExtensions';
import { StatsGridRowDataViewModel } from '@/view_models/StatsGridRowDataViewModel';

@Component({
    components: { AgGridVue, DatePicker }
})
export default class StatsTabContent extends Vue
{
    @Prop({ required: true })
    vm!: StatsTabViewModel;

    // REGION: Date Range
    minDate = new Date(2020, 3, 12);
    maxDate = new Date(); // Today

    datePickerDateFrom: Date | null = null;
    datePickerDateTo: Date | null = null;

    onDateFromSelected(newDate: Date | null): void
    {
        //debug
        //console.log(newDate);
        this.datePickerDateFrom = newDate;
    }

    onDateToSelected(newDate: Date | null): void
    {
        this.datePickerDateTo = newDate;
    }
    
    dateRange: {
        from: Date | null,
        to: Date | null
    } = { from: null, to: null };

    updateDateRange(): void
    {
        this.dateRange = {
            from: this.datePickerDateFrom,
            to: this.datePickerDateTo
        };
    }

    get dateRangeDisplay(): string
    {
        const s = `${toRegularDate(this.dateRange.from, false)} ～ ${toRegularDate(this.dateRange.to, false)}`;
        return s !== " ～ " ? s : "全て";
    }
    // END REGION: Date Range

    get rowData(): readonly StatsGridRowDataViewModel[]
    {
        return this.vm.getRowData(this.dateRange.from, this.dateRange.to);
    }
}
</script>

<style scoped>
#stats_grid {
    width: 100%;
    height: 500px;
}

.date-range-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.date-range-item-container {
    display: flex;
    align-items: center;
    margin-right: 15px;
}

.button {
    width: 90px;
    height: 30px;
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default; 
}
.button:hover {
    opacity: 0.7;
}
</style>