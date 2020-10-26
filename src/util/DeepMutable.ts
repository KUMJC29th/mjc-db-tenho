/* Copyright © 2020 matcher-ice
 * This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/. 
 * This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0. */

export type DeepMutable<T> = 
    T extends any[] ? DeepMutableArray<T[number]> :
    T extends object ? DeepMutableObject<T> :
    T;

interface DeepMutableArray<T> extends Array<DeepMutable<T>> {};

type DeepMutableObject<T> = {
    -readonly [K in keyof T]: DeepMutable<T[K]>;
}