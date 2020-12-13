<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <fieldset>
            <legend>設定</legend>
            <div class="flex">
                <div>表示項目：</div>
                <select v-model="selectedItem">
                    <option value="none" disabled>▼選択してください</option>
                    <option value="totalIncome">総合収支</option>
                    <option value="dan">段位</option>
                    <option value="quinellaRate">連対率</option>
                </select>
            </div>
            <div class="flex">
                <div>開始月：</div>
                <YearMonthPicker
                    :min="vm.defaultBeginDate"
                    :max="vm.defaultEndDate"
                    :default="vm.defaultBeginDate"
                    @on-value-changed="onBeginDateChanged"
                />
            </div>
            <div class="flex">
                <div>終了月：</div>
                <YearMonthPicker
                    :min="vm.defaultBeginDate"
                    :max="vm.defaultEndDate"
                    :default="vm.defaultEndDate"
                    @on-value-changed="onEndDateChanged"
                />
            </div>
            <div class="button" @click="update">反映</div>
        </fieldset>
        <hr>
        <section>
            <h2>{{ caption }}</h2>
            <DateChart
                v-if="chartData !== null"
                :value-type="chartData.valueType"
                :players="vm.players"
                :max-y="chartData.maxY"
                :min-y="chartData.minY"
                :interval-y="chartData.intervalY"
                :begin-date="beginDate"
                :end-date="endDate"
                :chart-data-items="chartData.data"
            />
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { ChartTabViewModel } from "@/view_models/ChartTabViewModel";
import DateChart from "@/components/date_chart/DateChart.vue";
import YearMonthPicker from "@/components/year_month_picker/YearMonthPicker.vue";
import { DateChartViewModel } from "@/view_models/charts/DateChartViewModel";

@Component({
    components: { DateChart, YearMonthPicker }
})
export default class ChartTabContent extends Vue
{
    @Prop({ required: true })
    vm!: ChartTabViewModel;

    beginDate: Date = this.vm.defaultBeginDate;
    endDate: Date = this.vm.defaultEndDate;

    selectedBeginDate: Date = this.vm.defaultBeginDate;
    selectedEndDate: Date = this.vm.defaultEndDate.getMonth() === 11 ? new Date(this.vm.defaultEndDate.getFullYear() + 1, 0 ,1)
            : new Date(this.vm.defaultEndDate.getFullYear(), this.vm.defaultEndDate.getMonth() + 1, 1);

    onBeginDateChanged(newValue: Date): void
    {
        this.selectedBeginDate = newValue;
    }
    onEndDateChanged(newValue: Date): void 
    {
        this.selectedEndDate = newValue.getMonth() === 11 ? new Date(newValue.getFullYear() + 1, 0 ,1)
            : new Date(newValue.getFullYear(), newValue.getMonth() + 1, 1);
    }

    selectedItem: string = "none";
    caption: string = "";
    chartData: DateChartViewModel | null = null;

    update(): void
    {
        if (this.selectedEndDate <= this.selectedBeginDate)
        {
            this.chartData = null;
            return;
        }

        switch (this.selectedItem)
        {
            case "totalIncome": {
                this.caption = "総合収支";
                this.chartData = this.vm.totalIncome;
            } break;
            case "dan": {
                this.caption = "段位";
                this.chartData = this.vm.dan;
            } break;
            case "quinellaRate": {
                this.caption = "連対率";
                this.chartData = this.vm.quinellaRate;
            } break;
            default: {
                this.chartData = null;
            } break;
        }
        
        this.beginDate = this.selectedBeginDate;
        this.endDate = this.selectedEndDate;
    }
}
</script>

<style scoped>
.flex {
    display: flex;
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