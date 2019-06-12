import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Checkbox, TextInput, Divider, Text} from 'react-native-paper';
import SetModeOfImageAccordion from '../components/SetModeOfImageAccordion';
import '../global';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };
    state = {
        raw_url: global.raw_url,
        port: global.port,
        mode_of_image: 'Default',
        checked_1: true,
        checked_2: true,
        checked_3: true,
        checked_4: true,
        checked_5: true,
        checked_6: true,
    };

    _handleSetModeOfImage = (mode) => {
        this.setState({
            mode_of_image: mode,
        })
    };

    render() {
        // const {checked} = this.state.checked_1;
        return (<View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text>Connection</Text>
                    <TextInput
                        type = 'outlined'
                        label='URL'
                        value={this.state.raw_url}
                        onChangeText = {text => this.setState({raw_url: text})}
                    />
                    <TextInput
                        // type = 'outlined'
                        label='Port'
                        value={this.state.port}
                        onChangeText = {text => this.setState({port: text})}
                    />
                    <Divider/>
                    <SetModeOfImageAccordion
                        mode={this.state.mode_of_image}
                        handleSetModeOfImage={this._handleSetModeOfImage}
                    />
                    <Divider/>
                    <Text>Qualifications</Text>
                    <Checkbox
                        status = {this.state.checked_1 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_1: !this.state.checked_1});}}
                    />
                    <Text style={styles.checkboxLabel}>APLS (GT over P)</Text>
                    <Checkbox
                        status = {this.state.checked_2 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_2: !this.state.checked_2});}}
                    />
                    <Text style={styles.checkboxLabel}>APLS (P over GT)</Text>
                    <Checkbox
                        status = {this.state.checked_3 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_3: !this.state.checked_3});}}
                    />
                    <Text style={styles.checkboxLabel}>APLS (Total)</Text>
                    <Checkbox
                        status = {this.state.checked_4 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_4: !this.state.checked_4});}}
                    />
                    <Text style={styles.checkboxLabel}>IoU</Text>
                    <Checkbox
                        status = {this.state.checked_5 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_5: !this.state.checked_5});}}
                    />
                    <Text style={styles.checkboxLabel}>Precision</Text>
                    <Checkbox
                        status = {this.state.checked_6 ? 'checked' : 'unchecked'}
                        onPress = {() => {this.setState({checked_6: !this.state.checked_6});}}
                    />
                    <Text style={styles.checkboxLabel}>Recall</Text>
                </ScrollView>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    // checkboxRow: {
    //     minHeight: 48,
    //     fixDirection: 'row',
    //     alignItems: 'center',
    //     paddingHorizontal: 8,
    // },
    // checkboxContainer: {
    //     paddingRight: 8,
    // },
    // checkboxLabel: {
    //     flex: 1,
    //     flexWrap: 'wrap',
    // },
});