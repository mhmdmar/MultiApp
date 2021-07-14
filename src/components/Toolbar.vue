<template>
    <div class="top-note-toolbar-buttons">
        <div class="left-toolbar-icon">
            <div
                v-for="(icon, idx) in leftIcons"
                :key="idx"
                class="items-center inline-flex mr-2 ml-1"
            >
                <SvgIcon
                    :icon="icon.name"
                    :disabled="icon.disabled"
                    @click="icon.callback"
                ></SvgIcon>
            </div>
        </div>
        <div class="flex-right-side">
            <div v-for="(icon, idx) in rightIcons" :key="idx">
                <Search
                    class="search-bar"
                    v-if="icon.type === 'search'"
                    :disabled="icon.disabled"
                ></Search>
                <SvgIcon
                    v-else
                    :icon="icon.name"
                    :disabled="icon.disabled"
                    @click="icon.callback"
                ></SvgIcon>
            </div>
        </div>
    </div>
</template>

<script>
    import SvgIcon from "@/components/Shared/SvgIcon";
    import Search from "@/components/Board/Search";
    export default {
        name: "Toolbar",
        components: {
            Search,
            SvgIcon
        },
        props: {
            leftIcons: {
                type: Array,
                default: () => {}
            },
            rightIcons: {
                type: Array,
                default: () => {}
            }
        }
    };
</script>

<style scoped>
    .top-note-toolbar-buttons {
        display: flex;
        margin-bottom: 5px;
    }
    .flex-right-side {
        display: flex;
        margin-left: auto;
        overflow: hidden;
    }
    .left-toolbar-icon {
        display: flex;
        flex-grow: 0.1;
    }
</style>
