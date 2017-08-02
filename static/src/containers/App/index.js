import React from 'react'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

/* application components */
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

/* translations */
import { addLocaleData, IntlProvider } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

import { flattenMessages } from '../../utils/misc'

import messages from '../../i18n/messages'

addLocaleData([...en, ...fr])

let locale =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage ||
  'en-US'

/* global styles for app */
import './styles/app.scss'

class App extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    children: React.PropTypes.node
  }

  render() {
    return (
      <IntlProvider
        locale={locale}
        messages={flattenMessages(messages[locale.substring(0, 2)])}
      >
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <section>
            <Header />
            <div
              className="container"
              style={{ marginTop: 10, paddingBottom: 250 }}
            >
              {this.props.children}
            </div>
            <div>
              <Footer />
            </div>
          </section>
        </MuiThemeProvider>
      </IntlProvider>
    )
  }
}

export { App }
