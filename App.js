import React from "react";
import { Text, View } from "react-native";

import { get } from "./src/storage";
import Intro from "./src/Intro";
import Main from "./src/Main";

type State = {
  isReady: boolean,
  sentences: ?(string[]),
  error: ?any
};

export default class App extends React.Component<{}, State> {
  state = { isReady: false };

  async componentDidMount() {
    try {
      const sentences = await get();
      this.setState({ isReady: true, sentences });
    } catch (error) {
      this.setState({ isReady: true, error });
    }
  }

  render() {
    const { isReady, sentences, error }: State = this.state;
    if (!isReady) {
      return <View />;
    } else {
      if (error) {
        return <Text>Error: {JSON.stringify(error)}</Text>;
      } else {
        if (sentences.length > 0) {
          return <Main />;
        } else {
          return <Intro />;
        }
      }
    }
  }
}
