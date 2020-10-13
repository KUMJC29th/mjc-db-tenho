<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <AgGridVue
            id="regular_grid"
            class="ag-theme-alpine"
            :gridOptions="vm.gridViewModel"
        />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import { RegularTabViewModel } from "@/view_models/RegularTabViewModel";

@Component({
    components: { AgGridVue }
})
export default class RegularTabContent extends Vue
{
    @Prop({ required: true })
    vm!: RegularTabViewModel;
}
</script>

<style scoped>
#regular_grid {
    width: 100%;
    height: 500px;
}
</style>