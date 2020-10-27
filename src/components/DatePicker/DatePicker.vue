<template>
    <div>
        <div>
            <label><input class="text-box" readonly type="text" :value="displayDate" @click="openWindow"></label>
        </div>
        <div class="modal-overlay"
            v-if="showsWindow"
            @click.self="closeWindow"
        >
            <DatePickerWindow class="modal-window"
                :selected-date="selectedDate"
                :min-date="minDateWithoutTime"
                :max-date="maxDateWithoutTime"
                @on-date-selected="onDateSelected"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { ColDefUtil } from 'ag-grid-community';
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import DatePickerWindow from "./DatePickerWindow.vue";

@Component({
    components: {
        DatePickerWindow
    }
})
export default class DatePicker extends Vue
{
    @Prop({ required: false, default: null })
    selectedDate!: Date | null;

    get displayDate(): string
    {
        return this.selectedDate !== null ? `${this.selectedDate.getFullYear()}/${this.selectedDate.getMonth() + 1}/${this.selectedDate.getDate()}` : "選択されていません";
    }

    @Prop({ required: false, default: null })
    minDate!: Date | null;

    @Prop({ required: false, default: null })
    maxDate!: Date | null;

    get minDateWithoutTime(): Date | null
    {
        return this.minDate === null ? null
            : new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate());
    }

    get maxDateWithoutTime(): Date | null
    {
        return this.maxDate === null ? null
            : new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate());
    }

    onDateSelected(newDate: Date | null): void
    {
        this.raiseDateSelected(newDate);
        this.closeWindow();
    }

    @Emit("date-selected")
    raiseDateSelected(newDate: Date | null): Date | null
    {
        return newDate;
    }

    showsWindow: boolean = false;

    openWindow(): void
    {
        this.showsWindow = true;
    }

    closeWindow(): void
    {
        this.showsWindow = false;
    }
}
</script>

<style scoped>
.modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-window {
    background-color: white;
    padding: 10px;
}

.text-box {
    width: 150px;
}
</style>