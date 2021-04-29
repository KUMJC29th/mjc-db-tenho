<!-- Copyright © 2020 matcher-ice
   - This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
   - This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. -->

<template>
    <div>
        <section>
            <h2>Copyright</h2>
            <div>MJCデータベース天鳳版 © 2020 KUMJC29th</div>
        </section>
        <hr>
        <section>
            <h2>Blog</h2>
            <div><a href="https://kumjc29th-db-blog-47f4e.web.app" target="_blank" rel="noopener noreferrer">MJCデータベース開発ブログ</a></div>
        </section>
        <hr>
        <section>
            <h2>更新履歴</h2>
            <dl class="revision_text">
                <dt>2021/04/29</dt>
                <dd>統計タブのドラ関連のカウントミスを修正</dd>
                <dd>統計タブに平均総ドラ枚数、平均裏ドラ枚数を追加</dd>
                <dt>2020/12/13</dt>
                <dd>グラフタブに段位を追加</dd>
                <dt>2020/12/06</dt>
                <dd>グラフタブを追加</dd>
                <dt>2020/10/27</dt>
                <dd>統計タブに日付範囲指定機能を追加</dd>
                <dt>2020/10/13</dt>
                <dd>Firebaseに移行</dd>
                <dt>2020/9/27</dt>
                <dd>Google Apps Script Web Applicationに移行</dd>
                <dd>相性表を追加</dd>
                <dt>2020/9/11</dt>
                <dd>プレイヤー統計シートにツモられ率、平均ツモ失点、先制立直率、フリテン立直率、引っ掛け立直率、愚形立直率を追加、飛び数を飛び率に変更</dd>
                <dt>2020/6/14</dt>
                <dd>プレイヤー統計シートに平均立直巡目、平均和了巡目を追加</dd>
                <dt>2020/6/4</dt>
                <dd>半荘シートを追加</dd>
                <dt>2020/5/31</dt>
                <dd>プレイヤー統計シートに総局数、役出現期待値、役出現数を追加</dd>
                <dt>2020/5/23</dt>
                <dd>初版</dd>
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

@Component
export default class AboutTabContent extends Vue
{
}
</script>

<style scoped>
    .revision_text
    {
        font-size: small;
    }
</style>