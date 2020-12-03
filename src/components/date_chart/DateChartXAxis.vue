<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g>
        <text v-for="(item, i) in xLabelPositions" :key="'xl' + i"
            :x="item.x"
            :y="item.y"
            dominant-baseline="central"
            text-anchor="end"
            font-size="10"
            :transform="`rotate(-45 ${item.x} ${marginTop + height})`"
        >{{ item.label }}</text>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LabelPosition } from "@/view_models/charts/LabelPosition";

@Component
export default class DateChartXAxis extends Vue
{
    @Prop({ required: true })
    marginLeft!: number;

    @Prop({ required: true })
    marginTop!: number;

    @Prop({ required: true })
    width!: number;

    @Prop({ required: true })
    height!: number;

    @Prop({ required: true })
    beginDate!: Date;

    @Prop({ required: true })
    endDate!: Date;

    get duration(): number {
        return (this.endDate.getTime() - this.beginDate.getTime()) / 86400000;
    }

    get widthPerDay(): number {
        return this.width / this.duration;
    }

    get xLabelPositions(): readonly LabelPosition[] {
        const buf: LabelPosition[] = [];
        for (let i = 0; ; ++i) {
            const date = new Date(this.beginDate.getFullYear(), this.beginDate.getMonth() + i, 1);
            if (date > this.endDate) break;
            const days = (date.getTime() - this.beginDate.getTime()) / 86400000;
            const x = this.marginLeft + days * this.widthPerDay;
            const label = `${date.getFullYear()}/${date.getMonth() + 1}`;
            buf.push({ label, x, y: this.marginTop + this.height });
        }
        return buf;
    }
}
</script>