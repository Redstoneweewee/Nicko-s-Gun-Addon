
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
     * @param {function} availabilityTest
     * @param {Boolean} onlyActive
     */
    constructor(displayName, settingsType, toggleType, active, availabilityTest, onlyActive = false) {
        this.displayName = displayName;
        this.settingsType = settingsType;
        this.toggleType = toggleType;
        this.active = active;
        this.availabilityTest = availabilityTest;
        this.onlyActive = onlyActive;
    }
}

export { Settings, ToggleTypes };