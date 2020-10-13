<template>
    <div>
        <section>
            <h2>Copyright</h2>
            <div>MJCデータベース天鳳版 © 2020 KUMJC29th</div>
        </section>
        <hr>
        <section>
            <h2>更新履歴</h2>
            <dl class="revision_text">
                <template v-for="revision in vm.revisions">
                    <dt :key="'dd' + revision.date.toString()">
                        {{ toRegularDate(revision.date) }}
                    </dt>
                    <dd v-for="(description, i) in revision.descriptions" :key="'dt' + revision.date + i">
                        {{ description }}
                    </dd>
                </template>
            </dl>
        </section>
        <hr>
        <section>
            <h2>Git Repositories</h2>
            <div><a href="https://github.com/KUMJC29th/mjcjson-analyzer" target="_blank" rel="noopener noreferrer">MJCJson Analyzer</a></div>
            <div><a href="https://github.com/KUMJC29th/mjcjson-analyzer-file-uploader" target="_blank" rel="noopener noreferrer">MJCJson Analyzer File Uploader</a></div>
            <div><a href="https://github.com/KUMJC29th/mjc-db-tenho" target="_blank" rel="noopener noreferrer">MJC DB Tenho</a></div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { AboutTabViewModel } from "../view_models/AboutTabViewModel";
import { dateNumToDate, toRegularDate } from "../util/DateExtensions";

@Component
export default class AboutTabContent extends Vue
{
    @Prop({ required: true })
    vm!: readonly AboutTabViewModel[];

    toRegularDate = (date: Date) => toRegularDate(date);
}
</script>

<style scoped>
    .revision_text
    {
        font-size: small;
    }
</style>