/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import type { PlayerStats } from '@/models/PlayerStats';
import { aggregatePlayerStats, ShortenedPlayerStat } from '@/models/ShortenedPlayerStat';
import { yakuList } from '@/models/Yaku';
import { dateNumToDate } from '@/util/DateExtensions';
import { paramsToDecimal, paramsToInteger, paramsToProbability } from '@/util/ParamsValueFormatter';
import type { SingleColumnDefinition, DistributedColumnDefinition } from './grids/ColumnDefinition';
import { createRowData, StatsGridField, StatsGridRowDataViewModel, yakuFields } from './StatsGridRowDataViewModel';
import { lowerBoundIndex, upperBoundIndex } from "../util/ArrayExtensions";

const numberCellWidth = 90;

function createNumericSingleColumnDefinition(field: StatsGridField, headerName: string, valueFormatter: (params: { readonly value: number | null }) => string): SingleColumnDefinition<number>
{
    return {
        cellClass: "cell-number",
        field,
        headerName,
        sortable: true,
        sortingOrder: ["desc", "asc"],
        unSortIcon: true,
        valueFormatter,
        width: numberCellWidth
    };
}

function createGridColumnDefinitions(nameComparer: (valueA: string | null, valueB: string | null) => number): readonly DistributedColumnDefinition<string | number>[]
{
    return [
        {
            field: "name",
            headerName: "名前",
            comparator: nameComparer,
            pinned: "left",
            sortable: true,
            sortingOrder: ["desc", "asc"],
            unSortIcon: true,
            width: 80
        },
        createNumericSingleColumnDefinition("matchesCount", "半荘数", paramsToInteger),
        createNumericSingleColumnDefinition("sumIncome", "総合\n収支", paramsToInteger),
        createNumericSingleColumnDefinition("averageRank", "平均\n順位", paramsToDecimal),
        {
            headerName: "順位率",
            children: [
                createNumericSingleColumnDefinition("rank1Probability", "1位", paramsToProbability),
                createNumericSingleColumnDefinition("rank2Probability", "2位", paramsToProbability),
                createNumericSingleColumnDefinition("rank3Probability", "3位", paramsToProbability),
                createNumericSingleColumnDefinition("rank4Probability", "4位", paramsToProbability),
            ]
        },
        createNumericSingleColumnDefinition("averageScore", "平均\n点数", paramsToInteger),
        createNumericSingleColumnDefinition("blownAwayProbability", "飛び率", paramsToProbability),
        createNumericSingleColumnDefinition("gamesCount", "総局数", paramsToInteger),
        {
            headerName: "配牌時",
            children: [
                createNumericSingleColumnDefinition("dealtAverageShantenCount", "平均\n聴向数", paramsToDecimal),
                createNumericSingleColumnDefinition("dealtAverageDoraCount", "平均\nドラ数", paramsToDecimal),
            ]
        },
        createNumericSingleColumnDefinition("riichiProbability", "立直率", paramsToProbability),
        createNumericSingleColumnDefinition("averageRiichiRound", "平均\n立直\n巡目", paramsToDecimal),
        createNumericSingleColumnDefinition("meldProbability", "副露率", paramsToProbability),
        {
            headerName: "総合",
            children: [
                createNumericSingleColumnDefinition("totalWinProbability", "和了率", paramsToProbability),
                createNumericSingleColumnDefinition("totalAverageWinScore", "平均\n和了点", paramsToInteger),
                createNumericSingleColumnDefinition("totalAverageDoubles", "平均\n飜数", paramsToDecimal),
                createNumericSingleColumnDefinition("totalAverageAllDoraCount", "平均\n総ドラ\n枚数", paramsToDecimal),
                createNumericSingleColumnDefinition("totalSelfDrawProbability", "ツモ率", paramsToProbability),
                createNumericSingleColumnDefinition("totalAverageWinRound", "平均\n和了\n巡目", paramsToDecimal),
                createNumericSingleColumnDefinition("totalFeedingProbability", "放銃率", paramsToProbability),
                createNumericSingleColumnDefinition("totalAverageFeedingScore", "平均\n放銃点", paramsToInteger),
                createNumericSingleColumnDefinition("totalLossBySelfDrawProbability", "ツモ\nられ\n率", paramsToProbability),
                createNumericSingleColumnDefinition("totalAverageLossBySelfDraw", "平均\nツモ\n失点", paramsToInteger)
            ]
        },
        {
            headerName: "立直時",
            children: [
                createNumericSingleColumnDefinition("riichiWinProbability", "和了率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiAverageWinScore", "平均\n和了点", paramsToInteger),
                createNumericSingleColumnDefinition("riichiAverageDoubles", "平均\n飜数", paramsToDecimal),
                createNumericSingleColumnDefinition("riichiAverageAllDoraCount", "平均\n総ドラ\n枚数", paramsToDecimal),
                createNumericSingleColumnDefinition("riichiAverageHiddenDoraCount", "平均\n裏ドラ\n枚数", paramsToDecimal),
                createNumericSingleColumnDefinition("riichiSelfDrawProbability", "ツモ率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiAverageWinRound", "平均\n和了\n巡目", paramsToDecimal),
                createNumericSingleColumnDefinition("riichiFeedingProbability", "放銃率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiAverageFeedingScore", "平均\n放銃点", paramsToInteger),
                createNumericSingleColumnDefinition("riichiLossBySelfDrawProbability", "ツモ\nられ\n率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiAverageLossBySelfDraw", "平均\nツモ\n失点", paramsToInteger),
                createNumericSingleColumnDefinition("riichiPreempitiveProbability", "先制\n立直率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiBadFormProbability", "愚形\n立直率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiFuritenProbability", "フリ\nテン\n立直率", paramsToProbability),
                createNumericSingleColumnDefinition("riichiTrickProbability", "引っ\n掛け\n立直率", paramsToProbability)
            ]
        },
        {
            headerName: "副露時",
            children: [
                createNumericSingleColumnDefinition("meldWinProbability", "和了率", paramsToProbability),
                createNumericSingleColumnDefinition("meldAverageWinScore", "平均\n和了点", paramsToInteger),
                createNumericSingleColumnDefinition("meldAverageDoubles", "平均\n飜数", paramsToDecimal),
                createNumericSingleColumnDefinition("meldAverageAllDoraCount", "平均\n総ドラ\n枚数", paramsToDecimal),
                createNumericSingleColumnDefinition("meldSelfDrawProbability", "ツモ率", paramsToProbability),
                createNumericSingleColumnDefinition("meldAverageWinRound", "平均\n和了\n巡目", paramsToDecimal),
                createNumericSingleColumnDefinition("meldFeedingProbability", "放銃率", paramsToProbability),
                createNumericSingleColumnDefinition("meldAverageFeedingScore", "平均\n放銃点", paramsToInteger),
                createNumericSingleColumnDefinition("meldLossBySelfDrawProbability", "ツモ\nられ\n率", paramsToProbability),
                createNumericSingleColumnDefinition("meldAverageLossBySelfDraw", "平均\nツモ\n失点", paramsToInteger)
            ]
        },
        {
            headerName: "親番",
            children: [
                createNumericSingleColumnDefinition("dealerWinProbability", "和了率", paramsToProbability),
                createNumericSingleColumnDefinition("dealerAverageWinScore", "平均\n和了点", paramsToInteger),
                createNumericSingleColumnDefinition("dealerAverageDoubles", "平均\n飜数", paramsToDecimal),
                createNumericSingleColumnDefinition("dealerAverageAllDoraCount", "平均\n総ドラ\n枚数", paramsToDecimal),
                createNumericSingleColumnDefinition("dealerSelfDrawProbability", "ツモ率", paramsToProbability),
                createNumericSingleColumnDefinition("dealerAverageWinRound", "平均\n和了\n巡目", paramsToDecimal),
                createNumericSingleColumnDefinition("dealerFeedingProbability", "放銃率", paramsToProbability),
                createNumericSingleColumnDefinition("dealerAverageFeedingScore", "平均\n放銃点", paramsToInteger),
                createNumericSingleColumnDefinition("dealerLossBySelfDrawProbability", "ツモ\nられ\n率", paramsToProbability),
                createNumericSingleColumnDefinition("dealerAverageLossBySelfDraw", "平均\nツモ\n失点", paramsToInteger)
            ]
        },
        {
            headerName: "役出現期待値",
            children: [
                createNumericSingleColumnDefinition("pinfuProbability", "平和", paramsToProbability),
                createNumericSingleColumnDefinition("tanyaoProbability", "断幺九", paramsToProbability),
                createNumericSingleColumnDefinition("fanpaiProbability", "飜牌", paramsToProbability),
            ]
        },
        {
            headerName: "役出現回数",
            children: yakuFields.map((yakuField, i) => createNumericSingleColumnDefinition(yakuField, yakuList[i], paramsToInteger))
        }
    ]
}

export class StatsTabViewModel
{
    private readonly playerStats: readonly {
        date: Date,
        stats: ReadonlyMap<string, ShortenedPlayerStat>
    }[];

    readonly columnDefs: readonly DistributedColumnDefinition<string | number>[];

    constructor(
        private readonly playersName: readonly string[],
        playerStats: PlayerStats
    )
    {
        this.playerStats = playerStats.map(({ dateNum, stats }) => ({
            date: dateNumToDate(dateNum),
            stats: new Map(stats.map(({ name, stat }) => [name, stat]))
        }));
        this.columnDefs = createGridColumnDefinitions(this.nameComparer);
    }

    // thisがこのインスタンスを指すようにアロー関数式で記述
    private nameComparer = (a: string | null, b: string | null): number =>
    {
        return this.playersName.indexOf(a!) - this.playersName.indexOf(b!);
    }
    
    getRowData(dateFrom: Date | null, dateTo: Date | null): readonly StatsGridRowDataViewModel[]
    {
        const dates = this.playerStats.map(({ date }) => date);
        const l = dateFrom !== null ? lowerBoundIndex(dates, dateFrom) : 0;
        const r = dateTo !== null ? upperBoundIndex(dates, dateTo) : this.playerStats.length;
        const targetPlayerStats = this.playersName.map(() => [] as ShortenedPlayerStat[]);
        for (let i = l; i < r; ++i)
        {
            for (let j = 0; j < this.playersName.length; ++j)
            {
                const stat = this.playerStats[i].stats.get(this.playersName[j]);
                if (stat !== undefined)
                {
                    targetPlayerStats[j].push(stat);
                }
            }
        }
        const aggregatedPlayerStats = targetPlayerStats.map(stats => aggregatePlayerStats(stats));
        return aggregatedPlayerStats.map((stat, i) => createRowData(this.playersName[i], stat));
    }
}