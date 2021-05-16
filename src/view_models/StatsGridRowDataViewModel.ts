/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { ShortenedPlayerStat } from '@/models/ShortenedPlayerStat';

export const yakuFields = [
    "yaku1Count",
    "yaku2Count",
    "yaku3Count",
    "yaku4Count",
    "yaku5Count",
    "yaku6Count",
    "yaku7Count",
    "yaku8Count",
    "yaku9Count",
    "yaku10Count",
    "yaku11Count",
    "yaku12Count",
    "yaku13Count",
    "yaku14Count",
    "yaku15Count",
    "yaku16Count",
    "yaku17Count",
    "yaku18Count",
    "yaku19Count",
    "yaku20Count",
    "yaku21Count",
    "yaku22Count",
    "yaku23Count",
    "yaku24Count",
    "yaku25Count",
    "yaku26Count",
    "yaku27Count",
    "yaku28Count",
    "yaku29Count",
    "yaku30Count",
    "yaku31Count",
    "yaku32Count",
    "yaku33Count",
    "yaku34Count",
    "yaku35Count",
    "yaku36Count",
    "yaku37Count",
    "yaku38Count",
    "yaku39Count",
    "yaku40Count",
    "yaku41Count",
    "yaku42Count",
    "yaku43Count",
    "yaku44Count",
    "yaku45Count",
    "yaku46Count",
    "yaku47Count",
    "yaku48Count",
    "yaku49Count",
    "yaku50Count",
    "yaku51Count",
    "yaku52Count",
    "yaku53Count",
    "yaku54Count",
    "yaku55Count"
] as const;

const fileds = [
    "matchesCount",
    "sumIncome",
    "averageRank",
    "rank1Probability",
    "rank2Probability",
    "rank3Probability",
    "rank4Probability",
    "averageScore",
    "blownAwayProbability",
    "gamesCount",
    "dealtAverageShantenCount",
    "dealtAverageDoraCount",
    "riichiProbability",
    "averageRiichiRound",
    "meldProbability",
    "totalWinProbability",
    "totalAverageWinScore",
    "totalAverageDoubles",
    "totalAverageAllDoraCount",
    "totalSelfDrawProbability",
    "totalAverageWinRound",
    "totalFeedingProbability",
    "totalAverageFeedingScore",
    "totalLossBySelfDrawProbability",
    "totalAverageLossBySelfDraw",
    "riichiWinProbability",
    "riichiAverageWinScore",
    "riichiAverageDoubles",
    "riichiAverageAllDoraCount",
    "riichiAverageHiddenDoraCount",
    "riichiSelfDrawProbability",
    "riichiAverageWinRound",
    "riichiFeedingProbability",
    "riichiAverageFeedingScore",
    "riichiLossBySelfDrawProbability",
    "riichiAverageLossBySelfDraw",
    "riichiPreempitiveProbability",
    "riichiBadFormProbability",
    "riichiFuritenProbability",
    "riichiTrickProbability",
    "meldWinProbability",
    "meldAverageWinScore",
    "meldAverageDoubles",
    "meldAverageAllDoraCount",
    "meldSelfDrawProbability",
    "meldAverageWinRound",
    "meldFeedingProbability",
    "meldAverageFeedingScore",
    "meldLossBySelfDrawProbability",
    "meldAverageLossBySelfDraw",
    "dealerWinProbability",
    "dealerAverageWinScore",
    "dealerAverageDoubles",
    "dealerAverageAllDoraCount",
    "dealerSelfDrawProbability",
    "dealerAverageWinRound",
    "dealerFeedingProbability",
    "dealerAverageFeedingScore",
    "dealerLossBySelfDrawProbability",
    "dealerAverageLossBySelfDraw",
    "pinfuProbability",
    "tanyaoProbability",
    "fanpaiProbability",
    ...yakuFields
] as const;

export type StatsGridFieldYaku = typeof yakuFields[number];

export type StatsGridField = typeof fileds[number];

export type StatsGridRowDataViewModel = {
    readonly name: string
} & {
    [key in StatsGridField]: number | null
};

function createNullRowData(name: string): StatsGridRowDataViewModel
{
    const partial: Partial<Record<StatsGridField, null>> = {};
    for (const key of fileds)
    {
        partial[key] = null;
    }
    return {
        name,
        ...partial as Required<typeof partial>
    };
}

export function createRowData(name: string, stat: ShortenedPlayerStat): StatsGridRowDataViewModel
{
    const totalGamesCount = stat.w.t.g;
    if (totalGamesCount === 0)
    {
        return createNullRowData(name);
    }
    const riichiGamesCount = stat.w.r.g;
    const meldGamesCount = stat.w.m.g;
    const dealerGamesCount = stat.w.d.g;
    const totalWinGamesCount = stat.w.t.wc;
    const riichiWinGamesCount = stat.w.r.wc;
    const meldWinGamesCount = stat.w.m.wc;
    const dealerWinGamesCount = stat.w.d.wc;
    const sumYakuRiichi = stat.y[1] + stat.y[21];

    return {
        name,
        matchesCount: stat.m,
        sumIncome: stat.i,
        averageRank: stat.r.reduce((sum, c, i) => sum + c * i, 0) / stat.m + 1,
        rank1Probability: stat.r[0] / stat.m,
        rank2Probability: stat.r[1] / stat.m,
        rank3Probability: stat.r[2] / stat.m,
        rank4Probability: stat.r[3] / stat.m,
        averageScore: stat.ss / stat.m,
        blownAwayProbability: stat.b / stat.m,
        gamesCount: totalGamesCount,
        dealtAverageShantenCount: stat.sc / totalGamesCount,
        dealtAverageDoraCount: stat.d / totalGamesCount,
        riichiProbability: stat.w.r.g / totalGamesCount,
        averageRiichiRound: stat.w.r.rr / riichiGamesCount,
        meldProbability: stat.w.m.g / totalGamesCount,

        totalWinProbability: totalWinGamesCount / totalGamesCount,
        totalAverageWinScore: stat.w.t.ws / totalWinGamesCount,
        totalAverageDoubles: stat.w.t.d / totalWinGamesCount,
        totalAverageAllDoraCount: stat.w.t.sd / totalWinGamesCount,
        totalSelfDrawProbability: stat.w.t.sc / totalWinGamesCount,
        totalAverageWinRound: stat.w.t.wr / totalWinGamesCount,
        totalFeedingProbability: stat.w.t.fc / totalGamesCount,
        totalAverageFeedingScore: stat.w.t.fs / stat.w.t.fc,
        totalLossBySelfDrawProbability: stat.w.t.lc / totalGamesCount,
        totalAverageLossBySelfDraw: stat.w.t.ls / stat.w.t.lc,

        riichiWinProbability: riichiWinGamesCount / riichiGamesCount,
        riichiAverageWinScore: stat.w.r.ws / riichiWinGamesCount,
        riichiAverageDoubles: stat.w.r.d / riichiWinGamesCount,
        riichiAverageAllDoraCount: stat.w.r.sd / riichiWinGamesCount,
        riichiAverageHiddenDoraCount: stat.w.r.sdh / sumYakuRiichi,
        riichiSelfDrawProbability: stat.w.r.sc / riichiWinGamesCount,
        riichiAverageWinRound: stat.w.r.wr / riichiWinGamesCount,
        riichiFeedingProbability: stat.w.r.fc / riichiGamesCount,
        riichiAverageFeedingScore: stat.w.r.fs / stat.w.r.fc,
        riichiLossBySelfDrawProbability: stat.w.r.lc / riichiGamesCount,
        riichiAverageLossBySelfDraw: stat.w.r.ls / stat.w.r.lc,
        riichiPreempitiveProbability: stat.w.r.rp / riichiGamesCount,
        riichiBadFormProbability: stat.w.r.rb / riichiGamesCount,
        riichiFuritenProbability: stat.w.r.rf / riichiGamesCount,
        riichiTrickProbability: stat.w.r.rt / riichiGamesCount,

        meldWinProbability: meldWinGamesCount / meldGamesCount,
        meldAverageWinScore: stat.w.m.ws / meldWinGamesCount,
        meldAverageDoubles: stat.w.m.d / meldWinGamesCount,
        meldAverageAllDoraCount: stat.w.m.sd / meldGamesCount,
        meldSelfDrawProbability: stat.w.m.sc / meldWinGamesCount,
        meldAverageWinRound: stat.w.m.wr / meldWinGamesCount,
        meldFeedingProbability: stat.w.m.fc / meldGamesCount,
        meldAverageFeedingScore: stat.w.m.fs / stat.w.m.fc,
        meldLossBySelfDrawProbability: stat.w.m.lc / meldGamesCount,
        meldAverageLossBySelfDraw: stat.w.m.ls / stat.w.m.lc,

        dealerWinProbability: dealerWinGamesCount / dealerGamesCount,
        dealerAverageWinScore: stat.w.d.ws / dealerWinGamesCount,
        dealerAverageDoubles: stat.w.d.d / dealerWinGamesCount,
        dealerAverageAllDoraCount: stat.w.d.sd / dealerGamesCount,
        dealerSelfDrawProbability: stat.w.d.sc / dealerWinGamesCount,
        dealerAverageWinRound: stat.w.d.wr / dealerWinGamesCount,
        dealerFeedingProbability: stat.w.d.fc / dealerGamesCount,
        dealerAverageFeedingScore: stat.w.d.fs / stat.w.d.fc,
        dealerLossBySelfDrawProbability: stat.w.d.lc / dealerGamesCount,
        dealerAverageLossBySelfDraw: stat.w.d.ls / stat.w.d.lc,

        pinfuProbability: stat.y[7] / totalWinGamesCount,
        tanyaoProbability: stat.y[8] / totalWinGamesCount,
        fanpaiProbability: stat.y.filter((_, i) => i >= 10 && i <= 20).reduce((sum, c) => sum + c, 0) / totalWinGamesCount,

        yaku1Count: stat.y[0],
        yaku2Count: stat.y[1],
        yaku3Count: stat.y[2],
        yaku4Count: stat.y[3],
        yaku5Count: stat.y[4],
        yaku6Count: stat.y[5],
        yaku7Count: stat.y[6],
        yaku8Count: stat.y[7],
        yaku9Count: stat.y[8],
        yaku10Count: stat.y[9],
        yaku11Count: stat.y[10],
        yaku12Count: stat.y[11],
        yaku13Count: stat.y[12],
        yaku14Count: stat.y[13],
        yaku15Count: stat.y[14],
        yaku16Count: stat.y[15],
        yaku17Count: stat.y[16],
        yaku18Count: stat.y[17],
        yaku19Count: stat.y[18],
        yaku20Count: stat.y[19],
        yaku21Count: stat.y[20],
        yaku22Count: stat.y[21],
        yaku23Count: stat.y[22],
        yaku24Count: stat.y[23],
        yaku25Count: stat.y[24],
        yaku26Count: stat.y[25],
        yaku27Count: stat.y[26],
        yaku28Count: stat.y[27],
        yaku29Count: stat.y[28],
        yaku30Count: stat.y[29],
        yaku31Count: stat.y[30],
        yaku32Count: stat.y[31],
        yaku33Count: stat.y[32],
        yaku34Count: stat.y[33],
        yaku35Count: stat.y[34],
        yaku36Count: stat.y[35],
        yaku37Count: stat.y[36],
        yaku38Count: stat.y[37],
        yaku39Count: stat.y[38],
        yaku40Count: stat.y[39],
        yaku41Count: stat.y[40],
        yaku42Count: stat.y[41],
        yaku43Count: stat.y[42],
        yaku44Count: stat.y[43],
        yaku45Count: stat.y[44],
        yaku46Count: stat.y[45],
        yaku47Count: stat.y[46],
        yaku48Count: stat.y[47],
        yaku49Count: stat.y[48],
        yaku50Count: stat.y[49],
        yaku51Count: stat.y[50],
        yaku52Count: stat.y[51],
        yaku53Count: stat.y[52],
        yaku54Count: stat.y[53],
        yaku55Count: stat.y[54],
    }
}