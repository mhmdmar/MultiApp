<template>
    <div class="search-container">
        <label>
            <input
                class="search"
                placeholder="Search text..."
                type="Search"
                :disabled="disabled"
                v-model="searchText"
            />
        </label>
        <SVGIcon
            icon_name="Search"
            class="search-icon"
            :class="[searchText === '' ? 'visible' : 'hidden']"
            :disabled="disabled"
        ></SVGIcon>
    </div>
</template>

<script>
    import SVGIcon from "@/components/SVGIcon";
    export default {
        name: "Search",
        components: {SVGIcon},
        props: ["disabled"],
        data() {
            return {
                searchText: "",
                writing: false
            };
        },
        watch: {
            searchText() {
                if (!this.writing) {
                    setTimeout(() => {
                        this.$store.commit("updateSearchText", this.searchText);
                        this.writing = false;
                    }, 500); // 500 ms delay
                }
                this.writing = true;
            }
        },
        methods: {}
    };
</script>

<style scoped lang="scss">
    .search-container {
        display: flex;
        align-items: baseline;
        border-bottom: 1px solid #ffffff;
        color: #ffffff;
        margin-right: 10px;
    }
    .search {
        border-bottom-color: #0079ef;
        height: 32px;
        width: 100%;
        line-height: 16px;
        font-size: 16px;
        border-radius: 0;
        border-width: 0 0 1px;
        padding: 7px 7px;
        box-shadow: none;
        box-sizing: border-box;
        margin-bottom: 0;
        text-align: left;
        outline: none;
        &:disabled,
        &[disabled] {
            border-bottom-color: grey;
        }
    }
    .search-icon {
        margin-left: -24px;
        fill: blue;
        cursor: inherit;
        &:hover {
            background-color: unset;
            fill: blue;
        }
    }
</style>
