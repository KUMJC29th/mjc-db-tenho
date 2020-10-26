<template>
    <td class="root-cell"
        :class="{ 'selected-cell': isSelected, 'hidden-cell': isHidden, 'invalid-cell': isInvalid }"
        :style="styleObject"
        @click="onClicked"
    >
        {{ display }}
    </td>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class DatePikcerCell extends Vue
{
    @Prop({ required: true })
    value!: number;

    @Prop({ required: false, default: null })
    formatter!: ((value: number) => string) | null;

    get display(): string
    {
        return this.formatter !== null ? this.formatter(this.value) : this.value.toString();
    }

    @Prop({ required: false, default: false })
    isSelected!: boolean;

    @Prop({ required: false, default: false })
    isHidden!: boolean;

    @Prop({ required: false, default: false })
    isInvalid!: boolean;

    @Prop({ required: true })
    width!: number;

    @Prop({ required: true })
    height!: number;

    get styleObject(): { width: string, height: string }
    {
        return {
            width: this.width + "px",
            height: this.height + "px"
        };
    }

    onClicked(): void
    {
        if (!this.isHidden && !this.isInvalid)
        {
            this.raiseCellClicked(this.value);
        }
    }

    @Emit("on-cell-clicked")
    raiseCellClicked(value: number): number
    {
        console.log("cell raiseCellClicked");
        return value;
    }
}
</script>

<style scoped>
.root-cell {
    text-align: center;
    vertical-align: center;
}
.root-cell:hover {
    background-color: #e8e8e8;
}

.selected-cell {
    background-color: #cccccc;
}
.selected-cell:hover {
    background-color: #cccccc;
}

.hidden-cell {
    visibility: hidden;
}

.invalid-cell {
    color: #cccccc;
}
.invalid-cell:hover {
    background-color: white;
}
</style>