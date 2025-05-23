import * as Enums from "../1Enums/SettingsEnums"

class Settings {
    /**
     * @param {{
     * type:          typeof Enums.SettingsTypes[keyof typeof Enums.SettingsTypes],
     * displayName:   string,
     * settingsType:  string,
     * toggleType:    string,
     * active:        boolean,
     * onChangeValue: function?,
     * onlyActive:    boolean,
     * }} def
     */
    constructor(def) {
        this.type          = def.type;
        this.displayName   = def.displayName;
        this.settingsType  = def.settingsType;
        this.toggleType    = def.toggleType;
        this.active        = def.active;
        this.onChangeValue = def.onChangeValue;
        this.onlyActive    = def.onlyActive;
    }
}

class RestrictedSettings extends Settings {
    /**
     * @param {Settings & {
     * restrictedDropdownText: string,
     * restrictedMessageText:  string,
     * availabilityTest:       function,
     * }} def
     */
    constructor(def) {
        super(def);
        this.restrictedDropdownText = def.restrictedDropdownText;
        this.restrictedMessageText  = def.restrictedMessageText;
        this.availabilityTest       = def.availabilityTest;
    }
}

export { RestrictedSettings, Settings };