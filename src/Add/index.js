import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

type Props = { addSentenceAction: () => mixed };
type State = { sentence: string };

export default class extends React.Component<Props> {
  state = { sentence: "" };

  handleChangeText = text => {
    this.setState({ sentence: text });
  };

  handlePress = () => {
    const { sentence } = this.state;
    if (sentence !== "") {
      this.props.addSentenceAction(this.state.sentence);
    }
  };

  render() {
    const { addSentenceAction } = this.props;
    const { sentence } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={this.handleChangeText}
          placeholder="What keeps you motivated?"
          value={sentence}
        />
        <Button title="ADD" onPress={this.handlePress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {}
});
