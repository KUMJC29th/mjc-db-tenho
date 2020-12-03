<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <section>
            <h2>順位による勝敗</h2>
            <AgGridVue
                id="competition_win_loss_grid"
                class="ag-theme-alpine"
                :gridOptions="vm.winLossGridViewModel"
            />
        </section>
        <section>
            <h2>同卓したときの収支</h2>
            <AgGridVue
                id="competition_income_grid"
                class="ag-theme-alpine"
                :gridOptions="vm.incomeGridViewModel"
            />
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AgGridVue } from "ag-grid-vue";
import { CompetitionTabViewModel } from "@/view_models/CompetitionTabViewModel";

@Component({
    components: { AgGridVue }
})
export default class CompetitionTabContent extends Vue
{
    @Prop({ required: true })
    vm!: CompetitionTabViewModel;
}
</script>

<style scoped>
#competition_win_loss_grid,
#competition_income_grid {
    width: 100%;
    height: 500px;
}
</style>