import React from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Text
} from "react-native";

const pages = [
  {
    text:
      "Swipe down to create your first motivational note: a great quote, a warm-and-fuzzy memory or a nudge to keep you on track."
  },
  {
    text:
      "Write your motivational note and save it for a rainny day. We don’t keep your pesonal data, so your notes only exist on your device."
  },
  {
    last: true,
    text:
      "Swipe up to delete your motivational note. We don’t keep your personal data, so your deleted notes are gone forever."
  }
];

type Props = {
  endIntroAction: () => mixed
};

export default class extends React.Component<Props> {
  getSize() {
    return {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  renderPage = ({ text, last }, i) => {
    const { endIntroAction } = this.props;
    return (
      <View key={i} style={[styles.page, this.getSize()]}>
        <Text>{text}</Text>
        {last && <Button title="OK" onPress={endIntroAction} />}
      </View>
    );
  };

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={styles.container}>
        {pages.map(this.renderPage)}
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
