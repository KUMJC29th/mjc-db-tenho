/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

export type SingleColumnDefinition<T> = {
    readonly field: string,
    readonly headerName: string,
    readonly cellClass?: string,
    readonly comparator?: (valueA: T | null, valueB: T | null) => number,
    readonly pinned?: "left" | "right",
    readonly sortable?: boolean,
    readonly sortingOrder?: readonly ("asc" | "desc" | null)[],
    readonly unSortIcon?: boolean,
    readonly valueFormatter?: (params: { readonly value: T | null }) => string,
    readonly width?: number
}

export type GroupColumnDefinition<T> = {
    readonly headerName: string,
    readonly children: readonly SingleColumnDefinition<T>[]
}

export type ColumnDefinition<T> = SingleColumnDefinition<T> | GroupColumnDefinition<T>

export type DistributedColumnDefinition<T> = T extends infer R ? ColumnDefinition<R> : never;