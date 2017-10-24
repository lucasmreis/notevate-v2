import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  View,
  Text,
  PanResponder
} from "react-native";

type Props = {
  sentences: string[],
  goToAdd: () => mixed,
  removeSentenceAction: (sentence: string) => mixed
};

type State =
  | {
      status: "MOVING",
      y: number
    }
  | { status: "IDLE" };

export default class extends React.Component<Props, State> {
  state = { status: "IDLE" };

  panResponder = {};

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease
    });
  }

  onPanResponderGrant = (e, gestureState) => {
    console.log("onPanResponderGrant");
    this.setState({ status: "MOVING", dy: 0 });
  };

  onPanResponderMove = (e, gestureState) => {
    console.log("onPanResponderMove");
    this.setState({ status: "MOVING", dy: gestureState.dy });
  };

  onPanResponderRelease = () => {
    console.log("onPanResponderRelease");
    this.setState({ status: "IDLE" });
  };

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
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled style={styles.scrollContainer}>
          {sentences.map(this.renderPage)}
        </ScrollView>
        <View
          style={[styles.action, { top: 0, left: 0, right: 0 }]}
          {...this.panResponder.panHandlers}
        >
          <Text>ADD {JSON.stringify(this.state)}</Text>
        </View>
        <View
          style={[styles.action, { bottom: 0, left: 0, right: 0 }]}
          {...this.panResponder.panHandlers}
        >
          <Text>REMOVE {JSON.stringify(this.state)}</Text>
        </View>
      </View>
    );
  }
}

// {...this.panResponder.panHandlers}

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
  action: {
    position: "absolute",
    height: 100,
    backgroundColor: "#999",
    alignItems: "center",
    justifyContent: "center"
  }
});
