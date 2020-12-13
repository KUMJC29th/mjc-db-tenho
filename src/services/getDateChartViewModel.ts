/* Copyright © 2020 matcher-ice
* This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
* This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { PlayerStats } from '@/models/PlayerStats';
import { ShortenedPlayerStat } from '@/models/ShortenedPlayerStat';
import { dateNumToDate } from '@/util/DateExtensions';
import { ChartDataItem } from '@/view_models/charts/ChartDataItem';
import { DateChartViewModel } from '@/view_models/charts/DateChartViewModel';
import { MatchResult } from '@/models/MatchResult';
import { group, ofType } from '@/util/ArrayExtensions';
import { getCurrentDanPoint, getNewDanPoint, getUpperBoundDanPoint } from './getDanPoint';

export function getDateChartViewModelSignedInteger(
    players: readonly string[],
    playerStats: PlayerStats,
    selector: (stat: ShortenedPlayerStat) => number
): DateChartViewModel
{
    let min = 0;
    let max = 0;
    const data: ChartDataItem[] = [];

    const sumValues: (number | null)[] = [...new Array(players.length)].map(() => null);
    for (const { dateNum, stats } of playerStats)
    {
        const date = dateNumToDate(dateNum);
        const values = players.map((player, i) => {
            const stat = stats.find(stat => stat.name === player);
            if (stat === undefined) return null;
            const value = selector(stat.stat);
            const newSumValue = (sumValues[i] ?? 0) + value;
            sumValues[i] = newSumValue;
            min = newSumValue < min ? newSumValue : min;
            max = newSumValue > max ? newSumValue : max;
            return newSumValue;
        });
        data.push({ date, values });
    }

    const range = max - min;
    const tempInterval = range / 10;
    const pow10 = Math.pow(10, Math.floor(Math.log10(tempInterval)));
    const intervalY = Math.ceil(tempInterval / pow10) * pow10;
    const maxY = Math.ceil(max / intervalY) * intervalY;
    const minY = Math.floor(min / intervalY) * intervalY;

    return {
        valueType: "signedInteger",
        minY,
        maxY,
        intervalY,
        data
    };
}

export function getDateChartViewModelPercent(
    players: readonly string[],
    playerStats: PlayerStats,
    numeratorSelector: (stat: ShortenedPlayerStat) => number,
    denominantSelector: (stat: ShortenedPlayerStat) => number,
    rangeOption?: { readonly maxY: number, readonly minY: number, readonly intervalY: number }
): DateChartViewModel
{
    const data: ChartDataItem[] = [];

    const sumNumerators: (number | null)[] = [...new Array(players.length)].map(() => null);
    const sumDenominants: (number | null)[] = [...new Array(players.length)].map(() => null);
    for (const { dateNum, stats } of playerStats)
    {
        const date = dateNumToDate(dateNum);
        const values = players.map((player, i) => {
            const stat = stats.find(stat => stat.name === player);
            if (stat === undefined) return null;
            const numerator = numeratorSelector(stat.stat);
            const denominant = denominantSelector(stat.stat);
            const newSumNumerator = (sumNumerators[i] ?? 0) + numerator;
            const newSumDenominant = (sumDenominants[i] ?? 0) + denominant;
            sumNumerators[i] = newSumNumerator;
            sumDenominants[i] = newSumDenominant;
            return newSumNumerator / newSumDenominant;
        });
        data.push({ date, values });
    }

    return {
        valueType: "probability",
        ...(rangeOption ?? { minY: 0, maxY: 1, intervalY: 0.1 }),
        data
    };
}

export function getDateChartViewModelDan(
    players: readonly string[],
    matchResults: readonly MatchResult[]
): DateChartViewModel
{
    let maxPoint = 0;
    const data: ChartDataItem[] = [];

    const points: (number | null)[] = [...new Array(players.length)].map(() => null);
    const groupedMatchResults = group(matchResults, item => item.d);
    for (const dateMatchResults of groupedMatchResults)
    {
        const attends: boolean[] = [...new Array(players.length)].map(() => false);
        const date = dateNumToDate(dateMatchResults[0].d);
        for (const { i } of dateMatchResults)
        {
            const orderedIncomes = ofType(i).sort((x, y) => y - x); // 降順
            i.forEach((income, index) => {
                if (income !== null) 
                {
                    const rank = orderedIncomes.indexOf(income);
                    const newPoint = getNewDanPoint(points[index] ?? 200, rank);
                    points[index] = newPoint;
                    attends[index] = true;
                    maxPoint = newPoint > maxPoint ? newPoint : maxPoint;
                }
            });
        }
        data.push({
            date,
            values: attends.map((item, i) => item ? points[i] : null)
        });
    }

    const { dan: maxDan } = getCurrentDanPoint(maxPoint);
    return {
        valueType: "dan",
        maxY: getUpperBoundDanPoint(maxDan),
        minY: 0,
        intervalY: 0,
        data
    };
}