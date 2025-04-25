
const ToggleTypes = {
    Dropdown: "Dropdown",
    Toggle: "Toggle"
}

class Settings {
    /**
     * @param {String} displayName
     * @param {String} settingsType
     * @param {String} toggleType
     * @param {boolean} active
     * @param {function?} onChangeValue
     * @param {Boolean} onlyActive
     */
    constructor(displayName, settingsType, toggleType, active, onChangeValue, onlyActive = false) {
        this.displayName = displayName;
        this.settingsType = settingsType;
        this.toggleType = toggleType;
        this.active = active;
        this.onChangeValue = onChangeValue;
        this.onlyActive = onlyActive;
    }
}

class RestrictedSettings extends Settings {
    /**
     * @param {String} displayName
     * @param {String} restrictedDropdownText
     * @param {String} restrictedMessageText
     * @param {String} settingsType
     * @param {String} toggleType
     * @param {boolean} active
     * @param {function} availabilityTest
     * @param {function?} onChangeValue
     * @param {Boolean} onlyActive
     */
    constructor(displayName, restrictedDropdownText, restrictedMessageText, settingsType, toggleType, active, availabilityTest, onChangeValue, onlyActive = false) {
        super(displayName, settingsType, toggleType, active, onChangeValue, onlyActive);

        this.restrictedDropdownText = restrictedDropdownText;
        this.restrictedMessageText = restrictedMessageText;
        this.availabilityTest = availabilityTest;
    }
}

export { RestrictedSettings, Settings, ToggleTypes };