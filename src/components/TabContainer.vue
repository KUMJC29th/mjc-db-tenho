<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div class="tab-container">
        <input type="radio" name="tab_label_input" id="regular_tab" value="regular" checked>
        <label class="tab-label" for="regular_tab">半荘</label>
        <input type="radio" name="tab_label_input" id="stats_tab" value="stats">
        <label class="tab-label" for="stats_tab">統計</label>
        <input type="radio" name="tab_label_input" id="competition_tab" value="competition">
        <label class="tab-label" for="competition_tab">相性表</label>
        <input type="radio" name="tab_label_input" id="chart_tab" value="chart">
        <label class="tab-label" for="chart_tab">グラフ</label>
        <input type="radio" name="tab_label_input" id="about_tab" value="about">
        <label class="tab-label tab-label-right" for="about_tab">About</label>

        <RegularTabContent id="regular_tab_content" class="tab-content" :vm="vm.regular" />
        <StatsTabContent id="stats_tab_content" class="tab-content" :vm="vm.stats" />
        <CompetitionTabContent id="competition_tab_content" class="tab-content" :vm="vm.competition" />
        <ChartTabContent id="chart_tab_content" class="tab-content" :vm="vm.chart" />
        <AboutTabContent id="about_tab_content" class="tab-content" :vm="vm.about" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import RegularTabContent from "./RegularTabContent.vue";
import StatsTabContent from "./StatsTabContent.vue";
import CompetitionTabContent from "./CompetitionTabContent.vue";
import ChartTabContent from "./ChartTabContent.vue";
import AboutTabContent from "./AboutTabContent.vue";
import { MainViewModel } from "../view_models/MainViewModel";

@Component({
    components: {
        RegularTabContent,
        StatsTabContent,
        CompetitionTabContent,
        ChartTabContent,
        AboutTabContent
    }
})
export default class TabContainer extends Vue
{
    @Prop({ required: true })
    vm!: MainViewModel;
}
</script>

<style scoped>
    .tab-label {
        text-align: center;
        line-height: 40px;
        width: 80px;
        height: 40px;
        margin-right: 5px;
        border-bottom: solid 1px #F8F8F8;
        background-color: #CCCCCC;
        display: block;
        float: left;
        transition: all 0.2s ease;
    }

    .tab-label-right {
        float: right;
        margin-right: 0px;
        margin-left: 5px;
    }

    .tab-label:hover {
        opacity: 0.7;
    }
    
    input[name="tab_label_input"] {
        display: none;
    }
    
    .tab-content {
        display: none;
        padding: 10px;
        clear: both;
        overflow: hidden;
        background-color: #F8F8F8;
    }

    #regular_tab:checked ~ #regular_tab_content,
    #stats_tab:checked ~ #stats_tab_content,
    #competition_tab:checked ~ #competition_tab_content,
    #chart_tab:checked ~ #chart_tab_content,
    #about_tab:checked ~ #about_tab_content { 
        display: block;
    }

    .tab-container input:checked + .tab-label {
        background-color: #F8F8F8
    }
</style>