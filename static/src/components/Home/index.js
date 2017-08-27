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
        return <FormattedMessage id="home.steps.one.description" />
      case 1:
        return <FormattedMessage id="home.steps.two.description" />
      case 2:
        return <FormattedMessage id="home.steps.three.description" />
      default:
        return 'I want to break free!'
    }
  }

  render() {
    const { finished, stepIndex } = this.state
    const contentStyle = { margin: '0 16px' }
    return (
      <div className="container text-center">
        <h1>
          <FormattedMessage id="home.welcome" />
        </h1>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>
              <FormattedMessage id="home.steps.one.title" />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <FormattedMessage id="home.steps.two.title" />
            </StepLabel>
          </Step>
          <Step>
            <StepLabel>
              <FormattedMessage id="home.steps.three.title" />
            </StepLabel>
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
                  <FormattedMessage id="stepper.clickHere" />
                </a>{' '}
                <FormattedMessage id="stepper.backToBeginning" />
              </p>
            : <div>
                <p>
                  {this.getStepContent(stepIndex)}
                </p>
                <div style={{ marginTop: 12 }}>
                  <FlatButton
                    label={<FormattedMessage id="stepper.back" />}
                    disabled={stepIndex === 0}
                    onTouchTap={this.handlePrev}
                    style={{ marginRight: 12 }}
                  />
                  <RaisedButton
                    label={
                      stepIndex === 2
                        ? <FormattedMessage id="stepper.finish" />
                        : <FormattedMessage id="stepper.next" />
                    }
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
