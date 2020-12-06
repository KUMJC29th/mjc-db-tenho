/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

import { Player } from '@/models/Player';
import { PlayerStats } from '@/models/PlayerStats';
import { getDateChartViewModelPercent, getDateChartViewModelSignedInteger } from '@/services/getDateChartViewModel';
import { dateNumToDate } from '@/util/DateExtensions';
import { DateChartViewModel } from './charts/DateChartViewModel';

export class ChartTabViewModel
{
    private map = new Map<string, DateChartViewModel>();

    readonly defaultBeginDate: Date;
    readonly defaultEndDate: Date;

    constructor(
        private players: readonly Player[],
        private playerStats: PlayerStats
    )
    {
        const beginDate = dateNumToDate(playerStats[0].dateNum);
        this.defaultBeginDate = new Date(beginDate.getFullYear(), beginDate.getMonth(), 1);
        const endDate = new Date();
        this.defaultEndDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    }

    get totalIncome(): DateChartViewModel
    {
        if (!this.map.has("totalIncome")) {
            this.map.set("totalIncome", getDateChartViewModelSignedInteger(this.players.map(player => player.name), this.playerStats, stat => stat.i));
        }

        return this.map.get("totalIncome")!;
    }

    get quinellaRate(): DateChartViewModel
    {
        if (!this.map.has("quinellaRate")) {
            this.map.set("quinellaRate", getDateChartViewModelPercent(
                this.players.map(player => player.name),
                this.playerStats,
                stat => stat.r[0] + stat.r[1],
                stat => stat.m,
                { minY: 0.25, maxY: 0.75, intervalY: 0.05 }
            ));
        }

        return this.map.get("quinellaRate")!;
    }
}