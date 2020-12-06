<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <g>
        <circle
            :cx="vm.x"
            :cy="vm.y"
            r="3"
            :fill="circleColor"
            @mouseover="onMouseOver"
            @mouseleave="onMouseLeave"
        />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
import { DateChartPointViewModel } from "@/view_models/charts/DateChartPointViewModel";

@Component
export default class DateChartPoint extends Vue
{
    @Prop({ required: true })
    vm!: DateChartPointViewModel;

    hovers: boolean = false;

    onMouseOver(): void
    {
        this.hovers = true;
        this.raiseMouseOver();
    }

    @Emit("on-mouse-over")
    raiseMouseOver(): DateChartPointViewModel
    {
        return this.vm;
    }

    onMouseLeave(): void
    {
        this.hovers = false;
        this.raiseMouseLeave();
    }

    @Emit("on-mouse-leave")
    raiseMouseLeave(): void
    {
    }

    get circleColor(): string
    {
        return this.hovers ? this.vm.player.color : "transparent";
    }
}
</script>

<style scoped>

</style>