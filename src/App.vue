<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div id="app">
        <h1>MJCデータベース天鳳版</h1>
        <div v-if="isInitializing">Loading...</div>
        <TabContainer v-if="isInitialized" :vm="vm" />
        <div v-if="isInitializationFailed">読み込みに失敗しました。</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import TabContainer from './components/TabContainer.vue'
import { MainViewModel } from './view_models/MainViewModel'
import { getMainViewModel } from "@/services/getMainModel";

@Component({
    components: {
        TabContainer
    }
})
export default class App extends Vue
{
    // BEGIN: View Model
    vm!: MainViewModel;

    async mounted()
    {
        const vm = await getMainViewModel();
        if (vm === null)
        {
            this.initializationStatus = "failed";
            return;
        }

        // debug
        //console.log(vm);

        this.vm = vm;
        this.initializationStatus = "initialized";
    }
    // END: View Model

    // BEGIN: Initialization
    initializationStatus: "initializing" | "initialized" | "failed" = "initializing";

    get isInitializing(): boolean
    {
        return this.initializationStatus === "initializing";
    }
    get isInitialized(): boolean
    {
        return this.initializationStatus === "initialized";
    }
    get isInitializationFailed(): boolean
    {
        return this.initializationStatus === "failed";
    }
    // END: Initialization
}
</script>

<style lang="scss">
@import "../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css";

.ag-theme-alpine .ag-header-cell,
.ag-theme-alpine .ag-header-group-cell {
    padding-left: 10px;
    padding-right: 10px;
}
.ag-header-cell,
.ag-header-group-cell {
    border-right: solid 1px #babfc7;
}
.ag-header-cell-label .ag-header-cell-text {
    white-space: pre-wrap;
}

.ag-theme-alpine .ag-ltr .ag-cell {
    border-right: solid 1px #babfc7;
}
.ag-theme-alpine .ag-cell,
.ag-theme-alpine .ag-row>.ag-cell-wrapper {
    padding-left: 10px;
    padding-right: 10px;
}

.cell-number {
    text-align: right;
}
.cell-index {
    text-align: center;
}

#competition_win_loss_grid .ag-cell.competition-row-header,
#competition_income_grid .ag-cell.competition-row-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: bold;
    background-color: #f8f8f8;
}
#competition_win_loss_grid .ag-cell.competition-win-loss-cell {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: pre-wrap;
    text-align: center;
    line-height: 20px;
}


h1, h2 {
    font-size: medium;
    font-weight: bold;
}
/*
.red {
    background-color: #ffc0c0;
}

.light_red {
    background-color: #ffe0e0;
}

.yellow {
    background-color: #ffffe0;
}

.light_blue {
    background-color: #e0e0ff;
}

.blue {
    background-color: #c0c0ff;
}
*/
</style>
