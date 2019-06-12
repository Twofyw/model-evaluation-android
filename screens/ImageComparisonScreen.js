import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, FAB, Portal} from 'react-native-paper';
import DatasetAccordion from '../components/DatasetAccordion';
import '../global'

const cheerio = require('react-native-cheerio');

let dataset_2_dir = {
    'road extraction': 'road_extraction/',
    'cell isbi 2012': 'cell_membrance/',
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
    state = {
        idx: 0,
        expanded: false,
        dataset: 'road extraction',
        cell_pred_urls: [],
        model: Object.keys(this.score_path_dict)[0],
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

            entries.each((_, el) => { urls.push(el.attribs.href) });
            entries = urls;
        }

        this.setState({
            dataset: dataset,
            cell_pred_urls: entries
        });
    };

    renderPredictions() {
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
                    console.log(p_url);
                    items.push(<Card.Title key={idx} subtitle={'Prediction: ' + url}/>);
                    items.push(<Card.Cover style={styles.cover} key={-idx - 1} source={{uri: p_url}}/>);
                }
                return items;
            default:
                return;
        }
    }

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
        return (
            <View>
                <Card>
                    <Card.Title title={'Image No.' + this.state.idx.toString()} subtitle="Input Image"/>
                    <Card.Cover style={styles.cover} source={{uri: img_url}}/>

                    <Card.Title subtitle="Ground truth"/>
                    <Card.Cover style={styles.cover} source={{uri: gt_url}}/>

                    {this.renderPredictions()}

                    <Card.Actions>
                        <Button>View details</Button>
                    </Card.Actions>
                </Card>

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
            </View>
        );
    }

    render() {
        return (<View style={styles.container}>
                <ScrollView style={styles.container}>
                    <DatasetAccordion
                        dataset={this.state.dataset}
                        handleSetDataset={this._handleSetDataset}
                    />
                    {this.renderImages()}
                </ScrollView>
            </View>
        );
    }

    cell_idx = [12, 14, 15, 18, 19, 20, 21, 25, 27, 28, 3, 5, 6, 8, 9,];

    _handlePagination(isDown) {
        this.setState({
            idx: Math.max(this.state.idx + (isDown * 2 - 1), 0)
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    cover: {
        height: Dimensions.get('window').width
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
});
