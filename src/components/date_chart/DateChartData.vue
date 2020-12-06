<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g
        :x="marginLeft"
        :y="marginTop"
    >
        <DateChartLine v-for="(item, i) in lines" :key="'l' + i"
            :vm="item"
        />
        <DateChartPoint v-for="(item, i) in points" :key="'p' + i"
            :vm="item"
            @on-mouse-over="onPointMouseOver"
            @on-mouse-leave="onPointMouseLeave"
        />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { ChartDataItem } from "@/view_models/charts/ChartDataItem";
import DateChartPoint from "./DateChartPoint.vue";
import DateChartLine from "./DateChartLine.vue";
import { DateChartPointViewModel } from "@/view_models/charts/DateChartPointViewModel";
import { LineEdgePoints } from "@/view_models/charts/LineEdgePoints";
import { Player } from "@/models/Player";


@Component({
    components: {
        DateChartPoint,
        DateChartLine
    }
})
export default class DateChartData extends Vue
{
    @Prop({ required: true })
    valueType!: "percent" | "signedInteger";

    @Prop({ required: true })
    players!: readonly Player[];

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

    @Prop({ required: true })
    maxY!: number;

    @Prop({ required: true })
    minY!: number;

    @Prop({ required: true })
    viewModels!: readonly ChartDataItem[];

    get duration(): number {
        return (this.endDate.getTime() - this.beginDate.getTime()) / 86400000;
    }

    get widthPerDay(): number {
        return this.width / this.duration;
    }

    get heightPerValue(): number {
        return this.height / (this.maxY - this.minY);
    }

    getDisplay(value: number): string {
        return this.valueType === "percent" ? `${value.toFixed(2)}%`
            : this.valueType === "signedInteger" ? (value > 0 ? `+${value.toFixed(0)}` : value.toFixed(0))
            : "NULL";
    }

    get points(): readonly DateChartPointViewModel[] {
        return this.viewModels.flatMap(({ date, values }) => {
            const days = (date.getTime() - this.beginDate.getTime()) / 86400000;
            const x = this.marginLeft + days * this.widthPerDay;

            return values.flatMap((value, i) => {
                if (value !== null) {
                    const y = this.marginTop + this.height - (value - this.minY) * this.heightPerValue;
                    return [{
                        x,
                        y,
                        player: this.players[i],
                        date,
                        display: this.getDisplay(value)
                    }];
                } else {
                    return [];
                }
            });
        });
    }

    get lines(): readonly LineEdgePoints[] {
        const buf: LineEdgePoints[] = [];
        const prev = new Map<number, ({ readonly x: number, readonly y: number })>();
        for (const { date, values } of this.viewModels) {
            const days = (date.getTime() - this.beginDate.getTime()) / 86400000;
            // n + 0.5になるように調整
            const x = Math.round(this.marginLeft + days * this.widthPerDay + 0.5) - 0.5;
            for (let i = 0; i < values.length; ++i) {
                const value = values[i];
                if (value !== null) {
                    // n + 0.5になるように調整
                    const y = Math.round(this.marginTop + this.height - (value - this.minY) * this.heightPerValue + 0.5) - 0.5;
                    const previous = prev.get(i);
                    if (previous !== undefined) {
                        buf.push({
                            x1: previous.x,
                            y1: previous.y,
                            x2: x,
                            y2: previous.y,
                            color: this.players[i].color
                        });
                        buf.push({
                            x1: x,
                            y1: previous.y,
                            x2: x,
                            y2: y,
                            color: this.players[i].color
                        });
                    }
                    prev.set(i, { x, y });
                }
            }
        }
        return buf;
    }

    onPointMouseOver(vm: DateChartPointViewModel): void
    {
        this.raisePointMouseOver(vm);
    }

    @Emit("on-point-mouse-over")
    raisePointMouseOver(vm: DateChartPointViewModel): DateChartPointViewModel
    {
        return vm;
    }

    onPointMouseLeave(): void
    {
        this.raisePointMouseLeave();
    }

    @Emit("on-point-mouse-leave")
    raisePointMouseLeave(): void
    {
    }
}
</script>