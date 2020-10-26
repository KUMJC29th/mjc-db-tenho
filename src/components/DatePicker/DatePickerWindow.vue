<template>
    <div class="root-container">
        <div class="header-container">
            <div class="arrow-container"
                @click="previous"
            >
                <div class="arrow-left"></div>
            </div>
            <template v-if="isSelectingDate">
                <div class="header-content-container"
                    @click="selectYear"
                >
                    <div class="header-content">{{ currentYear }}年</div>
                </div>
                <div class="header-content-container"
                    @click="selectMonth"
                >
                    <div class="header-content">{{ currentMonth + 1 }}月</div>
                </div>
            </template>
            <template v-if="isSelectingMonth">
                <div class="header-content-container">
                    <div class="header-content">{{ currentYear }}年</div>
                </div>
            </template>
            <template v-if="isSelectingYear">
                <div class="header-content-container">
                    <div class="header-content">{{ currentDecade }} - {{ currentDecade + 9 }}年</div>
                </div>
            </template>
            <div class="arrow-container"
                @click="next"
            >
                <div class="arrow-right"></div>
            </div>
        </div>
        <DatePickerCalendar v-if="isSelectingDate"
            :selected-date="selectedDate"
            :min-date="minDate"
            :max-date="maxDate"
            :current-year="currentYear"
            :current-month="currentMonth"
            @on-date-cell-clicked="onDateCellClicked"
        />
        <DatePickerMonthList v-if="isSelectingMonth"
            :min-month="minMonth"
            :max-month="maxMonth"
            @on-month-cell-clicked="onMonthCellClicked"
        />
        <DatePickerYearList v-if="isSelectingYear"
            :first-year="currentDecade"
            :min-year="minYear"
            :max-year="maxYear"
            @on-year-cell-clicked="onYearCellClicked"
        />
        <div class="button-container">
            <div class="button-item" @click="deselectDate">
                <div>選択解除</div>
            </div>
            <div class="button-item" @click="closeWindow">
                <div>閉じる</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import DatePickerCalendar from './DatePickerCalendar.vue';
import DatePickerMonthList from './DatePickerMonthList.vue';
import DatePickerYearList from "./DatePickerYearList.vue";

@Component({
    components: {
        DatePickerCalendar,
        DatePickerMonthList,
        DatePickerYearList
    }
})
export default class DatePickerWindow extends Vue
{
    // REGION: Date Selection
    @Prop({ required: true })
    selectedDate!: Date | null;

    onDateCellClicked(newDate: Date): void
    {
        this.raiseDateSelected(newDate);
    }
    // END REGION: Date Selection

    // REGION: Settings
    @Prop({ required: false, default: null })
    minDate!: Date | null;

    @Prop({ required: false, default: null })
    maxDate!: Date | null;
    // END REGION: Settings

    // REGION: Year Selection
    get minYear(): number | null
    {
        return this.minDate?.getFullYear() ?? null;
    }

    get maxYear(): number | null
    {
        return this.maxDate?.getFullYear() ?? null;
    }

    onYearCellClicked(year: number): void
    {
        this.currentYear = year;
        this.selectionMode = "date";
    }
    // END REGION: Year Selection

    // REGION: Month Selection
    get minMonth(): number | null
    {
        return this.minDate === null ? null
            : this.currentYear === this.minYear ? this.minDate.getMonth()
            : null;
    }

    get maxMonth(): number | null
    {
        return this.maxDate === null ? null
            : this.currentYear === this.maxYear ? this.maxDate.getMonth()
            : null;
    }

    onMonthCellClicked(month: number): void
    {
        this.currentMonth = month;
        this.selectionMode = "date";
    }
    // END REGION: Month Selection

    // REGION: Selection Mode
    selectionMode: "date" | "month" | "year" = "date";

    get isSelectingDate()
    {
        return this.selectionMode === "date";
    }

    get isSelectingMonth()
    {
        return this.selectionMode === "month";
    }

    get isSelectingYear()
    {
        return this.selectionMode === "year";
    }
    // END REGION: Selection Mode

    // REGION: Header
    currentYear: number = this.selectedDate?.getFullYear() ?? new Date().getFullYear();
    currentMonth: number = this.selectedDate?.getMonth() ?? new Date().getMonth();

    get currentDecade(): number
    {
        return Math.floor(this.currentYear / 10) * 10;
    }

    get yearMonth(): string
    {
        return `${this.currentYear}年 ${this.currentMonth + 1}月`;
    }

    selectYear(): void
    {
        this.selectionMode = "year";
    }

    selectMonth(): void
    {
        this.selectionMode = "month";
    }

    previous(): void
    {
        switch (this.selectionMode)
        {
            case "date":
                this.previousMonth();
                break;
            case "month":
                this.previousYear();
                break;
            case "year":
                this.previousDecade();
                break;
            default:
                break;
        }
    }

    next(): void
    {
        switch (this.selectionMode)
        {
            case "date":
                this.nextMonth();
                break;
            case "month":
                this.nextYear();
                break;
            case "year":
                this.nextDecade();
                break;
            default:
                break;
        }
    }

    private previousMonth(): void
    {
        if (this.minDate === null || this.minDate < new Date(this.currentYear, this.currentMonth, 1))
        {
            if (this.currentMonth === 0)
            {
                --this.currentYear;
                this.currentMonth = 11;
            }
            else
            {
                --this.currentMonth;
            }
        }
    }

    private previousYear(): void
    {
        if (this.minYear === null || this.minYear < this.currentYear)
        {
            --this.currentYear;
        }
    }

    private previousDecade(): void
    {
        if (this.minYear === null || this.minYear <= this.currentDecade - 1)
        {
            this.currentYear -= 10;
        }
    }

    private nextMonth(): void
    {
        if (this.maxDate === null || new Date(this.currentYear, this.currentMonth + 1, 1) <= this.maxDate)
        {
            if (this.currentMonth === 11)
            {
                ++this.currentYear;
                this.currentMonth = 0;
            }
            else
            {
                ++this.currentMonth;
            }
        }
    }

    private nextYear(): void
    {
        if (this.maxYear === null || this.maxYear > this.currentYear)
        {
            ++this.currentYear;
        }
    }

    private nextDecade(): void
    {
        if (this.maxYear === null || this.maxYear >= this.currentDecade + 10)
        {
            this.currentYear += 10;
        }
    }
    // END REGION: Header

    // REGION: Footer
    @Emit("on-date-selected")
    deselectDate(): null
    {
        return null;
    }

    closeWindow(): void
    {
        this.raiseDateSelected(this.selectedDate);
    }
    // END REGION: Footer

    // REGION: Closing
    @Emit("on-date-selected")
    raiseDateSelected(newDate: Date | null): Date | null
    {
        return newDate;
    }
    // ENDREGION: Closing
}
</script>

<style scoped>
.root-container {
    cursor: default;
    width: 280px;
}

.header-container {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header-content-container {
    flex-grow: 1;
    width: 50px;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
}
.header-content-container:hover {
    background-color: #e8e8e8;
}

.header-content {
    text-align: center;
}

.arrow-container {
    width: 40px;
    height: inherit;
    flex-grow: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.arrow-container:hover {
    background-color: #e8e8e8;
}

.arrow-left {
    display: block;
    margin-left: 7.5px;
    width: 15px;
    height: 15px;
    border-bottom: solid 3px black;
    border-left: solid 3px black;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.arrow-right {
    display: block;
    margin-right: 7.5px;
    width: 15px;
    height: 15px;
    border-top: solid 3px black;
    border-right: solid 3px black;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
}

.button-container {
    width: inherit;
    height: 35px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
}

.button-item {
    width: 90px;
    height: 30px;
    background-color: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-item:hover {
    background-color: #e8e8e8;
}
</style>