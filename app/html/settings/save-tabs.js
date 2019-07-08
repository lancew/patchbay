const nest = require('depnest')
const { h, when } = require('mutant')

exports.gives = nest({
  'app.html.settings': true
})

exports.needs = nest({
  'settings.obs.get': 'first'
})

exports.create = function (api) {
  return nest({
    'app.html.settings': general
  })

  function general () {
    const font = api.settings.obs.get('patchbay.general.openSaveTabsEnabled', false)

    return {
      group: 'general',
      title: 'Save Tabs',
      body: h('SaveTabsStyles', [
        h('div', { 'ev-click': () => font.set(!font()) }, [
          h('label', 'Enable Saving Open Tabs'),
          h('i.fa', { className: when(font, 'fa-check-square', 'fa-square-o') })
        ])
      ])
    }
  }
}
