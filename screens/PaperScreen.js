import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, DataTable, Title} from 'react-native-paper';

export default class PaperScreen extends React.Component {
    static navigationOptions = {
        title: 'Evaluation',
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                    <Card>
                        <Card.Title title="Vegas" subtitle="097"
                                    // left={(props) => <Avatar.Icon {...props} icon="folder"/>}
                        />
                        {/*<Card.Content>*/}
                        {/*    <Title>Image No.1</Title>*/}
                        {/*    /!*<Paragraph>Card content</Paragraph>*!/*/}
                        {/*</Card.Content>*/}
                        <Card.Cover source={{uri: 'https://picsum.photos/700'}}/>
                        <Card.Actions>
                            <Button>View details</Button>
                        </Card.Actions>
                    </Card>

                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Topological Metrics</DataTable.Title>
                            <DataTable.Title numeric>APLS (GT over P)</DataTable.Title>
                            <DataTable.Title numeric>APLS (P over GT)</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>D-LinkNet</DataTable.Cell>
                            <DataTable.Cell numeric>8.000</DataTable.Cell>
                            <DataTable.Cell numeric>8.000</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>D-LinkNet (2D Loss)</DataTable.Cell>
                            <DataTable.Cell numeric>0.000</DataTable.Cell>
                            <DataTable.Cell numeric>0.000</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Header>
                            <DataTable.Title>Pixel Metrics</DataTable.Title>
                            <DataTable.Title numeric>IoU</DataTable.Title>
                            <DataTable.Title numeric>Precision</DataTable.Title>
                            <DataTable.Title numeric>Recall</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>D-LinkNet</DataTable.Cell>
                            <DataTable.Cell numeric>0.000</DataTable.Cell>
                            <DataTable.Cell numeric>0.000</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>D-LinkNet (2D Loss)</DataTable.Cell>
                            <DataTable.Cell numeric>0.000</DataTable.Cell>
                            <DataTable.Cell numeric>{12+999}.000</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Pagination
                            page={1}
                            numberOfPages={3}
                            onPageChange={(page) => {
                                console.log(page);
                            }}
                            label="1-2 of 6"
                        />
                    </DataTable>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        // backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 30,
    },
});
