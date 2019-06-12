import React from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, FAB, Modal, Portal, Text} from 'react-native-paper';
import DatasetAccordion from '../components/DatasetAccordion';
import Swiper from 'react-native-swiper';
import '../global'

let dataset_2_dir = {
    'road extraction': 'road_extraction/',
};

export default class SwiperScreen extends React.Component {
    static navigationOptions = {
        title: 'Visualization',
    };

    _handleSetDataset = (dataset) => {
        this.setState({
            dataset: dataset
        })
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
        swipeIdx: 0,
        expanded: false,
        dataset: 'road extraction',
        model: Object.keys(this.score_path_dict)[0],
    };

    renderPredictions() {
        switch (this.state.dataset) {
            case 'road extraction':
                const items = [];
                for (const [idx, [k, v]] of Object.entries(Object.entries(this.score_path_dict))) {
                    let p_url = global.base_url + dataset_2_dir[this.state.dataset] + "eval_result/" + v + "/" + this.state.idx.toString() + ".png?a="+Math.random();
                    items.push(<Card.Title key={idx} subtitle={'Prediction: ' + k}/>);
                    items.push(<Card.Cover key={-idx-1} source={{uri: p_url}}/>);
                }
                return items;
            default:
                return;
        }
    }

    renderRGB(swipeIdx) {
        switch (this.state.dataset) {
            case 'road extraction':
                let img_url = global.base_url + dataset_2_dir[this.state.dataset] + "DeepGlobe_test/" + swipeIdx.toString() + "_sat.jpg";
                return (
                    <View>
                        <Card.Title title={'IIIImage No.' + swipeIdx.toString()} subtitle="Satellite Imagery"/>
                        <Card.Cover source={{uri: img_url}}/>
                    </View>
                );
            default:
                return;
        }
    }

    renderImages() {
        switch (this.state.dataset) {
            case 'road extraction':
                let gt_url = global.base_url + dataset_2_dir[this.state.dataset] + "DeepGlobe_test/" + this.state.idx.toString() + "_mask.png";
                return (
                    <View>
                        <Card>
                            <Card.Title subtitle="Ground truth" />
                            <Card.Cover source={{uri: gt_url}}/>
                            {this.renderPredictions()}
                            <Card.Actions>
                                <Button>View details</Button>
                            </Card.Actions>
                        </Card>
                    </View>
                );
            case 'cell isbi 2012':
                return;
            default:
                return;
        }
    }

    _onMomentumScrollEnd(e, state, context) {
        console.log(state, context.state)
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container}>
                    <DatasetAccordion
                        dataset={this.state.dataset}
                        handleSetDataset={this._handleSetDataset}
                    />
                    <Swiper style={styles.wrapper}
                            containerStyle={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height/2.5 }}
                            showsButtons={true}
                            onMomentumScrollEnd ={this._onMomentumScrollEnd}
                    >
                        {this.renderRGB(this.state.swipeIdx)}
                        {this.renderRGB(this.state.swipeIdx+1)}
                    </Swiper>
                    {this.renderImages()}
                </ScrollView>
            </View>
        );
    }

    _handlePagination(isUp) {
        this.setState({
            idx: Math.max(this.state.idx + (isUp * 2 - 1), 0)
        });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingTop: 15,
        backgroundColor: '#fff',
    },
    fab_up: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 100,
    },
    fab_down: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 50,
    },
});
