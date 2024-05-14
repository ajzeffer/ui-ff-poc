function uiFeatureFlags () {
    const flags = ['adam_poc_ui', 'adams_poc_ui_button']

    // LaunchDarkly SDK script has finished loading
    // Now you can safely use LDClient
    const context = {
        kind: 'user',
        key: 'example-user-key',
        name: 'Sandy',
    }
    const ldclient = LDClient.initialize('659c257fd655c910832acbaf', context)

    function render() {
        flags.forEach((flagKey) => {
            const elements = document.getElementsByClassName(flagKey)
            if(!elements || elements.length === 0) {
                return
            }
            for(let i = 0; i < elements.length; i++) {
                const element = elements[i]
                const flagValue = ldclient.variation(flagKey, true)
                if (element) {
                    element.style.display = flagValue ? 'block' : 'none'
                }
            }
        })
    }

    ldclient.on('ready', render)
    ldclient.on('change', render)
}
uiFeatureFlags()