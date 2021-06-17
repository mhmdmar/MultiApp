<template>
    <svgicon
        class="toolbar-icon"
        :icon="iconName"
        :disabled="disabled"
        @click="emitClick"
    ></svgicon>
</template>

<script>
    import "@/components/icons/Toolbar_Delete";
    import "@/components/icons/Edit";
    import "@/components/icons/Hint";
    import "@/components/icons/Error";
    import "@/components/icons/Confirm";
    import "@/components/icons/Toolbar_Add";
    import "@/components/icons/Toolbar_Export";
    import "@/components/icons/Arrow_Down";
    import "@/components/icons/Arrow_Up";
    import "@/components/icons/Dragging";
    import "@/components/icons/Arrow_Left";
    import "@/components/icons/Search";
    import "@/components/icons/Board";
    export default {
        name: "SVGIcon",
        props: ["iconName", "disabled"],
        methods: {
            emitClick() {
                if (!this.disabled) {
                    this.$emit("click");
                }
            }
        },
        data() {
            return {};
        }
    };
</script>

<style lang="scss">
    $disabled_color: grey;
    .toolbar-icon {
        cursor: pointer;
        width: 16px;
        height: 16px;
        fill: black;
        &:hover {
            background-color: rgba(0, 0, 0, 0.05);
            fill: black;
        }
        &:disabled,
        &[disabled] {
            box-shadow: none;
            background-color: inherit;
            cursor: inherit;
            fill: $disabled_color;
            &:hover {
                fill: $disabled_color;
            }
        }
    }
    .error-icon {
        fill: red;
        & > path {
            fill: white;
        }
        &:hover {
            fill: red;
        }
        &:disabled {
            box-shadow: none;
        }
    }
    .success-icon {
        fill: green;
        &:hover {
            fill: green;
        }
        &:disabled {
            box-shadow: none;
            fill: $disabled_color;
        }
    }
</style>
