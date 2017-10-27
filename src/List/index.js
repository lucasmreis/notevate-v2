import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  View,
  Text,
  TouchableOpacity
} from "react-native";

type Props = {
  sentences: string[],
  goToAdd: () => mixed,
  removeSentenceAction: (sentence: string) => mixed
};

type State = { currentPage: number };

export default class extends React.Component<Props, State> {
  state = { currentPage: 0 };

  getSize() {
    return {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  removeSentence = () => {
    const sentence = this.props.sentences[this.state.currentPage];
    this.props.removeSentenceAction(sentence);
    this.scrollView.scrollTo({ x: 0, y: 0, animated: false });
    this.setState({ currentPage: 0 });
  };

  handleScroll = ev => {
    const page = Math.floor(
      ev.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    this.setState({ currentPage: page });
  };

  renderPage = (sentence: string, i) => {
    return (
      <View key={i} style={[styles.page, this.getSize()]}>
        <Text>{sentence}</Text>
      </View>
    );
  };

  render() {
    const { sentences, goToAdd } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          ref={sv => (this.scrollView = sv)}
          horizontal
          pagingEnabled
          style={styles.scrollContainer}
          onMomentumScrollEnd={this.handleScroll}
        >
          {sentences.map(this.renderPage)}
        </ScrollView>
        <View style={styles.actionContainer}>
          <TouchableOpacity
            onPress={goToAdd}
            style={[styles.action, { backgroundColor: "#0f0" }]}
          >
            <Text style={styles.actionText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.removeSentence}
            style={[styles.action, { backgroundColor: "#f00" }]}
          >
            <Text style={styles.actionText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    flex: 1
  },
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  actionContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  action: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  actionText: {
    color: "#fff"
  }
});
