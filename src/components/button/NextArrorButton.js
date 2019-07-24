import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon_MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import colors from "../../styles/colors";

class NextArrorButton extends Component {
  render() {
    const { disabled, handleNextButton, iconName, iconType } = this.props;
    const opacityStyle = disabled ? 0.2 : 0.8;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={[{ opacity: opacityStyle }, styles.button]}
          onPress={handleNextButton}
          disabled={disabled}
        >
          {iconType === "MaterialCommunityIcons" ? (
            <Icon_MaterialCommunityIcons
              name={iconName}
              color="#fff"
              size={32}
              style={styles.icon}
            />
          ) : (
            <Icon
              name="angle-right"
              color="#fff"
              size={32}
              style={styles.icon}
            />
          )}
          {/* <Text>gfgf</Text> */}
        </TouchableHighlight>
      </View>
    );
  }
}

export default NextArrorButton;

NextArrorButton.protoTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func,
  iconName: PropTypes.string,
  iconType: PropTypes.string
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "flex-end",
    right: 20,
    bottom: 20
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: "#6D0F49"
  },
  icon: {
    marginRight: -2,
    marginTop: -2
  }
});
