<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <line
        :x1="vm.x1"
        :y1="vm.y1"
        :x2="vm.x2"
        :y2="vm.y2"
        :stroke="vm.color"
    />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { LineEdgePoints } from "@/view_models/charts/LineEdgePoints";

@Component
export default class DateChartLine extends Vue
{
    @Prop({ required: true })
    vm!: LineEdgePoints;
}
</script>