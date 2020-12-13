<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g>
        <line v-for="(item, i) in horizontalLines" :key="'hl' + i"
            :x1="item.x1"
            :y1="item.y1"
            :x2="item.x2"
            :y2="item.y2"
            stroke="silver"
        />
        <text v-for="(item, i) in yLabelPositions" :key="'yl' + i"
            :x="item.x - 5"
            :y="item.y"
            dominant-baseline="central"
            text-anchor="end"
            font-size="10"
        >{{ item.label }}</text>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LineEdgePoints } from "@/view_models/charts/LineEdgePoints";
import { AxisLabel } from "@/view_models/charts/AxisLabel";
import { getChartValueFormatter, toDanOnly } from "@/util/ChartValueFormatter";
import { getCurrentDanPoint, getLowerBoundDanPoint, getUpperBoundDanPoint } from "@/services/getDanPoint";

@Component
export default class DateChartYAxis extends Vue
{
    @Prop({ required: true })
    valueType!: "probability" | "signedInteger" | "dan";

    @Prop({ required: true })
    marginLeft!: number;

    @Prop({ required: true })
    marginTop!: number;
    
    @Prop({ required: true })
    width!: number;

    @Prop({ required: true })
    height!: number;

    @Prop({ required: true })
    maxY!: number;

    @Prop({ required: true })
    minY!: number;

    @Prop({ required: true })
    intervalY!: number;

    get horizontalLines(): readonly LineEdgePoints[]
    {
        if (this.valueType !== "dan")
        {
            const buf: LineEdgePoints[] = [];
            const numSections = Math.floor((this.maxY - this.minY) / this.intervalY);
            const interval = this.height / numSections;
            for (let i = 0; i <= numSections; ++i)
            {
                const y = Math.round(this.marginTop + this.height - i * interval) - 0.5;
                buf.push({ x1: this.marginLeft, y1: y, x2: this.marginLeft + this.width, y2: y });
            }
            return buf;
        }
        else
        {
            const buf: LineEdgePoints[] = [];
            const { dan: maxDan } = getCurrentDanPoint(this.maxY);
            for (let i = 0; i < maxDan + 1; ++i)
            {
                const y = Math.round(this.marginTop + this.height - this.height * getLowerBoundDanPoint(i) / this.maxY) - 0.5;
                buf.push({ x1: this.marginLeft, y1: y, x2: this.marginLeft + this.width, y2: y });
            }
            return buf;
        }
    }

    get valueFormatter(): (value: number) => string
    {
        return getChartValueFormatter(this.valueType);
    }

    get yLabelPositions(): readonly AxisLabel[]
    {
        if (this.valueType !== "dan")
        {
            const buf: AxisLabel[] = [];
            const numSections = Math.floor((this.maxY - this.minY) / this.intervalY);
            const interval = this.height / numSections;
            for (let i = 0; i <= numSections; ++i)
            {
                const y = this.marginTop + this.height - i * interval;
                const value = this.minY + i * this.intervalY;
                const label = this.valueFormatter(value);
                buf.push({ label, x: this.marginLeft, y });
            }
            return buf;
        }
        else
        {
            const buf: AxisLabel[] = [];
            const { dan: maxDan } = getCurrentDanPoint(this.maxY);
            for (let i = 0; i < maxDan + 1; ++i)
            {
                const value = getLowerBoundDanPoint(i);
                const y = Math.round(this.marginTop + this.height - this.height * value / this.maxY) - 0.5;
                const label = toDanOnly(value);
                buf.push({ label, x: this.marginLeft, y });
            }
            return buf;
        }
    }
}
</script>