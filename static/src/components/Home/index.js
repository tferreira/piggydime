import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'

class Home extends React.Component {
  state = {
    finished: false,
    stepIndex: 0
  }

  handleNext = () => {
    const { stepIndex } = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2
    })
  }

  handlePrev = () => {
    const { stepIndex } = this.state
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 })
    }
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <FormattedMessage id="home.steps.one"/>
      case 1:
        return <FormattedMessage id="home.steps.two"/>
      case 2:
        return <FormattedMessage id="home.steps.three"/>
      default:
        return 'I want to break free!'
    }
  }

  render() {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }
    return (
      <div className="container text-center">
        <h1>Hello, welcome on Piggydime.</h1>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Login or register</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an account</StepLabel>
          </Step>
          <Step>
            <StepLabel>Recurring transactions</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished
            ? <p>
                <a
                  href="#"
                  onClick={event => {
                    event.preventDefault()
                    this.setState({ stepIndex: 0, finished: false })
                  }}
                >
                  Click here
                </a>{' '}
                to go back to the beginning.
              </p>
            : <div>
                <p>
                  {this.getStepContent(stepIndex)}
                </p>
                <div style={{ marginTop: 12 }}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onTouchTap={this.handleNext}
                  />
                </div>
              </div>}
        </div>
      </div>
    )
  }
}

export default Home
