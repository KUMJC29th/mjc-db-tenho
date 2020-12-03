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
            :x="item.x"
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
import { LabelPosition } from "@/view_models/charts/LabelPosition";

@Component
export default class DateChartYAxis extends Vue
{
    @Prop({ required: true })
    valueType!: "percent" | "signedInteger";

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

    getDisplay(value: number): string {
        return this.valueType === "percent" ? `${value.toFixed(2)}%`
            : this.valueType === "signedInteger" ? (value > 0 ? `+${value.toFixed(0)}` : value.toFixed(0))
            : "NULL";
    }

    get horizontalLines(): readonly LineEdgePoints[] {
        const buf: LineEdgePoints[] = [];
        const numSections = Math.floor((this.maxY - this.minY) / this.intervalY);
        const interval = this.height / numSections;
        for (let i = 0; i <= numSections; ++i) {
            const y = Math.round(this.marginTop + this.height - i * interval) - 0.5;
            buf.push({ x1: this.marginLeft, y1: y, x2: this.marginLeft + this.width, y2: y });
        }
        return buf;
    }

    get yLabelPositions(): readonly LabelPosition[] {
        const buf: LabelPosition[] = [];
        const numSections = Math.floor((this.maxY - this.minY) / this.intervalY);
        const interval = this.height / numSections;
        for (let i = 0; i <= numSections; ++i) {
            const y = this.marginTop + this.height - i * interval;
            const value = this.minY + i * this.intervalY;
            const label = this.getDisplay(value);
            buf.push({ label, x: this.marginLeft, y });
        }
        return buf;
    }
}
</script>