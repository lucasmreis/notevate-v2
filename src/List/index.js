import React from "react";
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Button,
  View,
  Text,
  TouchableOpacity,
  PanResponder,
  Animated
} from "react-native";

const ACTION_HEIGHT = 110;

type Props = {
  sentences: string[],
  goToAdd: () => mixed,
  removeSentenceAction: (sentence: string) => mixed
};

type State = { currentPage: number, animTop: mixed, animBottom: mixed };

export default class extends React.Component<Props, State> {
  state = {
    currentPage: 0,
    animTop: new Animated.Value(0),
    animBottom: new Animated.Value(0)
  };

  componentWillMount() {
    this.panResponderTop = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        this.state.animTop.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy > ACTION_HEIGHT) {
          this.props.goToAdd();
        }

        Animated.timing(this.state.animTop, { toValue: 0 }).start();
      }
    });

    this.panResponderBottom = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gesture) => {
        this.state.animBottom.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        if (gesture.dy < -ACTION_HEIGHT) {
          this.removeSentence();
        }

        Animated.timing(this.state.animBottom, { toValue: 0 }).start();
      }
    });
  }

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

  renderTopAction = () => {
    const clamped = Animated.diffClamp(this.state.animTop, 0, ACTION_HEIGHT);

    const translateY = Animated.add(clamped, -ACTION_HEIGHT);

    const opacity = clamped.interpolate({
      inputRange: [0, ACTION_HEIGHT],
      outputRange: [0, 1]
    });

    return (
      <View
        style={styles.actionContainerTop}
        {...this.panResponderTop.panHandlers}
      >
        <Animated.View
          style={[
            styles.action,
            {
              backgroundColor: "rgba(0,0,255,1)",
              transform: [{ translateY }],
              opacity
            }
          ]}
        >
          <Text style={styles.actionText}>Add</Text>
        </Animated.View>
      </View>
    );
  };

  renderBottomAction = () => {
    const clamped = Animated.diffClamp(
      this.state.animBottom,
      -ACTION_HEIGHT,
      0
    );

    const translateY = Animated.add(clamped, ACTION_HEIGHT);

    const opacity = clamped.interpolate({
      inputRange: [-ACTION_HEIGHT, 0],
      outputRange: [1, 0]
    });

    return (
      <View
        style={styles.actionContainerBottom}
        {...this.panResponderBottom.panHandlers}
      >
        <Animated.View
          style={[
            styles.action,
            {
              backgroundColor: "rgba(255,0,0,1)",
              transform: [{ translateY }],
              opacity
            }
          ]}
        >
          <Text style={styles.actionText}>Remove</Text>
        </Animated.View>
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

        {this.renderTopAction()}
        {this.renderBottomAction()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
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
  actionContainerTop: {
    backgroundColor: "rgba(0,0,255,0.2)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    height: ACTION_HEIGHT,
    alignItems: "center",
    justifyContent: "center"
  },
  actionContainerBottom: {
    backgroundColor: "rgba(255,0,0,0.2)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    height: ACTION_HEIGHT,
    alignItems: "center",
    justifyContent: "center"
  },
  action: {
    transform: [{ perspective: 1000 }],
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
