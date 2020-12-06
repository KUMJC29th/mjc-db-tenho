<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g>
        <path
            :d="path"
            fill="#fff8f8"
            stroke="black"
        />
        <text
            :x="namePosition.x"
            :y="namePosition.y"
            font-size="11"
            :style="`text-shadow: 0 0 3px ${this.point.player.color};`"
        >{{ this.point.player.name }}</text>
        <text
            :x="datePosition.x"
            :y="datePosition.y"
            text-anchor="end"
            font-size="11"
        >{{ dateDisplay }}</text>
        <text
            :x="displayPosition.x"
            :y="displayPosition.y"
            text-anchor="end"
        >{{ this.point.display }}</text>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Player } from "@/models/Player";
import { DateChartPointViewModel } from "@/view_models/charts/DateChartPointViewModel";

@Component
export default class DateChartPopUp extends Vue
{
    /*
    @Prop({ required: true })
    isVisible!: boolean;
    */

    @Prop({ required: true })
    point!: DateChartPointViewModel;

    get dateDisplay(): string
    {
        return `${this.point.date.getMonth() + 1}/${this.point.date.getDate()}`;
    }

    get position(): "above" | "below"
    {
        return this.point.y < 150 ? "below" : "above";
    }

    get path(): string
    {
        // width: 80, height: 50 + 5, corner-round: 10, offsetY: 5
        return this.position === "above" ? `M ${this.point.x} ${this.point.y - 5} l -10 -5 h -20 a 10 10 0 0 1 -10 -10 v -30 a 10 10 0 0 1 10 -10 h 60 a 10 10 0 0 1 10 10 v 30 a 10 10 0 0 1 -10 10 h -20 Z`
            : `M ${this.point.x} ${this.point.y + 5} l 10 5 h 20 a 10 10 0 0 1 10 10 v 30 a 10 10 0 0 1 -10 10 h -60 a 10 10 0 0 1 -10 -10 v -30 a 10 10 0 0 1 10 -10 h 20 Z`;
    }

    get namePosition(): { readonly x: number, readonly y: number }
    {
        return {
            x: this.point.x - 35,
            y: this.position === "above" ? this.point.y - 45 : this.point.y + 25
        };
    }

    get datePosition(): { readonly x: number, readonly y: number }
    {
        return {
            x: this.point.x + 35,
            y: this.position === "above" ? this.point.y - 45 : this.point.y + 25
        };
    }

    get displayPosition(): { readonly x: number, readonly y: number }
    {
        return {
            x: this.point.x + 35,
            y: this.position === "above" ? this.point.y - 45 + 25 : this.point.y + 25 + 25
        };
    }
}
</script>