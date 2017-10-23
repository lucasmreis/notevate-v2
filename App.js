import React from "react";
import { Text, View } from "react-native";

import { get, add, remove } from "./src/storage";
import Intro from "./src/Intro";
import Add from "./src/Add";
import List from "./src/List";

type State =
  | { status: "LOADING" }
  | { status: "ERROR", error: any }
  | { status: "INTRO" }
  | { status: "LIST", sentences: string[] }
  | { status: "ADD" }
  | { status: "REMOVE" };

export default class App extends React.Component<{}, State> {
  state = { status: "LOADING" };

  async componentDidMount() {
    try {
      const sentences = await get();
      this.goToListOrIntro(sentences);
    } catch (error) {
      this.setState({ status: "ERROR", error });
    }
  }

  goToListOrIntro = sentences => {
    if (sentences.length > 0) {
      this.setState({ status: "LIST", sentences });
    } else {
      this.setState({ status: "INTRO" });
    }
  };

  goToAdd = () => {
    this.setState({ status: "ADD" });
  };

  addSentenceAction = async (sentence: string) => {
    const sentences = await add(sentence);
    this.goToListOrIntro(sentences);
  };

  removeSentenceAction = async (sentence: string) => {
    const sentences = await remove(sentence);
    this.goToListOrIntro(sentences);
  };

  render() {
    const { status, sentences } = this.state;
    switch (status) {
      case "LOADING":
        return <View />;
      case "INTRO":
        return <Intro endIntroAction={this.goToAdd} />;
      case "ADD":
        return <Add addSentenceAction={this.addSentenceAction} />;
      case "LIST":
        return (
          <List
            sentences={sentences}
            goToAdd={this.goToAdd}
            removeSentenceAction={this.removeSentenceAction}
          />
        );
      default:
        console.warn(this.state.status);
        return <View />;
    }
  }
}
