<template>
    <div>
        <span> {{ title }}</span>
        <div v-for="option in options" :key="option.value">
            <label>
                <input
                    type="radio"
                    :value="option.value"
                    :name="name"
                    v-model="pickedOption"
                />
                {{ option.text }}
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OptionsList",
        props: {
            title: {
                type: String,
                default: ""
            },
            name: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            defaultValue: {
                type: [String, Number, Boolean],
                default: null
            }
        },
        data() {
            return {
                pickedOption: this.defaultValue || this.options[0].value
            };
        },
        mounted() {
            this.$emit("updatePickedOption", this.pickedOption);
        },
        watch: {
            pickedOption() {
                this.$emit("updatePickedOption", this.pickedOption);
            }
        },
        methods: {}
    };
</script>

<style scoped></style>
