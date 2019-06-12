import React from 'react';
import {List} from 'react-native-paper';

export default class DatasetAccordion extends React.Component {
  // requires: handleSetDataset

  state = {
    expanded: false
  };

  _handlePress = () => {
    this.setState({
      expanded: !this.state.expanded
    })
  };

  static capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  render() {
    return (<List.Section>
      <List.Accordion
          title={DatasetAccordion.capitalize(this.props.dataset)} // bug: not updating on pressing child
          left={props => <List.Icon {...props} icon="folder"/>}
          expanded={this.state.expanded}
          onPress={this._handlePress}
      >
        {
          global.datasets.map((dataset, idx) =>
              <List.Item
                  key={idx}
                  title={DatasetAccordion.capitalize(dataset)}
                  onPress={() => {
                    this.props.handleSetDataset(dataset);
                    this._handlePress();
                  }}
              />)
        }
      </List.Accordion>
    </List.Section>);
  }
}
