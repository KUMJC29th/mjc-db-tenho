<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <div class="flex">
            <div>表示項目：</div>
            <select v-model="selectedItem">
                <option value="none" disabled>▼選択してください</option>
                <option value="winLoss">順位による勝敗</option>
                <option value="income">同卓したときの収支</option>
                <option value="feeding">総放銃点</option>
            </select>
        </div>
        <section v-show="isWinLossSelected">
            <h2>順位による勝敗</h2>
            <AgGridVue
                id="competition_win_loss_grid"
                class="ag-theme-alpine"
                :gridOptions="vm.winLossGridViewModel"
            />
        </section>
        <section v-show="isIncomeSelected">
            <h2>同卓したときの収支</h2>
            <AgGridVue
                id="competition_income_grid"
                class="ag-theme-alpine"
                :gridOptions="vm.incomeGridViewModel"
            />
        </section>
        <section v-show="isFeedingSelected">
            <h2>総放銃点</h2>
            <AgGridVue
                id="competition_feeding_grid"
                class="ag-theme-alpine"
                :gridOptions="vm.feedingGridViewModel"
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

    selectedItem: string = "none";

    get isWinLossSelected(): boolean
    {
        return this.selectedItem === "winLoss";
    }
    get isIncomeSelected(): boolean
    {
        return this.selectedItem === "income";
    }
    get isFeedingSelected(): boolean
    {
        return this.selectedItem === "feeding";
    }
}
</script>

<style scoped>
.flex {
    display: flex;
}

#competition_win_loss_grid,
#competition_income_grid,
#competition_feeding_grid {
    width: 100%;
    height: 550px;
}
</style>