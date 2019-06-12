import React from 'react';
import {List} from 'react-native-paper';

export default class SetModeOfImageAccordion extends React.Component {
  // requires: handleSetDataset

  state = {
    expanded: false
  };

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  };

  render() {
    return (<List.Section>
      <List.Accordion
          title={'Mode of Image: ' + this.props.mode}
          expanded={this.state.expanded}
          onPress={this._handlePress}
      >
        {
          global.mode_of_image.map((mode, idx) =>
              <List.Item
                  key={idx}
                  title={mode}
                  onPress={() => {
                    this.props.handleSetModeOfImage(mode);
                    this._handlePress();
                  }
                  }
              />)
        }
      </List.Accordion>
    </List.Section>);
  }
}