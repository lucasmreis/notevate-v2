import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  View,
  Text
} from "react-native";

type Props = {
  sentences: string[],
  goToAdd: () => mixed,
  removeSentenceAction: (sentence: string) => mixed
};

export default class extends React.Component<Props> {
  getSize() {
    return {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  removeSentence = (sentence: string) => () =>
    this.props.removeSentenceAction(sentence);

  renderPage = (sentence: string, i) => {
    return (
      <View key={i} style={[styles.page, this.getSize()]}>
        <Button title="Add" onPress={this.props.goToAdd} />
        <Text>{sentence}</Text>
        <Button title="Remove" onPress={this.removeSentence(sentence)} />
      </View>
    );
  };

  render() {
    const { sentences } = this.props;
    return (
      <ScrollView horizontal pagingEnabled style={styles.container}>
        {sentences.map(this.renderPage)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
