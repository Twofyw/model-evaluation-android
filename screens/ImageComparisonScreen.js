import React from 'react';
import {Platform, Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Surface, Button, Card, FAB, Portal, Modal, DataTable} from 'react-native-paper';
import DatasetAccordion from '../components/DatasetAccordion';
import '../global'

const cheerio = require('react-native-cheerio');

let dataset_2_dir = {
    'road extraction': 'road_extraction/',
    'cell isbi 2012': 'cell_membrance/',
};

let alps_path_dict = {
    "U": 'edge_list',
    "U (diff)": 'edge_list_2',
    "D": 'edge_dlink',
    "D (diff)": 'edge_dlink_diff_2',
    "D (sec)": 'edge_dlink_sec',
    "D (new)": 'edge_dlinknet_plain_new4',
    "D (new diff)": 'edge_dlinknet_diff_n0.0005_new4',
    "D (std)": 'edge_dlinknet_std_diff_loss_1'
};

export default class ImageComparisonScreen extends React.Component {
    static navigationOptions = {
        title: 'Visualization',
    };
    score_path_dict = {
        "U-Net": 'unet_plain',
        "U-Net (diff)": 'unet_diff_0.0005_5',
        "D-LinkNet": 'dlinknet_plain',
        "D-LinkNet (diff)": 'dlinknet_diff_0.0005_2',
        "D-LinkNet (sec)": 'dlinknet_sec_0.0005_1',
        "D-LinkNet (new)": 'dlinknet_plain_new4',
        "D-LinkNet (new diff)": 'dlinknet_diff_n0.0005_new4',
        "D-LinkNet (std)": 'dlinknet_std_diff_loss_1',
    };
    cell_idx = [12, 14, 15, 18, 19, 20, 21, 25, 27, 28, 3, 5, 6, 8, 9,];

    state = {
        detailVisible: false,
        idx: 0,
        expanded: false,
        dataset: 'road extraction',
        cell_pred_urls: [],
        model: Object.keys(this.score_path_dict)[0],
        tableIdx: 0,
        table: [],
    };

    _handleSetDataset = async (dataset) => {
        let entries = [];
        if (dataset === 'cell isbi 2012') {
            // crawl url
            const url = global.base_url + dataset_2_dir[dataset] + "prediction/";
            const response = await fetch(url);      // fetch page
            const htmlString = await response.text();     // get response text
            const $ = cheerio.load(htmlString);           // parse HTML string
            entries = $('li a');
            // entries.map((i, el) => url + el.attribs.href);
            let urls = [];

            entries.each((_, el) => {
                urls.push(el.attribs.href)
            });
            entries = urls;
        }

        this.setState({
            idx: 0,
            dataset: dataset,
            cell_pred_urls: entries
        });
    };

    _renderPredictions() {
        const items = [];
        switch (this.state.dataset) {
            case 'road extraction':
                for (const [idx, [k, v]] of Object.entries(Object.entries(this.score_path_dict))) {
                    let p_url = global.base_url + dataset_2_dir[this.state.dataset] + "eval_result/" + v + "/" + this.state.idx.toString() + ".png?a=" + Math.random();
                    items.push(<Card.Title key={idx} subtitle={'Prediction: ' + k}/>);
                    items.push(<Card.Cover style={styles.cover} key={-idx - 1} source={{uri: p_url}}/>);
                }
                return items;
            case 'cell isbi 2012':
                // const url = global.base_url + dataset_2_dir[dataset] + "prediction/";
                for (const [idx, url] of Object.entries(this.state.cell_pred_urls)) {
                    const base_url = global.base_url + dataset_2_dir[this.state.dataset] + "prediction/";
                    let p_url = base_url + url + this.cell_idx[this.state.idx].toString() + ".png";
                    items.push(<Card.Title key={idx} subtitle={'Prediction: ' + url}/>);
                    items.push(<Card.Cover style={styles.cover} key={-idx - 1} source={{uri: p_url}}/>);
                }
                return items;
            default:
                return;
        }
    }

    _hideModal = () => this.setState({detailVisible: false});
    _viewDetail = () => this.setState({detailVisible: true});

    renderImages() {
        let img_url = '';
        let gt_url = '';
        switch (this.state.dataset) {
            case 'road extraction':
                img_url = global.base_url + dataset_2_dir[this.state.dataset] + "DeepGlobe_test/" + this.state.idx.toString() + "_sat.jpg";
                gt_url = global.base_url + dataset_2_dir[this.state.dataset] + "DeepGlobe_test/" + this.state.idx.toString() + "_mask.png";
                break;
            case 'cell isbi 2012':
                img_url = global.base_url + dataset_2_dir[this.state.dataset] + "rgb/" + this.cell_idx[this.state.idx].toString() + ".png";
                gt_url = global.base_url + dataset_2_dir[this.state.dataset] + "label_x255/" + this.cell_idx[this.state.idx].toString() + ".png";
                break;
            default:
                break;
        }
        const {detailVisible} = this.state;
        return (
            <View>
                <Card>
                    <Card.Title title={'Image No.' + this.state.idx.toString()} subtitle="Input Image"/>
                    <Card.Cover style={styles.cover} source={{uri: img_url}}/>

                    <Card.Title subtitle="Ground truth"/>
                    <Card.Cover style={styles.cover} source={{uri: gt_url}}/>

                    {this._renderPredictions()}

                    <Card.Actions>
                        <Button onPress={this._viewDetail}>View details</Button>
                    </Card.Actions>
                </Card>

                <Portal>
                    <Modal visible={detailVisible} onDismiss={this._hideModal}>
                        {this.state.table}
                    </Modal>
                </Portal>
            </View>
        );
    }

    renderFAB() {
        if (!this.state.detailVisible) {
            return (
                <Portal>
                    <FAB
                        style={styles.fab_up}
                        small
                        icon="navigate-before"
                        onPress={() => this._handlePagination(false)}
                    />
                    <FAB
                        style={styles.fab_down}
                        small
                        icon="navigate-next"
                        onPress={() => this._handlePagination(true)}
                    />
                </Portal>
            );
        }
    }

    render() {
        this._renderDetail();
        return (<View style={styles.container}>
                <ScrollView style={styles.container}>
                    <DatasetAccordion
                        dataset={this.state.dataset}
                        handleSetDataset={this._handleSetDataset}
                    />
                    {this.renderImages()}
                </ScrollView>
                {this.renderFAB()}
            </View>
        );
    }

    _handlePagination(isDown) {
        this.setState({
            idx: Math.max(this.state.idx + (isDown * 2 - 1), 0)
        });
    }

    _renderDetail() {
        let scoresPromise = [];
        for (const [idx, [modelName, dirName]] of Object.entries(Object.entries(alps_path_dict))) {
            let aplsUrl = global.base_url + dataset_2_dir[this.state.dataset] + '/example_output_ims/' + dirName +
                '/' + this.state.idx.toString() + "/output.txt";
            scoresPromise.push(fetch(aplsUrl));
        }

        Promise.all(scoresPromise)
            .then((responses) => responses.map(response => response.text()))
            .then((htmlStringsPromise) => Promise.all(htmlStringsPromise).then(htmlStrings => {
                const scores = htmlStrings
                    .map(s => s.match(/([0-9.]+)/g));
                let rows = [];
                const names = Object.keys(alps_path_dict);
                scores.forEach((score, i) => {
                    score = score.map(x => parseFloat(x).toFixed(3));
                    rows.push(
                        <DataTable.Row key={i}>
                            <DataTable.Cell>{names[i]}</DataTable.Cell>
                            <DataTable.Cell numeric>{score[0]}</DataTable.Cell>
                            <DataTable.Cell numeric>{score[1]}</DataTable.Cell>
                            <DataTable.Cell numeric>{score[2]}</DataTable.Cell>
                        </DataTable.Row>
                    )
                });
                if (this.state.table.length === 0 || this.state.tableIdx !== this.state.idx) {
                    this.setState({
                        tableIdx: this.state.idx,
                        table: (
                            <Surface style={styles.surface}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Topological (APLS)</DataTable.Title>
                                        <DataTable.Title numeric>P over GT</DataTable.Title>
                                        <DataTable.Title numeric>GT over P</DataTable.Title>
                                        <DataTable.Title numeric>Overall</DataTable.Title>
                                    </DataTable.Header>
                                    {rows}
                                </DataTable>
                            </Surface>
                        )
                    });
                }
            }));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    cover: {
        height: Dimensions.get('window').width * 1
    },
    fab_up: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 130,
    },
    fab_down: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 80,
    },
    surface: {
        marginLeft: Dimensions.get('window').width * 0.05,
        height: Dimensions.get('window').height * 0.7,
        width: Dimensions.get('window').width * 0.9,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
    },
});
