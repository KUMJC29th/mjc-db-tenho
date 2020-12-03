<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g>
        <g v-for="(player, i) in players" :key="'lg' + i">
            <line
                :x1="offsetX"
                :y1="offsetY + i * intervalY - 0.5"
                :x2="offsetX + 30"
                :y2="offsetY + i * intervalY - 0.5"
                :stroke="player.color"
            />
            <text
                :x="offsetX + 40"
                :y="offsetY + i * intervalY"
                dominant-baseline="central"
                text-anchor="begin"
                font-size="12"
            >{{ player.name }}</text>
        </g>
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Player } from "@/models/Player";

@Component
export default class DateChartLegend extends Vue
{
    @Prop({ required: true })
    marginLeft!: number;

    @Prop({ required: true })
    marginTop!: number;

    @Prop({ required: true })
    width!: number;

    @Prop({ required: true })
    height!: number;

    get offsetX(): number
    {
        return this.marginLeft + this.width + 20;
    }

    intervalY = 40;

    get offsetY(): number
    {
        return this.marginTop + this.height / 2 - this.players.length * this.intervalY / 2;
    }

    @Prop({ required: true })
    players!: readonly Player[];
}
</script>