<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <svg class="root">
        <clipPath id="plot_clip">
            <rect
                :x="marginLeft"
                :y="marginTop"
                :width="width"
                :height="height"
            />
        </clipPath>
        <rect
            x="0"
            y="0"
            :width="marginLeft + width + marginRight"
            :height="marginTop + height + marginBottom"
            fill="white"
        />
        <DateChartYAxis
            :value-type="valueType"
            :margin-left="marginLeft"
            :margin-top="marginTop"
            :width="width"
            :height="height"
            :max-y="maxY"
            :min-y="minY"
            :interval-y="intervalY"
        />
        <DateChartXAxis
            :margin-left="marginLeft"
            :margin-top="marginTop"
            :width="width"
            :height="height"
            :begin-date="beginDate"
            :end-date="endDate"
        />
        <DateChartData
            clip-path="url(#plot_clip)"
            :value-type="valueType"
            :players="players"
            :margin-left="marginLeft"
            :margin-top="marginTop"
            :width="width"
            :height="height"
            :begin-date="beginDate"
            :end-date="endDate"
            :max-y="maxY"
            :min-y="minY"
            :view-models="chartDataItems"
            @on-point-mouse-over="onPointMouseOver"
            @on-point-mouse-leave="onPointMouseLeave"
        />
        <DateChartLegend
            :margin-left="marginLeft"
            :margin-top="marginTop"
            :width="width"
            :height="height"
            :players="players"
        />
        <DateChartPopUp v-if="popUpPoint !== null"
            :point="popUpPoint"
        />
    </svg>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { ChartDataItem } from "@/view_models/charts/ChartDataItem";
import DateChartYAxis from "./DateChartYAxis.vue";
import DateChartXAxis from "./DateChartXAxis.vue";
import DateChartData from "./DateChartData.vue";
import DateChartLegend from "./DateChartLegend.vue";
import DateChartPopUp from "./DateChartPopUp.vue";
import { Player } from "@/models/Player";
import { DateChartPointViewModel } from "@/view_models/charts/DateChartPointViewModel";


const width = 600;
const height = 400;
const marginLeft = 50;
const marginRight = 150;
const marginTop = 50;
const marginBottom = 50;


@Component({
    components: {
        DateChartYAxis,
        DateChartXAxis,
        DateChartData,
        DateChartLegend,
        DateChartPopUp
    }
})
export default class DateChart extends Vue
{
    // constants
    get marginLeft(): number {
        return marginLeft;
    }
    get marginRight(): number {
        return marginRight;
    }
    get marginTop(): number {
        return marginTop;
    }
    get marginBottom(): number {
        return marginBottom;
    }
    get width(): number {
        return width;
    }
    get height(): number {
        return height;
    }

    @Prop({ required: true })
    valueType!: "percent" | "signedInteger";

    @Prop({ required: true })
    players!: readonly Player[];

    // yAxis
    @Prop({ required: true })
    maxY!: number;

    @Prop({ required: true })
    minY!: number;
    
    @Prop({ required: true })
    intervalY!: number;

    // xAxis
    @Prop({ required: true })
    beginDate!: Date;

    @Prop({ required: true })
    endDate!: Date;

    // data
    @Prop({ required: true })
    chartDataItems!: readonly ChartDataItem[];

    get colors(): readonly string[]
    {
        return this.players.map(player => player.color);
    }

    // pop up
    popUpPoint: DateChartPointViewModel | null = null;

    onPointMouseOver(vm: DateChartPointViewModel): void
    {
        //debug
        console.log("onPointMouseOver");

        this.popUpPoint = vm;
    }

    onPointMouseLeave(): void
    {
        this.popUpPoint = null;
    }
}
</script>

<style scoped>
.root {
    width: 800px;
    height: 500px;
}
</style>