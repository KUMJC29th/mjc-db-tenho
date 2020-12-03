<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div class="root">
        <input type="range"
            v-model="value"
            :min="minValue"
            :max="maxValue"
            step="1"
            @change="onValueChanged"
        />
        <output>{{ display }}</output>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class YaerMonthPicker extends Vue
{
    @Prop({ required: true })
    min!: Date;

    @Prop({ required: true })
    max!: Date;
    
    @Prop({ required: true })
    default!: Date;

    minValue: number = 12 * this.min.getFullYear() + this.min.getMonth();
    maxValue: number = 12 * this.max.getFullYear() + this.max.getMonth();
    value: number = 12 * this.default.getFullYear() + this.default.getMonth();

    get display(): string {
        return `${Math.floor(this.value / 12)}/${this.value % 12 + 1}`;
    }

    onValueChanged(): void
    {
        this.raiseValueChanged(this.value);
    }

    @Emit("on-value-changed")
    raiseValueChanged(value: number): Date
    {
        return new Date(Math.floor(value / 12), value % 12, 1);
    }
}
</script>

<style scoped>
.root {
    display: inline-block;
}
</style>