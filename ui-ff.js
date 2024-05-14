function uiFeatureFlags () {
    require(['https://unpkg.com/launchdarkly-js-client-sdk@3'], function(LDClient) {
        const context = {
            kind: 'user',
            key: 'example-user-key',
            name: 'Sandy',
        }
        const ldclient = LDClient.initialize('659c257fd655c910832acbaf', context)

        function render() {
            const flags = ldclient.allFlags()
            const ffKeys = Object.keys(flags);
            ffKeys.forEach((flagKey) => {
                const elements = document.getElementsByClassName(flagKey)
                if(!elements || elements.length === 0) {
                    return
                }
                for(let i = 0; i < elements.length; i++) {
                    const element = elements[i]
                    const flagValue = flags[flagKey];
                    if (element) {
                        element.style.display = flagValue ? 'block' : 'none'
                    }
                }
            })
        }

        ldclient.on('ready', render)
        ldclient.on('change', render)
   });

}
uiFeatureFlags()