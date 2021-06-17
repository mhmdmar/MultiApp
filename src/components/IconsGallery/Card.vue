<template>
    <div class="card" :class="{short: !this.description, wide: wide}">
        <div class="component" :class="{row: row}">
            <slot></slot>
        </div>
        <div class="copy-text" :class="{'copy-success': copied}">
            Code Copied to Clipboard!
        </div>
        <div class="container" :class="{short: !this.description}">
            <div class="container-body">
                <div class="component-title" @click="copyCode(code)">
                    <h4>
                        <b>{{ title }}</b>
                    </h4>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: ["wide", "title", "code", "description", "row"],
        data() {
            return {
                copied: false
            };
        },
        methods: {
            copyCode(code) {
                navigator.clipboard.writeText(code);
                console.log("code copied!");
                this.copied = true;
                const _this = this;
                window.setTimeout(function() {
                    _this.copied = false;
                    console.log("_this.copied", _this.copied);
                }, 2000);

                // navigator.clipboard.readText().then(text => outputElem.innerText = text);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 240px;
        border: 1px solid darkgray;
        border-radius: 4px;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        transition: 0.3s;
        margin: 8px;
        min-width: 232px;
        height: 440px;
        padding: 4px;

        &:hover {
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
        }

        .copy-text {
            visibility: hidden;
            position: relative;
            font-size: 12px;
            color: #1aac60;
            font-weight: bold;
            &.copy-success {
                visibility: visible;
            }
        }

        &.short {
            width: 168px;
            height: 232px;
            min-width: 144px;
        }

        &.wide {
            width: 506px;
            min-width: 360px;
            .component {
                width: 90%;
            }
        }

        .component {
            display: flex;
            height: 200px;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            max-width: 100%;

            &.row {
                flex-direction: row;
                align-items: center;
            }
        }

        .container {
            border-top: 1px solid silver;
            width: 100%;
            background-color: #abcdef;
            display: flex;
            flex-direction: column;

            .container-body {
                padding: 8px;

                .component-title {
                    cursor: pointer;
                    color: white;

                    &:hover {
                        color: #0079ef;
                    }
                }
                .description {
                    font-size: 12px;
                    color: white;
                }

                .code {
                    margin-top: 16px;
                    word-break: break-word;
                    user-select: all;
                    font-size: 14px;
                }
            }
        }
    }
</style>
