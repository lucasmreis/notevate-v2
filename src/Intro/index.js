import React from "react";
import { Dimensions, StyleSheet, ScrollView, View, Text } from "react-native";

export default class extends React.Component {
  getSize() {
    return {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height
    };
  }

  render() {
    return (
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        <View
          style={[
            styles.page,
            { backgroundColor: "powderblue" },
            this.getSize()
          ]}
        >
          <Text>PAGE 1</Text>
        </View>
        <View
          style={[styles.page, { backgroundColor: "skyblue" }, this.getSize()]}
        >
          <Text>PAGE 2</Text>
        </View>
        <View
          style={[
            styles.page,
            { backgroundColor: "steelblue" },
            this.getSize()
          ]}
        >
          <Text>PAGE 3</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
