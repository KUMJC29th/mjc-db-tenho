/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import type { DeepMutable } from '@/util/DeepMutable';

export type ShortenedPlayerStat = {
    /** matchesCount */
    readonly m: number;
    /** ranksCount */
    readonly r: number[];
    /** totalIncome */
    readonly i: number;
    /** sumScore  */
    readonly ss: number;
    /** blownAwayCount */
    readonly b: number;
    /** sumShantenCount */
    readonly sc: number;
    /** sumDoraCount */
    readonly d: number;
    /** winLossStats */
    readonly w: {
        /** total */
        readonly t: ShortenedWinLossStat;
        /** riichi */
        readonly r: ShortenedRiichiWinLossStat;
        /** meld */
        readonly m: ShortenedWinLossStat;
        /** dealer */
        readonly d: ShortenedDealerWinLossStat;
    }
    /** yakuCount */
    readonly y: number[];
}

export type ShortenedWinLossStat = {
    /** gamesCount */
    readonly g: number;
    /** winsCount */
    readonly wc: number;
    /** sumWinScore */
    readonly ws: number;
    /** sumDoubles */
    readonly d: number;
    /** selfDrawCount */
    readonly sc: number;
    /** feedingCount */
    readonly fc: number;
    /** sumFeedingScore */
    readonly fs: number;
    /** lossBySelfDrawCount */
    readonly lc: number;
    /** sumLossScoreBySelfDraw */
    readonly ls: number;
    /** sumWinRound */
    readonly wr: number;
}

export type ShortenedRiichiWinLossStat = ShortenedWinLossStat & {
    /** sumRiichiRound */
    readonly rr: number;
    /** preemptiveCount */
    readonly rp: number;
    /** badFormWaitingCount */
    readonly rb: number;
    /** furitenCount */
    readonly rf: number;
    /** trickCount */
    readonly rt: number;
}

export type ShortenedDealerWinLossStat = ShortenedWinLossStat & {
    /** dealerCount */
    readonly dd: number;
    /** sumDealerKeepingCount */
    readonly dk: number;
}

export function createNewShortenedPlayerStat(): ShortenedPlayerStat
{
    return {
        m: 0,
        r: [0, 0, 0, 0],
        i: 0,
        ss: 0,
        b: 0,
        sc: 0,
        d: 0,
        w: {
            t: {
                g: 0,
                wc: 0,
                ws: 0,
                d: 0,
                sc: 0,
                fc: 0,
                fs: 0,
                lc: 0,
                ls: 0,
                wr: 0
            },
            r: {
                g: 0,
                wc: 0,
                ws: 0,
                d: 0,
                sc: 0,
                fc: 0,
                fs: 0,
                lc: 0,
                ls: 0,
                wr: 0,
                rr: 0,
                rp: 0,
                rb: 0,
                rf: 0,
                rt: 0
            },
            m: {
                g: 0,
                wc: 0,
                ws: 0,
                d: 0,
                sc: 0,
                fc: 0,
                fs: 0,
                lc: 0,
                ls: 0,
                wr: 0
            },
            d: {
                g: 0,
                wc: 0,
                ws: 0,
                d: 0,
                sc: 0,
                fc: 0,
                fs: 0,
                lc: 0,
                ls: 0,
                wr: 0,
                dd: 0,
                dk: 0
            }
        },
        y: [...new Array(55)].map(() => 0)
    };
}

export function aggregatePlayerStats(playerStats: readonly ShortenedPlayerStat[]): ShortenedPlayerStat
{
    const initial = createNewShortenedPlayerStat();

    return playerStats.reduce(
        (acc: DeepMutable<ShortenedPlayerStat>, item) => {
            acc.m += item.m;
            acc.r[0] += item.r[0];
            acc.r[1] += item.r[1];
            acc.r[2] += item.r[2];
            acc.r[3] += item.r[3];
            acc.i += item.i;
            acc.ss += item.ss;
            acc.b += item.b;
            acc.sc += item.sc;
            acc.d += item.d;

            acc.w.t.g  += item.w.t.g;
            acc.w.t.wc += item.w.t.wc;
            acc.w.t.ws += item.w.t.ws;
            acc.w.t.d  += item.w.t.d;
            acc.w.t.sc += item.w.t.sc;
            acc.w.t.fc += item.w.t.fc;
            acc.w.t.fs += item.w.t.fs;
            acc.w.t.lc += item.w.t.lc;
            acc.w.t.ls += item.w.t.ls;
            acc.w.t.wr += item.w.t.wr;

            acc.w.r.g  += item.w.r.g;
            acc.w.r.wc += item.w.r.wc;
            acc.w.r.ws += item.w.r.ws;
            acc.w.r.d  += item.w.r.d;
            acc.w.r.sc += item.w.r.sc;
            acc.w.r.fc += item.w.r.fc;
            acc.w.r.fs += item.w.r.fs;
            acc.w.r.lc += item.w.r.lc;
            acc.w.r.ls += item.w.r.ls;
            acc.w.r.wr += item.w.r.wr;
            acc.w.r.rr += item.w.r.rr;
            acc.w.r.rp += item.w.r.rp;
            acc.w.r.rb += item.w.r.rb;
            acc.w.r.rf += item.w.r.rf;
            acc.w.r.rt += item.w.r.rt;

            acc.w.m.g  += item.w.m.g;
            acc.w.m.wc += item.w.m.wc;
            acc.w.m.ws += item.w.m.ws;
            acc.w.m.d  += item.w.m.d;
            acc.w.m.sc += item.w.m.sc;
            acc.w.m.fc += item.w.m.fc;
            acc.w.m.fs += item.w.m.fs;
            acc.w.m.lc += item.w.m.lc;
            acc.w.m.ls += item.w.m.ls;
            acc.w.m.wr += item.w.m.wr;

            acc.w.d.g  += item.w.d.g;
            acc.w.d.wc += item.w.d.wc;
            acc.w.d.ws += item.w.d.ws;
            acc.w.d.d  += item.w.d.d;
            acc.w.d.sc += item.w.d.sc;
            acc.w.d.fc += item.w.d.fc;
            acc.w.d.fs += item.w.d.fs;
            acc.w.d.lc += item.w.d.lc;
            acc.w.d.ls += item.w.d.ls;
            acc.w.d.wr += item.w.d.wr;
            acc.w.d.dd += item.w.d.dd;
            acc.w.d.dk += item.w.d.dk;

            for (let i = 0; i < acc.y.length; ++i)
            {
                acc.y[i] += item.y[i];
            }

            return acc;
        },
        initial
    );
}

