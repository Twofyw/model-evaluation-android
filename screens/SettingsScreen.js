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
        checked_0: global.checked[0],
        checked_1: global.checked[1],
        checked_2: global.checked[2],
        checked_3: global.checked[3],
        checked_4: global.checked[4],
        checked_5: global.checked[5],
    };

    _handleSetModeOfImage = (mode) => {
        this.setState({
            mode_of_image: mode,
        });
        global.isBinarization = mode === 'Binarization Threshold';
    };

    render() {
        // const {checked} = this.state.checked_1;
        return (<View style={styles.container}>
                <ScrollView style={styles.container}>
                    <Text style={styles.headerLabel}>Connection</Text>
                    <TextInput
                        type = 'outlined'
                        label='URL'
                        value={this.state.raw_url}
                        onChangeText = {text => {
                            global.raw_url = text;
                            this.setState({raw_url: global.raw_url});
                        }}
                    />
                    <TextInput
                        // type = 'outlined'
                        label='Port'
                        value={this.state.port}
                        onChangeText = {text => {
                            global.port = text;
                            this.setState({port: global.port});
                        }}
                    />
                    <Divider/>
                    <Text style={styles.headerLabel}>Mode of Image</Text>
                    <SetModeOfImageAccordion
                        mode={this.state.mode_of_image}
                        handleSetModeOfImage={this._handleSetModeOfImage}
                    />
                    <Divider/>
                    <Text style={styles.headerLabel}>Qualifications</Text>
                    <View style={styles.checkboxRow}>
                        <Checkbox
                            status = {this.state.checked_0 ? 'checked' : 'unchecked'}
                            onPress = {() => {
                                global.checked[0] = !global.checked[0];
                                this.setState({checked_0: global.checked[0]});}}
                       />
                        <Text style={styles.checkboxLabel}>APLS (GT over P)</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                    <Checkbox
                        status = {this.state.checked_1 ? 'checked' : 'unchecked'}
                        onPress = {() => {
                                global.checked[1] = !global.checked[1];
                                this.setState({checked_1: global.checked[1]});}}

                    />
                    <Text style={styles.checkboxLabel}>APLS (P over GT)</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                    <Checkbox
                        status = {this.state.checked_2 ? 'checked' : 'unchecked'}
                        onPress = {() => {
                                global.checked[2] = !global.checked[2];
                                this.setState({checked_2: global.checked[2]});}}

                    />
                    <Text style={styles.checkboxLabel}>APLS (Total)</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                    <Checkbox
                        status = {this.state.checked_3 ? 'checked' : 'unchecked'}
                        onPress = {() => {
                                global.checked[3] = !global.checked[3];
                                this.setState({checked_3: global.checked[3]});}}

                    />
                    <Text style={styles.checkboxLabel}>IoU</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                    <Checkbox
                        status = {this.state.checked_4 ? 'checked' : 'unchecked'}
                        onPress = {() => {
                                global.checked[4] = !global.checked[4];
                                this.setState({checked_4: global.checked[4]});}}

                    />
                    <Text style={styles.checkboxLabel}>Precision</Text>
                    </View>
                    <View style={styles.checkboxRow}>
                    <Checkbox
                        status = {this.state.checked_5 ? 'checked' : 'unchecked'}
                        onPress = {() => {
                                global.checked[5] = !global.checked[5];
                                this.setState({checked_5: global.checked[5]});}}

                    />
                    <Text style={styles.checkboxLabel}>Recall</Text>
                    </View>
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
    headerLabel: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 20,
    },
    checkboxRow: {
        // minHeight: 48,
        // fixDirection: 'row',
        // alignItems: 'center',
        // paddingHorizontal: 8,
        flexDirection: 'row',
    },
    checkboxContainer: {
        paddingRight: 8,
    },
    checkboxLabel: {
        // flex: 1,
        // flexWrap: 'wrap',
        marginTop: 8
    },
});