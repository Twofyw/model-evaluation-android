import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {DataTable} from 'react-native-paper';
import DatasetAccordion from '../components/DatasetAccordion';

export default class PaperScreen extends React.Component {
    static navigationOptions = {
        title: 'Evaluation',
    };

    state = {
        dataset: 'road extraction'
    };

    products = [
        {
            'name': 'D (std)',
            'apls_p_gt': 0.579403,
            'apls_gt_p': 0.697097,
            'apls': 0.601464,
            'iou': 0.67646,
            'precision': 0.81231,
            'recall': 0.801465
        },
        {
            'name': 'D (new)',
            'apls_p_gt': 0.517974,
            'apls_gt_p': 0.706993,
            'apls': 0.567421,
            'iou': 0.636073,
            'precision': 0.837164,
            'recall': 0.73255
        },
        {
            'name': 'D (plain)',
            'apls_p_gt': 0.3685661275511126,
            'apls_gt_p': 0.6254445244973894,
            'apls': 0.4203304218221382,
            'iou': 0.5075850289242988,
            'precision': 0.8685007913450823,
            'recall': 0.5590910658961741
        },
        {
            'name': 'D (diff)',
            'apls_p_gt': 0.4226484098048485,
            'apls_gt_p': 0.637647304422096,
            'apls': 0.4674587379946328,
            'iou': 0.5384192501123967,
            'precision': 0.7852009737985332,
            'recall': 0.6458986210644396
        },
        {
            'name': 'D (sec)',
            'apls_p_gt': 0.3670889786358398,
            'apls_gt_p': 0.6191104989817916,
            'apls': 0.4211484206208344,
            'iou': 0.5169711125526725,
            'precision': 0.8200872006967703,
            'recall': 0.5909521173747312
        },
        {
            'name': 'U (plain)',
            'apls_p_gt': 0.23802770043151067,
            'apls_gt_p': 0.6480889989922292,
            'apls': 0.30207708250658555,
            'iou': 0.44676353078022546,
            'precision': 0.7900982940214218,
            'recall': 0.5231785599935963
        },
        {
            'name': 'U (diff)',
            'apls_p_gt': 0.3310422078591199,
            'apls_gt_p': 0.6693561629859361,
            'apls': 0.3983602080607802,
            'iou': 0.4874670371959236,
            'precision': 0.7382584489005295,
            'recall': 0.6290060050991141
        }
    ];

    _handleSetDataset = (dataset) => {
        this.setState({
            dataset: dataset
        })
    };

    renderTable() {
        return (
            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Topological (APLS)</DataTable.Title>
                    <DataTable.Title numeric>P over GT</DataTable.Title>
                    <DataTable.Title numeric>GT over P</DataTable.Title>
                    <DataTable.Title numeric>Overall</DataTable.Title>
                </DataTable.Header>
                {this.products.map(
                    ({name, apls_p_gt, apls_gt_p, apls}, i) =>
                        <DataTable.Row key={i}>
                            <DataTable.Cell>{name}</DataTable.Cell>
                            <DataTable.Cell numeric>{apls_p_gt.toFixed(2)}</DataTable.Cell>
                            <DataTable.Cell numeric>{apls_gt_p.toFixed(2)}</DataTable.Cell>
                            <DataTable.Cell numeric>{apls.toFixed(2)}</DataTable.Cell>
                        </DataTable.Row>
                )}

                <DataTable.Header>
                    <DataTable.Title>Pixel</DataTable.Title>
                    <DataTable.Title numeric>IoU</DataTable.Title>
                    <DataTable.Title numeric>Precision</DataTable.Title>
                    <DataTable.Title numeric>Recall</DataTable.Title>
                </DataTable.Header>
                {this.products.map(
                    ({name, iou, precision, recall}, i) =>
                        <DataTable.Row key={i}>
                            <DataTable.Cell>{name}</DataTable.Cell>
                            <DataTable.Cell numeric>{iou.toFixed(2)}</DataTable.Cell>
                            <DataTable.Cell numeric>{precision.toFixed(2)}</DataTable.Cell>
                            <DataTable.Cell numeric>{recall.toFixed(2)}</DataTable.Cell>
                        </DataTable.Row>
                )}
            </DataTable>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <DatasetAccordion
                        dataset={this.state.dataset}
                        handleSetDataset={this._handleSetDataset}
                    />
                    {
                        this.renderTable()
                    }
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
    contentContainer: {
        paddingTop: 30,
    },
});
