<template>
    <div class="container">
        <div v-for="config in gameConfigs" :key="config.id" class="config-container">
            <OptionsList
                :options="config.options"
                :title="config.title"
                :name="config.id"
                :defaultValue="config.defaultValue"
                @updatePickedOption="pickedOption => (config.pickedOption = pickedOption)"
            ></OptionsList>
        </div>
        <div class="footer">
            <div>
                <button class="start-btn" @click="startClicked">START</button>
            </div>
        </div>
    </div>
</template>

<script>
    import OptionsList from "@/components/Shared/OptionsList";
    export default {
        name: "ConfigurationScreen",
        components: {OptionsList},
        props: {
            gameConfigs: {
                type: Array,
                required: true
            }
        },
        data() {
            return {};
        },
        methods: {
            startClicked() {
                const config = this.createConfigObject();
                this.$emit("startClicked", config);
            },
            createConfigObject() {
                const configs = {};
                this.gameConfigs.forEach(config => {
                    configs[config.id] = config.pickedOption;
                });
                return configs;
            }
        }
    };
</script>

<style scoped>
    .container {
        display: flex;
        background-color: white;
        flex-direction: row;
        flex-wrap: wrap;
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        height: 400px;
        width: 400px;
        align-content: flex-start;
    }

    .config-container {
        width: 150px;
        margin: 10px 0;
    }
    .footer {
        width: 100%;
        position: fixed;
        padding: 20px 5px;
        left: 0;
        bottom: 0;
        color: white;
        text-align: center;
    }
</style>
