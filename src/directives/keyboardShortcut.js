const modifiersApplied = (event, shortcut) => {
    if (!event || !shortcut) {
        return false;
    }
    const modifiers = shortcut.modifiers;
    let len = modifiers?.length || 0;
    let applied = true;
    for (let i = 0; i < len; i++) {
        const curModifier = modifiers[i];
        if (!event[curModifier]) {
            applied = false;
        }
    }
    return applied;
};
const validateShortcutArray = shortcutsArray => {
    let error = "";
    if (shortcutsArray === undefined) {
        error = "undefined shortcuts array";
    } else if (!Array.isArray(shortcutsArray)) {
        error = "shortcuts binding is not a valid array";
    } else if (shortcutsArray.length === 0) {
        error = "cannot bind empty shortcuts array";
    }
    if (error !== "") {
        throw new Error(`keyboard-shortcuts binding error: "${error}"`);
    } else {
        shortcutsArray.forEach(shortcut => {
            if (typeof shortcut.modifiers === "string") {
                shortcut.modifiers = [shortcut.modifiers];
            }
        });
    }
};
const validateDebounceTime = debounceTime => {
    let error = "";
    if (typeof debounceTime !== "number" && debounceTime <= 0) {
        error = "debounce time can only be positive number";
    }
    if (error !== "") {
        throw new Error(`keyboard-shortcuts binding error: "${error}"`);
    }
    return true;
};
const validateBinding = binding => {
    if (binding === undefined) {
        throw new Error(`cannot bind with empty object`);
    }
    validateShortcutArray(binding.shortcutsArray);
    validateDebounceTime(binding.debounceTime);
};

const isEnabled = bindingEnabled => {
    let enabled;
    switch (typeof bindingEnabled) {
        case "boolean":
            enabled = bindingEnabled;
            break;
        case "function":
            enabled = bindingEnabled();
            break;
        case "undefined":
        default:
            enabled = true;
            break;
    }
    return enabled;
};
const activateShortcut = (shortcut, event) => {
    if (shortcut && !shortcut.isDisabled?.()) {
        shortcut.callback?.();
        shortcut.preventDefault && event.preventDefault();
        shortcut.stopPropagation && event.stopPropagation();
    }
};

const getModifiersLength = shortcut => shortcut?.modifiers?.length || 0;

const getShortcut = (shortcuts, event) => {
    return shortcuts
        .filter(shortcut => {
            let exist = false;
            switch (typeof shortcut.key) {
                case "string":
                case "number":
                    exist = event.keyCode === shortcut.key;
                    break;
                case "object":
                    if (Array.isArray(shortcut.key)) {
                        exist = shortcut.key.includes(event.keyCode);
                    }
                    break;
                default:
                    break;
            }
            return exist;
        })
        .sort(
            (shortcut1, shortcut2) =>
                getModifiersLength(shortcut2) - getModifiersLength(shortcut1)
        )
        .find(shortcut => modifiersApplied(event, shortcut));
};
const checkDebounceTime = (el, debounceTime) => {
    let pass = true;
    if (debounceTime !== undefined) {
        if (el.time !== undefined) {
            pass = Date.now() - el.time > debounceTime;
        }
        el.time = Date.now();
    }
    return pass;
};
// v-shortcuts="{shortcutsArray: getKeyboardShortcuts(), stopPropagation: true}"
export default {
    bind(el, binding) {
        validateBinding(binding.value);
        const {
            shortcutsArray,
            bindingEnabled,
            debounceTime,
            stopPropagation
        } = binding.value;
        el.keydownCallback = event => {
            if (isEnabled(bindingEnabled)) {
                if (checkDebounceTime(el, debounceTime)) {
                    stopPropagation && event.stopPropagation();
                    const shortcut = getShortcut(shortcutsArray, event);
                    activateShortcut(shortcut, event);
                }
            }
        };

        el.addEventListener("keydown", el.keydownCallback);
    },

    unbind(el) {
        el.removeEventListener("keydown", el.keydownCallback);
    }
};
